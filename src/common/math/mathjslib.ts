
import { create, all,sqrt , MathJsInstance, Matrix } from 'mathjs';

const config = {
  matrix: 'Matrix' as const, 
  number: 'number' as const
};

export const math = create(all, config) as MathJsInstance;
export type MathType = typeof math;


