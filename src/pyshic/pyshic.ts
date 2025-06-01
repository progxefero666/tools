import { Point3d } from "@/common/system3d/model/point3d";
import { Vector3d } from "@/types/types";
import * as THREE from 'three';
import { Gravity } from "./gravity/gravity";


/**
 * Physic.NANOSECOND
 */
export class Physic {

    //1e-5
    public static readonly NANOSECOND: number = 1e-9;
    public static readonly NANOMETER: number = 1e-9;


    public static readonly C: number = 299792458; // metros por segundo (m/s)
    //public static readonly PERMITIVITI_0:number = 8.854 * Math.pow(10, -12);
    public static readonly PERMITIVITI_0: number = 1;
    public static readonly PLANCK_CONSTANT: number = 6.62607015e-34; // Joule · segundos (J·s)

    // Masas de partículas fundamentales (en kilogramos)
    public static readonly ELECTRON_MASS: number = 9.1093837015e-31; 
    public static readonly PROTON_MASS: number = 1.67262192369e-27;
    public static readonly NEUTRON_MASS: number = 1.67492749804e-27;
      


    /*
    const VISIBLE_LIGHT_FREQUENCY_RANGE = {
    // Frecuencia del color rojo (aproximadamente)
    MIN_HZ: 4e14, // 4 x 10^14 Hz
    // Frecuencia del color violeta (aproximadamente)
    MAX_HZ: 8e14, // 8 x 10^14 Hz
    };
    */

}


/*
I es el momento de inercia del objeto alrededor del eje de rotación (en kg·m²).
 El momento de inercia es una medida de la resistencia de un objeto a los cambios 
 en su movimiento rotacional, y depende de la distribución de su masa y la ubicación del eje de rotación.
    I = m * r2

La velocidad lineal (v) de un punto en un objeto que rota está relacionada 
con la velocidad angular (ω) por la siguiente ecuación: v = rω

Donde:
    v es la velocidad lineal del punto (en m/s).
    r es la distancia del punto al eje de rotación (en m).
    ω es la velocidad angular del objeto (en rad/s).
*/

export class PhysicUtil {


    /**
     * get Two object Gravity Attraction Forze
     * @param distance 
     * @param mass_a 
     * @param mass_b 
     * @returns Newtons
     */
    public static getMassLinearMoment(mass: number, velocity: number): number {
        return mass * velocity;
    }

    /**
     * Calculates the angular momentum of an object.
     * Angular momentum L = r * p = r * m * v
     * @param mass The mass of the object in kilograms (kg).
     * @param radius The distance from the axis of rotation to the object in meters (m).
     * @param velocity The linear velocity of the object in meters per second (m/s).  This assumes the object is moving in a circle around the axis of rotation.
     * @returns The angular momentum of the object in kg*m²/s.
     */
    public static getrMassAngulaMoment(mass: number, radius: number, velocity: number): number {
        return (radius * mass * velocity);
    }

    /**
     * I = m * r2
     * @param mass 
     * @param radius 
     * @returns 
     */
    public static getMassInertiaMoment(mass: number, radius: number): number {
        return mass * Math.pow(radius, 2);
    }

    /**
     * vel_b >= vel_a
     * @param mass kg
     * @param duration seconds
     * @param velocity m/s
     * @returns 
     */
    public static getMassNetLinearForce(mass: number, duration: number, vel_a: number, vel_b: number): number {
        const acceleration: number = (vel_b - vel_a) / duration;
        return (mass * acceleration);
    }

    public static getMassCentripetalForce(mass: number, radius: number, velocity: number): number {
        const force: number = (mass * Math.pow(velocity, 2)) / radius;
        return force;
    }

    /**
     * kinetic energy->(1/2) m * v2
     * @param mass 
     * @param velocity 
     * @returns Julios
     */
    public static getMassLinearEnergy(mass: number, velocity: number): number {
        const energy: number = (mass / 2) * Math.pow(velocity, 2);
        return energy;
    }

    /**
     * ω (omega) es la velocidad angular del objeto (en radianes por segundo, rad/s).
     * (1/2) I * ω2
     * @param massInertia 
     * @param angVelocity 
     * @returns 
     */
    public static getMassAngularEnergy(mass: number, radius: number, w: number): number {
        const mass_i = PhysicUtil.getMassInertiaMoment(mass, radius);
        return mass_i * Math.pow(w, 2);
    }


    /**
     * Calcula la energía total de un objeto que se traslada y rota.
     * ((1/2) m * v2) + ((1/2) I * ω2)
     * @param mass La masa del objeto en kg.
     * @param radius La distancia al eje de rotación en metros.
     * @param v La velocidad lineal del centro de masa en m/s.
     * @param w La velocidad angular en rad/s.
     * @returns La energía total en Julios.
     */
    public static getMassTotalEnergy(mass: number, radius: number, v: number, w: number): number {
        const energy_linear = PhysicUtil.getMassLinearEnergy(mass, v);
        const energy_angular = PhysicUtil.getMassAngularEnergy(mass, radius, w);
        return energy_linear + energy_angular;
    }

    /**
     * masa * Gravity.g * altura;
     * @param mass 
     * @param height 
     * @returns 
     */
    public static getPotencialEnergy(mass: number, height: number): number {
        return (mass * Gravity.NEWTON_G * height);
    }

    /**
       * Calcula los puntos de la trayectoria de un salto, incluyendo la dirección en cada punto.
       * @param initialVelocity La velocidad inicial del objeto en m/s.
       * @param launchAngle El ángulo de lanzamiento con respecto a la horizontal en radianes.
       * @param initialHeight La altura inicial del objeto en metros (m).
       * @param initialPosition La posición inicial del objeto como un Vector3 de Three.js.
       * @param gravity La aceleración debida a la gravedad en m/s². Por defecto es 9.80665 m/s².
       * @param numPoints El número de puntos a calcular para la trayectoria. Por defecto es 30.
       * @returns Un array de objetos PyPoint, donde cada punto tiene su posición y dirección (vector normalizado).
       */
    public static calculateTrajectoryPointsWithDirection(
        initialVelocity: number,
        launchAngle: number,
        initialHeight: number,
        initialPosition: THREE.Vector3,
        gravity: number = 9.80665,
        numPoints: number = 30
    ): Point3d[] {
        const points: Point3d[] = [];
        const velocityX = initialVelocity * Math.cos(launchAngle);
        const velocityY = initialVelocity * Math.sin(launchAngle);
        const timeStep = 2 / numPoints;  // Ajusta esto para la resolución de la trayectoria
        let time = 0;

        for (let i = 0; i < numPoints; i++) {
            const x = initialPosition.x + velocityX * time;
            const y = initialHeight + velocityY * time - 0.5 * gravity * time * time;
            const z = initialPosition.z; // Suponemos movimiento en el plano X-Y
            const position: Vector3d = [x, y, z];

            // Cálculo de la dirección (vector velocidad)
            const velocityXInstantaneous = velocityX;  // La velocidad horizontal es constante
            const velocityYInstantaneous = velocityY - gravity * time;
            const direction: Vector3d = [velocityXInstantaneous, velocityYInstantaneous, 0]; // Vector 2D

            // Normalizar el vector dirección
            const directionVector = new THREE.Vector3(direction[0], direction[1], direction[2]);
            directionVector.normalize();
            const normalizedDirection: Vector3d = [directionVector.x, directionVector.y, directionVector.z];

            points.push(new Point3d(position, normalizedDirection));
            time += timeStep;
            if (y < 0) break; // Detener el cálculo de puntos después de que toca el suelo
        }
        return points;
    }

    /**
     * Crea una línea de Three.js a partir de un array de objetos PyPoint.
     * @param points El array de objetos PyPoint que definen la trayectoria.
     * @param color El color de la línea. Por defecto es verde (0x00ff00).
     * @returns Una instancia de THREE.Line que representa la trayectoria.
     */
    public static createTrajectoryLineWithDirections(
        points: Point3d[],
        color: number = 0x00ff00, // Color verde por defecto
        showDirections: boolean = false, // Nuevo parámetro para mostrar las direcciones
        directionLength: number = 0.5  // Longitud de las líneas de dirección
    ): THREE.Line {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(points.length * 3); // 3 coordenadas por punto

        for (let i = 0; i < points.length; i++) {
            positions[i * 3] = points[i].position[0];
            positions[i * 3 + 1] = points[i].position[1];
            positions[i * 3 + 2] = points[i].position[2];
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.LineBasicMaterial({ color: color });
        const line = new THREE.Line(geometry, material);


        if (showDirections) {
            const arrowGeometry = new THREE.BufferGeometry();
            const arrowPositions = [];
            const arrowColors = [];

            for (let i = 0; i < points.length; i++) {
                const start = new THREE.Vector3(...points[i].position);
                const dir = new THREE.Vector3(...points[i].direction);
                const end = new THREE.Vector3();
                end.copy(start).addScaledVector(dir, directionLength);

                arrowPositions.push(start.x, start.y, start.z);
                arrowPositions.push(end.x, end.y, end.z);
                arrowColors.push(1, 1, 0); // Amarillo para las flechas de dirección
                arrowColors.push(1, 1, 0);
            }
            arrowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(arrowPositions, 3));
            arrowGeometry.setAttribute('color', new THREE.Float32BufferAttribute(arrowColors, 3));
            const arrowMaterial = new THREE.LineBasicMaterial({
                vertexColors: true, // Habilita el uso de colores por vértice
                linewidth: 2, // Grosor de las líneas de las flechas
            });
            const arrows = new THREE.LineSegments(arrowGeometry, arrowMaterial);
            line.add(arrows); // Añade las flechas como hijos de la línea principal
        }
        return line;
    }

    /*
    // Ejemplo de uso:
    const initialVelocity = 15; // m/s
    const launchAngle = Math.PI / 4; // 45 grados
    const initialHeight = 2; // metros
    const initialPosition = new THREE.Vector3(0, initialHeight, 0);

    const pointsWithDirections = JumpTrajectory.calculateTrajectoryPointsWithDirection(initialVelocity, launchAngle, initialHeight, initialPosition);
    const trajectoryLineWithDirections = JumpTrajectory.createTrajectoryLineWithDirections(pointsWithDirections, 0x00ffff, true, 1); //Color cian y mostrar direcciones

    // Escena de Three.js
    const scene = new THREE.Scene();
    scene.add(trajectoryLineWithDirections);    
    */

}//end class