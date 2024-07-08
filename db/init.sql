-- CREAZIONE TABELLE DEL DATABASE --

-- Crea la tabella UTENTE
CREATE TABLE IF NOT EXISTS "utente" (
    id_utente SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    cognome VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    ruolo VARCHAR(50) CHECK (ruolo IN ('operatore', 'varco', 'automobilista', 'admin')),
    token_rimanenti INTEGER
);

-- Crea la tabella TIPO_VEICOLO
CREATE TABLE IF NOT EXISTS "tipo_veicolo" (
    id_tipo_veicolo SERIAL PRIMARY KEY,
    descrizione VARCHAR(100) NOT NULL,
    tariffa_base DECIMAL(10, 2) NOT NULL
);

-- Crea la tabella VEICOLO
CREATE TABLE IF NOT EXISTS "veicolo" (
    targa VARCHAR(10) PRIMARY KEY,
    esente BOOLEAN DEFAULT FALSE,
    tipo_veicolo INTEGER REFERENCES tipo_veicolo(id_tipo_veicolo),
    utente INTEGER REFERENCES utente(id_utente)
);

-- Crea la tabella ZONA_ZTL
CREATE TABLE IF NOT EXISTS "zona_ztl" (
    id_zona SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Crea la tabella ORARIO_CHIUSURA
CREATE TABLE IF NOT EXISTS "orario_chiusura" (
    id_orario SERIAL PRIMARY KEY,
    giorni_settimana_festivi VARCHAR(50),
    fascia_oraria_F TIME,
    fascia_oraria_L TIME,
    tariffa_F DECIMAL(10, 2),
    tariffa_L DECIMAL(10, 2)
);

-- Crea la tabella VARCO_ZTL
CREATE TABLE IF NOT EXISTS "varco_ztl" (
    id_varco SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    via VARCHAR(100),
    zona_ztl INTEGER REFERENCES zona_ztl(id_zona),
    orario_chiusura INTEGER REFERENCES orario_chiusura(id_orario)
);

-- Crea la tabella TRANSITO
CREATE TABLE IF NOT EXISTS "transito" (
    id_transito SERIAL PRIMARY KEY,
    veicolo VARCHAR(10) REFERENCES veicolo(targa),
    varco INTEGER REFERENCES varco_ztl(id_varco),
    data_ora TIMESTAMP NOT NULL
);

-- Crea la tabella MULTA
CREATE TABLE IF NOT EXISTS "multa" (
    id_multa SERIAL PRIMARY KEY,
    transito INTEGER REFERENCES transito(id_transito),
    data_multa TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pagata BOOLEAN DEFAULT FALSE,
    importo_token INTEGER,
    uuid_pagamento UUID
);

-- SEEDING DEL DATABASE --

-- Inserisci dati nella tabella UTENTE
INSERT INTO "utente" (nome, cognome, email, ruolo, token_rimanenti) VALUES
('Arianna', 'Agresta', 'arianna.agresta@gmail.com', 'automobilista', 15),
('Andrea', 'Iasenzaniro', 'andrea.iasenzaniro@gmail.com', 'operatore', 10),
('Luca', 'Bianchi', 'luca.bianchi@example.com', 'automobilista', 20),
('Maria', 'Rossi', 'maria.rossi@example.com', 'varco', 5),
('Giulia', 'Verdi', 'giulia.verdi@example.com', 'admin', 50);

-- Inserisci dati nella tabella TIPO_VEICOLO
INSERT INTO "tipo_veicolo" (descrizione, tariffa_base) VALUES
('Moto', 3.00),
('Furgone', 7.50),
('Auto', 5.00),
('Bicicletta', 1.50);

-- Inserisci dati nella tabella VEICOLO
INSERT INTO "veicolo" (targa, esente, tipo_veicolo, utente) VALUES
('AB123CD', FALSE, 1, 1),
('IJ789KL', TRUE, 2, 2),
('XY456ZT', FALSE, 3, 3),
('MN234OP', TRUE, 4, 4),
('QR567UV', FALSE, 1, 5);

-- Inserisci dati nella tabella ZONA_ZTL
INSERT INTO "zona_ztl" (nome) VALUES
('Centro Storico'),
('Zona Industriale'),
('Zona Residenziale'),
('Zona Commerciale');

-- Inserisci dati nella tabella ORARIO_CHIUSURA
INSERT INTO "orario_chiusura" (giorni_settimana_festivi, fascia_oraria_F, fascia_oraria_L, tariffa_F, tariffa_L) VALUES
('Lun-Ven', '08:00', '18:00', 2.00, 1.50),
('Sab-Dom', '10:00', '20:00', 3.00, 2.50),
('Lun-Sab', '07:00', '19:00', 2.50, 1.75);

-- Inserisci dati nella tabella VARCO_ZTL
INSERT INTO "varco_ztl" (nome, via, zona_ztl, orario_chiusura) VALUES
('Varco 1', 'Via Roma', 1, 1),
('Varco 2', 'Via Milano', 2, 2),
('Varco 3', 'Via Napoli', 3, 3),
('Varco 4', 'Via Torino', 4, 1);

-- Inserisci dati nella tabella TRANSITO
INSERT INTO "transito" (veicolo, varco, data_ora) VALUES
('AB123CD', 1, '2024-07-07 08:30:00'),
('IJ789KL', 2, '2024-07-07 09:00:00'),
('XY456ZT', 3, '2024-07-07 10:15:00'),
('MN234OP', 4, '2024-07-07 11:45:00');

-- Inserisci dati nella tabella MULTA
INSERT INTO "multa" (transito, data_multa, pagata, importo_token, uuid_pagamento) VALUES
(1, '2024-07-07 10:00:00', FALSE, 5, '550e8400-e29b-41d4-a716-446655440000'),
(2, '2024-07-07 11:00:00', TRUE, 3, '550e8400-e29b-41d4-a716-446655440001'),
(3, '2024-07-07 12:30:00', FALSE, 6, '550e8400-e29b-41d4-a716-446655440002'),
(4, '2024-07-07 13:45:00', TRUE, 2, '550e8400-e29b-41d4-a716-446655440003');