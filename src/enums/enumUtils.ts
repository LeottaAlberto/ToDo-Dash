export function getSafeEnum<T extends object>(
  enumObj: T,
  value: any,
  defaultValue: T[keyof T],
): T[keyof T] {
  const values = Object.values(enumObj);

  if (typeof values[0] === 'number') {
    const numericValues = values.filter((v) => typeof v === 'number');
    return numericValues.includes(value) ? value : defaultValue;
  }

  return values.includes(value) ? value : defaultValue;
}
