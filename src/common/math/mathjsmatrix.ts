
import { math } from "@/common/math/mathjslib";
import { sqrt, Matrix } from 'mathjs';

/**
 * 
 */
export class MathJsMatrix {

    public static createIdentityMatrix(n: number): Matrix {
        return math.identity(n) as Matrix;
    }

}//end class

/*
// Operaciones con la matriz identidad:
const matrizA = math.matrix([
  [1, 2],
  [3, 4]
]);

[[a, b],
 [c, d]]
det = ad - bc

[[a, b, c],
 [d, e, f],
 [g, h, i]]
det = a(ei - fh) - b(di - fg) + c(dh - eg)

const identidad2x2: Matrix = createIdentityMatrix(2);

// Multiplicación de matrices: A * I
const resultado1 = math.multiply(matrizA, identidad2x2);
console.log("A * I:");
console.log(resultado1.toArray());

// Multiplicación de matrices: I * A
const resultado2 = math.multiply(identidad2x2, matrizA);
console.log("I * A:");
console.log(resultado2.toArray());

// Determinante de la matriz identidad
const determinante = math.det(identidad2x2);
console.log("Determinante de I:");
console.log(determinante);
*/