import fs from "fs";
import path from "path";
import type { Invoice } from "./types";

const STORE_PATH = path.join("/tmp", "wa-invoices.json");

function readStore(): Invoice[] {
  try {
    if (!fs.existsSync(STORE_PATH)) return [];
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    return JSON.parse(raw) as Invoice[];
  } catch {
    return [];
  }
}

function writeStore(invoices: Invoice[]): void {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(invoices, null, 2), "utf-8");
  } catch (err) {
    console.error("[InvoiceStore] Write error:", err);
  }
}

export function getInvoices(): Invoice[] {
  return readStore();
}

export function saveInvoice(inv: Invoice): void {
  const invoices = readStore();
  const existing = invoices.findIndex((i) => i.id === inv.id);
  if (existing >= 0) {
    invoices[existing] = inv;
  } else {
    invoices.push(inv);
  }
  writeStore(invoices);
}

export function getInvoice(id: string): Invoice | null {
  const invoices = readStore();
  return invoices.find((i) => i.id === id) ?? null;
}

export function updateInvoice(id: string, updates: Partial<Invoice>): void {
  const invoices = readStore();
  const idx = invoices.findIndex((i) => i.id === id);
  if (idx >= 0) {
    invoices[idx] = { ...invoices[idx], ...updates };
    writeStore(invoices);
  }
}

export function getNextInvoiceNumber(): string {
  const year = new Date().getFullYear();
  const invoices = readStore();
  const thisYear = invoices.filter((inv) => inv.nummer.startsWith(`RE-${year}-`));

  let maxCount = 0;
  for (const inv of thisYear) {
    const parts = inv.nummer.split("-");
    const num = parseInt(parts[2] ?? "0", 10);
    if (num > maxCount) maxCount = num;
  }

  return `RE-${year}-${String(maxCount + 1).padStart(4, "0")}`;
}
