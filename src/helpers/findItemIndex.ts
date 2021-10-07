type Item = { id: number };

export default function findItemIndex<I extends Item>(
  items: I[],
  id: string | number
): number {
  return items.findIndex((doggo) => doggo.id.toString() === id.toString());
}
