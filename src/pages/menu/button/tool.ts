export function findMenuTitleFromMenuId(arr: Array<any>, id: number): string {
  if (!arr || arr.length === 0) return '';
  for (const item of arr) {
    if (item.id === id) {
      return item.title;
    }
    const title = findMenuTitleFromMenuId(item.children, id);
    if (title) {
      return title;
    }
  }
  return '';
}
