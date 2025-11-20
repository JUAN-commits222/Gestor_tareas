export function add(list, id, titulo) {
  if (!id || !titulo) return list;
  return [...list, { id, titulo, hecho: false }];
}

export function toggle(list, id) {
  return list.map(t =>
    t.id === id ? { ...t, hecho: !t.hecho } : t
  );
}

export function remove(list, id) {
  return list.filter(t => t.id !== id);
}

export function filterBy(list, estado) {
  switch (estado) {
    case 'todo':
      return list.filter(t => !t.hecho);
    case 'done':
      return list.filter(t => t.hecho);
    default:
      return list;
  }
}
