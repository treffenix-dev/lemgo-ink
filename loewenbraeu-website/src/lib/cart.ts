export type CartItem = {
  name: string;
  price: number;
  qty: number;
};

export function cartTotal(items: CartItem[]) {
  return items.reduce((s, i) => s + i.price * i.qty, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((s, i) => s + i.qty, 0);
}

export function addItem(items: CartItem[], name: string, price: number): CartItem[] {
  const existing = items.find((i) => i.name === name);
  if (existing) return items.map((i) => i.name === name ? { ...i, qty: i.qty + 1 } : i);
  return [...items, { name, price, qty: 1 }];
}

export function changeQty(items: CartItem[], name: string, delta: number): CartItem[] {
  return items
    .map((i) => i.name === name ? { ...i, qty: i.qty + delta } : i)
    .filter((i) => i.qty > 0);
}
