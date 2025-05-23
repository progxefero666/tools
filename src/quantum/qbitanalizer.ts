


import * as jsqubits from 'jsqubits';

export class QBitAnalizer {


    /**
     * Solo válido para 1 qubit
     * url: https://en.wikipedia.org/wiki/Bloch_sphere
     *          x-->2·Re(αβ*)
     *          y-->2·Im(αβ*)
     *          z-->|α|² - |β|²  
     * @param qbit 
     * @returns 
     */
    public static calcularVectorBloch(qbit: jsqubits.QState): { x: number; y: number; z: number } {
        const alpha = qbit.amplitude(0);
        const beta = qbit.amplitude(1);
        return {
            x: 2 * (alpha.real * beta.real + alpha.imaginary * beta.imaginary),
            y: 2 * (alpha.imaginary * beta.real - alpha.real * beta.imaginary),
            z: alpha.real ** 2 + alpha.imaginary ** 2 - beta.real ** 2 - beta.imaginary ** 2
        };
    }

    public static calcularVectorBlochParaQubit(estadoMultiQubit: jsqubits.QState, indiceQubit: number): { x: number; y: number; z: number } | null {
        if (indiceQubit < 0 || indiceQubit >= estadoMultiQubit.numBits) {
            throw new Error("Índice de qubit inválido");
        }
        // Obtener lista de qubits a eliminar (todos excepto el objetivo)
        const qubitsAEliminar = Array.from(
            { length: estadoMultiQubit.numBits },
            (_, i) => i
        ).filter(i => i !== indiceQubit);
        const estadoReducido = this.partialTrace(estadoMultiQubit, qubitsAEliminar);
        return this.calcularVectorBloch(estadoReducido!);
    }

    public static createFromAmplitudes(amplitudes: { [state: number]: jsqubits.Complex }, numQubits: number): jsqubits.QState {
        const state = new jsqubits.QState(numQubits);

        // Acceder al campo privado 'amplitudes' mediante indexación
        for (const key in amplitudes) {
            (state as any).amplitudes[parseInt(key)] = amplitudes[key];
        }

        return state;
    }

    /*
      norm(): number {
        return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
    }
    */
    // Implementación básica de partialTrace (solo para estados puros)
    private static partialTrace(
        estado: jsqubits.QState,
        qubitsAEliminar: number[]
    ): jsqubits.QState {
        const numBitsOriginal = estado.numBits;
        const bitsConservados = Array.from({ length: numBitsOriginal }, (_, i) => i)
            .filter(i => !qubitsAEliminar.includes(i));
        const numBitsFinal = bitsConservados.length;

        const nuevasAmplitudes: { [key: string]: jsqubits.Complex } = {};

        for (let idx = 0; idx < Math.pow(2, numBitsOriginal); idx++) {
            const binario = idx.toString(2).padStart(numBitsOriginal, '0');
            let estadoReducido = '';
            for (const bit of bitsConservados) {
                estadoReducido += binario[bit];
            }

            const amp = estado.amplitude(idx);
            if (!nuevasAmplitudes[estadoReducido]) {
                nuevasAmplitudes[estadoReducido] = amp;
            } else {
                nuevasAmplitudes[estadoReducido] = nuevasAmplitudes[estadoReducido].add(amp);
            }
        }

        // Calcular la norma y normalizar
        let normaCuadrada = 0;
        for (const key in nuevasAmplitudes) {
            const amp = nuevasAmplitudes[key];
            normaCuadrada += amp.real * amp.real + amp.imaginary * amp.imaginary;
        }

        const norma = Math.sqrt(normaCuadrada);
        for (const key in nuevasAmplitudes) {
            nuevasAmplitudes[key] = nuevasAmplitudes[key].multiply(1 / norma);
        }

        // Convertir a formato esperado por QState
        const resultado = Object.entries(nuevasAmplitudes).map(([k, v]) => ({
            state: parseInt(k, 2),
            amplitude: v
        }));

        // Usamos nuestra función alternativa
        const amplitudesObj: { [state: number]: jsqubits.Complex } = {};
        for (const { state, amplitude } of resultado) {
            amplitudesObj[state] = amplitude;
        }

        return this.createFromAmplitudes(amplitudesObj, numBitsFinal);
    }

}//end class

// Ejemplo de uso:
const estadoSuperposicion = jsqubits.jsqubits('|0>').hadamard(0);
const bloch = QBitAnalizer.calcularVectorBloch(estadoSuperposicion);
console.log(bloch); // { x: 1, y: 0, z: 0 } (Estado |+>)