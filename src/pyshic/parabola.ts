

interface ParabolaParams {
    vertex: [number, number];
    focus: [number, number];
    directrix: number; // La ecuación de la directriz es y = directrix
}

function createParabola(params: ParabolaParams): string {
    const { vertex, focus, directrix } = params;
    const [h, k] = vertex;
    const [focusX, focusY] = focus;
    
    const p = focusY - k; // Distancia entre el vértice y el foco

    // Aquí iría la lógica para construir la parábola (e.g., calcular puntos, generar la ecuación)
    // Por simplicidad, solo devolvemos la ecuación en forma de string
    return `Parábola con vértice en (${h}, ${k}), foco en (${focusX}, ${focusY}), directriz en y = ${directrix}, y p = ${p}. Ecuación: (x - ${h})^2 = ${4 * p}(y - ${k})`;
}

// Ejemplo de llamada a la función
const parabolaParams: ParabolaParams = {
    vertex: [0, 0],
    focus: [0, 1],
    directrix: -1,
};

const parabolaDescription = createParabola(parabolaParams);
console.log(parabolaDescription); // Imprime la descripción de la parábola