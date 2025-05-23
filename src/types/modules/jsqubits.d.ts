
declare module 'jsqubits' {

    // Constantes Esenciales
    export const ALL: unique symbol;

    // Clase Complex
    export class Complex {
        real: number;
        imaginary: number;
        constructor(real: number, imaginary: number);
        add(other: Complex | number): Complex;
        subtract(other: Complex | number): Complex;
        multiply(other: Complex | number): Complex;
        toString(): string;
    }

    // Clase QState Completa
    export class QState {
        constructor(numQubits: number);
        numBits: number;

        static fromAmplitudes(amplitudes: { [state: number]: Complex }): QState;

        // Métodos Cuánticos
        amplitude(state: number): Complex;
        hadamard(target: number): QState;
        cnot(control: number, target: number): QState;
        rotateY(target: number, angle: number): QState;
        Z(target: number): QState;
        measure(qBits: number[] | typeof ALL): { result: number; newState: QState };

        // Métodos Adicionales Comunes
        tensorProduct(other: QState): QState;
        multiply(value: Complex | number): QState;
        toString(): string;
    }

    // Funciones de Ayuda
    export function jsqubits(ket: string): QState;
    export function complex(real: number, imaginary?: number): Complex;
    export function real(value: number): Complex;
}