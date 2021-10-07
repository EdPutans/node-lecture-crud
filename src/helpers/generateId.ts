type Item = { id: number };

const generateId = (items: Item[]): number => {
  const lastId = Math.max(...items.map((doggo) => doggo.id));
  if (!lastId) {
    // if array is empty, we can 'start again'
    return 1;
  }
  return lastId + 1;
};

export default generateId;
