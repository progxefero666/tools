'use server';

import { jsqubits } from 'jsqubits'



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
    console.log("\nResultado de la medición:", resultadoMedicion.result);
    console.log("Nuevo estado después de la medición:", resultadoMedicion.newState.toString());

    return result;
}
