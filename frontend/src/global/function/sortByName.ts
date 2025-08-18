export function sortByName<T extends {name: string}>(array: T[]): T[] {
  return array.sort((a, b) => 
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}