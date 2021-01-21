export function exponential(t: number): number {
  return (Math.pow(10, t) - 1) / 9;
}

export function linear(t: number): number {
  return t;
}

export function logarithmic(t: number): number {
  return Math.log10(1 + t * 9);
}
