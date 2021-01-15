export function dbToFloat32(value: number): number {
  return Math.pow(10, value / 20);
}

export function float32toDb(value: number): number {
  return 20 * Math.log10(Math.abs(value));
}
