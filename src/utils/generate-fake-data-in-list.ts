export function generateEmptyArrayOfSize<T>({
  defaultElement,
  size = 10,
}: {
  defaultElement: T;
  size?: number;
}): T[] {
  const ar: T[] = [];

  for (let i = 0; i < size; i++) {
    ar.push(defaultElement);
  }

  return ar;
}
