type Item = { id: number };

export default function findById<I extends Item>(
  items: I[],
  id: number | string
): I | null {
  const item = items.find((item) => item.id.toString() === id.toString());

  return item || null;
}
