'use server';


import * as jsqubits from 'jsqubits';

const circuitoMonedaSesgada = () => {
    
    const unQubit = new jsqubits.QState(1);

    // 2. Definir la probabilidad deseada para medir |0>
    const probabilidadDeMedir0 = 0.8; // 80%

    // 3. Calcular el ángulo de rotación (theta) para la puerta Ry.
    // La probabilidad de medir |0> después de aplicar Ry(theta) a |0>
    // es |cos(theta/2)|^2. Queremos que sea 0.8.
    
    // cos(theta/2) = sqrt(0.8)
    // theta/2 = arccos(sqrt(0.8))
    // theta = 2 * arccos(sqrt(0.8))
    // Math.acos opera en radianes, que es lo que jsqubits espera.
    const theta = 2 * Math.acos(Math.sqrt(probabilidadDeMedir0));

    // 4. Aplicar la rotación Ry(theta) al cúbit (índice 0).
    const estadoSesgado = unQubit.rotateY(0, theta);

    // 5. Devolver el estado cuántico resultante.
    return estadoSesgado;
};

const circuitoDosQubitsEntrelazados = () => {
    const dosQubits = new jsqubits.QState(2);
    const estadoEntrelazado = dosQubits.Z(0); 
    return estadoEntrelazado;
};

export default async function quantumTestA(): Promise<boolean> {
    let result: boolean = true;

    const estadoFinalDosQubits = circuitoDosQubitsEntrelazados();
    console.log("Estado final del circuito:", estadoFinalDosQubits.toString());

    // Medimos ambos cúbits del estado final
    const resultadoMedicion = estadoFinalDosQubits.measure(jsqubits.ALL);
    console.log("Resultado de la medición:", resultadoMedicion.result);
    console.log("Nuevo estado después de la medición:", resultadoMedicion.newState.toString());

    return result;
}
