// Server-only: do NOT import in client components
import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import type { Invoice } from "./types";

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);

const formatDate = (dateStr: string): string =>
  new Intl.DateTimeFormat("de-DE").format(new Date(dateStr));

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
    backgroundColor: "#ffffff",
    paddingTop: 48,
    paddingBottom: 60,
    paddingHorizontal: 52,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 36,
  },
  logoArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  logoLetter: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
  },
  senderBlock: {
    marginLeft: 10,
  },
  senderName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    color: "#1a1a1a",
    marginBottom: 2,
  },
  senderAddress: {
    fontSize: 8.5,
    color: "#666666",
    lineHeight: 1.5,
  },
  invoiceMeta: {
    alignItems: "flex-end",
  },
  invoiceTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 3,
  },
  metaLabel: {
    fontSize: 8.5,
    color: "#888888",
    width: 70,
    textAlign: "right",
  },
  metaValue: {
    fontSize: 8.5,
    color: "#1a1a1a",
    fontFamily: "Helvetica-Bold",
    minWidth: 80,
    textAlign: "right",
  },
  // Divider
  divider: {
    borderBottom: "1pt solid #e0e0e0",
    marginBottom: 24,
  },
  // Recipient
  recipientBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
    padding: "12 14",
    marginBottom: 28,
    maxWidth: 240,
  },
  recipientLabel: {
    fontSize: 7.5,
    color: "#888888",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  recipientName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#1a1a1a",
    marginBottom: 2,
  },
  recipientLine: {
    fontSize: 9,
    color: "#444444",
    lineHeight: 1.5,
  },
  // Line items table
  tableContainer: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1a1a1a",
    borderRadius: 3,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderBottom: "1pt solid #eeeeee",
  },
  tableRowAlt: {
    backgroundColor: "#f9f9f9",
  },
  colDescription: { flex: 3 },
  colMenge: { flex: 1, textAlign: "center" },
  colEinzel: { flex: 1.5, textAlign: "right" },
  colGesamt: { flex: 1.5, textAlign: "right" },
  cellText: {
    fontSize: 9.5,
    color: "#1a1a1a",
  },
  // Totals
  totalsContainer: {
    alignItems: "flex-end",
    marginBottom: 28,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 0,
    marginBottom: 3,
  },
  totalLabel: {
    fontSize: 9,
    color: "#666666",
    width: 140,
    textAlign: "right",
    paddingRight: 10,
  },
  totalValue: {
    fontSize: 9,
    color: "#1a1a1a",
    width: 90,
    textAlign: "right",
  },
  totalDivider: {
    borderBottom: "1pt solid #cccccc",
    width: 230,
    marginBottom: 5,
    marginTop: 5,
  },
  totalFinalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 3,
  },
  totalFinalLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    width: 140,
    textAlign: "right",
    paddingRight: 10,
  },
  totalFinalValue: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    width: 90,
    textAlign: "right",
  },
  // Payment info
  paymentBox: {
    backgroundColor: "#f9f9f9",
    borderLeft: "3pt solid #1a1a1a",
    padding: "12 14",
    marginBottom: 24,
    borderRadius: 2,
  },
  paymentTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    color: "#1a1a1a",
    marginBottom: 7,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  paymentLine: {
    fontSize: 9,
    color: "#444444",
    marginBottom: 3,
    lineHeight: 1.4,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 28,
    left: 52,
    right: 52,
    borderTop: "1pt solid #e0e0e0",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 7.5,
    color: "#999999",
  },
});

interface InvoicePDFProps {
  invoice: Invoice;
}

export function InvoicePDF({ invoice }: InvoicePDFProps) {
  const fullName = `${invoice.kunde.vorname} ${invoice.kunde.nachname}`;
  const displayName = invoice.kunde.firma ? invoice.kunde.firma : fullName;

  return (
    <Document title={`Rechnung ${invoice.nummer}`} author="WebAgentur">
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoArea}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoLetter}>W</Text>
            </View>
            <View style={styles.senderBlock}>
              <Text style={styles.senderName}>WebAgentur</Text>
              <Text style={styles.senderAddress}>Musterstraße 1{"\n"}32657 Lemgo{"\n"}hallo@webagentur.de</Text>
            </View>
          </View>
          <View style={styles.invoiceMeta}>
            <Text style={styles.invoiceTitle}>RECHNUNG</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Rechnungs-Nr.</Text>
              <Text style={styles.metaValue}>{invoice.nummer}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Datum</Text>
              <Text style={styles.metaValue}>{formatDate(invoice.erstellt_am)}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Fällig am</Text>
              <Text style={styles.metaValue}>{formatDate(invoice.faellig_am)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Recipient */}
        <View style={styles.recipientBox}>
          <Text style={styles.recipientLabel}>Rechnungsempfänger</Text>
          {invoice.kunde.firma ? (
            <>
              <Text style={styles.recipientName}>{invoice.kunde.firma}</Text>
              <Text style={styles.recipientLine}>{fullName}</Text>
            </>
          ) : (
            <Text style={styles.recipientName}>{fullName}</Text>
          )}
          <Text style={styles.recipientLine}>{invoice.kunde.strasse}</Text>
          <Text style={styles.recipientLine}>{invoice.kunde.plz} {invoice.kunde.ort}</Text>
          <Text style={styles.recipientLine}>{invoice.kunde.land}</Text>
          <Text style={[styles.recipientLine, { marginTop: 4 }]}>{invoice.kunde.email}</Text>
        </View>

        {/* Line items table */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>Beschreibung</Text>
            <Text style={[styles.tableHeaderText, styles.colMenge]}>Menge</Text>
            <Text style={[styles.tableHeaderText, styles.colEinzel]}>Einzelpreis (netto)</Text>
            <Text style={[styles.tableHeaderText, styles.colGesamt]}>Gesamt (netto)</Text>
          </View>
          {invoice.positionen.map((pos, idx) => (
            <View key={idx} style={[styles.tableRow, idx % 2 === 1 ? styles.tableRowAlt : {}]}>
              <Text style={[styles.cellText, styles.colDescription]}>{pos.beschreibung}</Text>
              <Text style={[styles.cellText, styles.colMenge]}>{pos.menge}</Text>
              <Text style={[styles.cellText, styles.colEinzel]}>{formatCurrency(pos.einzelpreis)}</Text>
              <Text style={[styles.cellText, styles.colGesamt]}>{formatCurrency(pos.gesamt)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Nettobetrag</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.netto)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>zzgl. MwSt. {invoice.mwst_satz}%</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.mwst_betrag)}</Text>
          </View>
          <View style={styles.totalDivider} />
          <View style={styles.totalFinalRow}>
            <Text style={styles.totalFinalLabel}>Brutto-Gesamtbetrag</Text>
            <Text style={styles.totalFinalValue}>{formatCurrency(invoice.gesamt)}</Text>
          </View>
        </View>

        {/* Payment info */}
        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>Zahlungsinformationen</Text>
          <Text style={styles.paymentLine}>Zahlungsart: {invoice.zahlungsart}</Text>
          <Text style={styles.paymentLine}>Zahlungsziel: {formatDate(invoice.faellig_am)}</Text>
          {process.env.INVOICE_IBAN && (
            <Text style={styles.paymentLine}>IBAN: {process.env.INVOICE_IBAN}</Text>
          )}
          {process.env.INVOICE_BIC && (
            <Text style={styles.paymentLine}>BIC: {process.env.INVOICE_BIC}</Text>
          )}
          <Text style={[styles.paymentLine, { marginTop: 4, color: "#888888" }]}>
            Bitte geben Sie als Verwendungszweck Ihre Rechnungsnummer {invoice.nummer} an.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>WebAgentur | USt-IdNr./Steuernummer auf Anfrage</Text>
          <Text style={styles.footerText}>{invoice.nummer}</Text>
        </View>
      </Page>
    </Document>
  );
}
