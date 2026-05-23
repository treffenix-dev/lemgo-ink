-- Agentur Portal — Supabase Schema
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS customer_profiles (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  vorname       TEXT NOT NULL DEFAULT '',
  nachname      TEXT NOT NULL DEFAULT '',
  firma         TEXT NOT NULL DEFAULT '',
  email         TEXT NOT NULL DEFAULT '',
  telefon       TEXT NOT NULL DEFAULT '',
  strasse       TEXT NOT NULL DEFAULT '',
  plz           TEXT NOT NULL DEFAULT '',
  ort           TEXT NOT NULL DEFAULT '',
  land          TEXT NOT NULL DEFAULT 'Deutschland',
  branche       TEXT NOT NULL DEFAULT '',
  website       TEXT, instagram TEXT, facebook TEXT, tiktok TEXT,
  logo_vorhanden BOOLEAN DEFAULT FALSE,
  texte_vorhanden BOOLEAN DEFAULT FALSE,
  bilder_vorhanden BOOLEAN DEFAULT FALSE,
  speisekarte_vorhanden BOOLEAN DEFAULT FALSE,
  buchung_gewuenscht BOOLEAN DEFAULT FALSE,
  bestellung_gewuenscht BOOLEAN DEFAULT FALSE,
  notizen       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id   UUID REFERENCES customer_profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL DEFAULT '',
  paket         TEXT NOT NULL CHECK (paket IN ('starter', 'business', 'pro')),
  status        TEXT NOT NULL DEFAULT 'nicht_gestartet' CHECK (status IN (
    'nicht_gestartet', 'daten_ausfuellen', 'warten_upload', 'in_arbeit', 'review', 'aenderungen_noetig', 'fertig', 'archiviert'
  )),
  beschreibung  TEXT, notizen TEXT, start_datum DATE, fertig_datum DATE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number  TEXT UNIQUE NOT NULL,
  customer_id     UUID REFERENCES customer_profiles(id) ON DELETE SET NULL,
  project_id      UUID REFERENCES projects(id) ON DELETE SET NULL,
  betrag          NUMERIC(10,2) NOT NULL DEFAULT 0,
  mwst            NUMERIC(5,2) NOT NULL DEFAULT 19,
  gesamt          NUMERIC(10,2) NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'offen' CHECK (status IN ('offen', 'bezahlt', 'storniert', 'ueberfaellig')),
  faellig_am      DATE, bezahlt_am DATE, zahlungsart TEXT,
  positionen      JSONB DEFAULT '[]', notizen TEXT, stripe_invoice_id TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE SEQUENCE IF NOT EXISTS invoice_seq START 1;

CREATE TABLE IF NOT EXISTS tickets (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id   UUID REFERENCES customer_profiles(id) ON DELETE CASCADE,
  project_id    UUID REFERENCES projects(id) ON DELETE SET NULL,
  titel         TEXT NOT NULL,
  kategorie     TEXT NOT NULL DEFAULT 'allgemein',
  beschreibung  TEXT NOT NULL DEFAULT '',
  prioritaet    TEXT NOT NULL DEFAULT 'mittel' CHECK (prioritaet IN ('niedrig', 'mittel', 'hoch', 'kritisch')),
  status        TEXT NOT NULL DEFAULT 'offen' CHECK (status IN ('offen', 'in_bearbeitung', 'warten_kunde', 'warten_owner', 'geloest', 'archiviert')),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ticket_replies (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id   UUID REFERENCES tickets(id) ON DELETE CASCADE,
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  text        TEXT NOT NULL, anhaenge TEXT[],
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vorname         TEXT NOT NULL DEFAULT '', nachname TEXT NOT NULL DEFAULT '',
  firma           TEXT, email TEXT NOT NULL, telefon TEXT,
  quelle          TEXT DEFAULT 'Website', interesse TEXT NOT NULL DEFAULT '',
  budget          TEXT,
  status          TEXT NOT NULL DEFAULT 'neu' CHECK (status IN ('neu', 'kontaktiert', 'angebot_gesendet', 'gewonnen', 'verloren')),
  naechste_aktion TEXT, notizen TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tasks (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id   UUID REFERENCES customer_profiles(id) ON DELETE SET NULL,
  project_id    UUID REFERENCES projects(id) ON DELETE SET NULL,
  titel         TEXT NOT NULL, beschreibung TEXT,
  prioritaet    TEXT NOT NULL DEFAULT 'mittel' CHECK (prioritaet IN ('niedrig', 'mittel', 'hoch')),
  status        TEXT NOT NULL DEFAULT 'offen' CHECK (status IN ('offen', 'in_arbeit', 'erledigt')),
  faellig_am    DATE, zeitaufwand INTEGER,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  typ         TEXT NOT NULL, titel TEXT NOT NULL, text TEXT NOT NULL,
  gelesen     BOOLEAN DEFAULT FALSE, link TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notes (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  titel       TEXT NOT NULL DEFAULT 'Notiz', inhalt TEXT NOT NULL DEFAULT '',
  typ         TEXT DEFAULT 'notiz' CHECK (typ IN ('notiz', 'journal', 'idee', 'kundenhinweis')),
  customer_id UUID REFERENCES customer_profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE ticket_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_owner() RETURNS BOOLEAN AS $$
  SELECT COALESCE((auth.jwt() -> 'user_metadata' ->> 'role') = 'owner', FALSE);
$$ LANGUAGE SQL SECURITY DEFINER;

CREATE POLICY "customers_own_profile" ON customer_profiles FOR ALL USING (user_id = auth.uid() OR is_owner());
CREATE POLICY "customers_own_projects" ON projects FOR ALL USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()) OR is_owner());
CREATE POLICY "customers_own_invoices" ON invoices FOR SELECT USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()) OR is_owner());
CREATE POLICY "owner_manage_invoices" ON invoices FOR ALL USING (is_owner());
CREATE POLICY "customers_own_tickets" ON tickets FOR ALL USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()) OR is_owner());
CREATE POLICY "ticket_replies_access" ON ticket_replies FOR ALL USING (ticket_id IN (SELECT t.id FROM tickets t JOIN customer_profiles cp ON t.customer_id = cp.id WHERE cp.user_id = auth.uid()) OR is_owner());
CREATE POLICY "customers_own_tasks" ON tasks FOR ALL USING (customer_id IN (SELECT id FROM customer_profiles WHERE user_id = auth.uid()) OR is_owner());
CREATE POLICY "own_notifications" ON notifications FOR ALL USING (user_id = auth.uid() OR is_owner());

CREATE OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER customer_profiles_updated_at BEFORE UPDATE ON customer_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tickets_updated_at BEFORE UPDATE ON tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at();
