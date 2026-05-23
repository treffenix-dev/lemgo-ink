import { format, formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), "dd.MM.yyyy", { locale: de });
}

export function formatDateTime(date: string | Date): string {
  return format(new Date(date), "dd.MM.yyyy HH:mm", { locale: de });
}

export function formatRelative(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: de });
}

export function formatInvoiceNumber(n: number): string {
  const year = new Date().getFullYear();
  return `RE-${year}-${String(n).padStart(4, "0")}`;
}
