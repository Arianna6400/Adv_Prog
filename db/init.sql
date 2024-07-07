-- CREAZIONE TABELLE DEL DATABASE --

-- Crea la tabella UTENTE
CREATE TABLE IF NOT EXISTS UTENTE (
    id_utente SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    cognome VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    ruolo VARCHAR(50) CHECK (ruolo IN ('operatore', 'varco', 'automobilista', 'admin')),
    token_rimanenti INTEGER
);

-- Crea la tabella TIPO_VEICOLO
CREATE TABLE IF NOT EXISTS TIPO_VEICOLO (
    id_tipo_veicolo SERIAL PRIMARY KEY,
    descrizione VARCHAR(100) NOT NULL,
    tariffa_base DECIMAL(10, 2) NOT NULL
);

-- Crea la tabella VEICOLO
CREATE TABLE IF NOT EXISTS VEICOLO (
    targa VARCHAR(10) PRIMARY KEY,
    esente BOOLEAN DEFAULT FALSE,
    tipo_veicolo INTEGER REFERENCES TIPO_VEICOLO(id_tipo_veicolo),
    utente INTEGER REFERENCES UTENTE(id_utente)
);

-- Crea la tabella ZONA_ZTL
CREATE TABLE IF NOT EXISTS ZONA_ZTL (
    id_zona SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Crea la tabella ORARIO_CHIUSURA
CREATE TABLE IF NOT EXISTS ORARIO_CHIUSURA (
    id_orario SERIAL PRIMARY KEY,
    giorni_settimana_festivi VARCHAR(50),
    fascia_oraria_F TIME,
    fascia_oraria_L TIME,
    tariffa_F DECIMAL(10, 2),
    tariffa_L DECIMAL(10, 2)
);

-- Crea la tabella VARCO_ZTL
CREATE TABLE IF NOT EXISTS VARCO_ZTL (
    id_varco SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    via VARCHAR(100),
    zona_ztl INTEGER REFERENCES ZONA_ZTL(id_zona),
    orario_chiusura INTEGER REFERENCES ORARIO_CHIUSURA(id_orario)
);

-- Crea la tabella TRANSITO
CREATE TABLE IF NOT EXISTS TRANSITO (
    id_transito SERIAL PRIMARY KEY,
    veicolo VARCHAR(10) REFERENCES VEICOLO(targa),
    varco INTEGER REFERENCES VARCO_ZTL(id_varco),
    data_ora TIMESTAMP NOT NULL
);

-- Crea la tabella MULTA
CREATE TABLE IF NOT EXISTS MULTA (
    id_multa SERIAL PRIMARY KEY,
    transito INTEGER REFERENCES TRANSITO(id_transito),
    data_multa TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    pagata BOOLEAN DEFAULT FALSE,
    importo_token INTEGER,
    uuid_pagamento UUID
);

-- SEEDING DEL DATABASE --

-- Inserisci dati nella tabella UTENTE
INSERT INTO UTENTE (nome, cognome, email, ruolo, token_rimanenti) VALUES
('Arianna', 'Agresta', 'arianna.agresta@gmail.com', 'automobilista', 15),
('Andrea', 'Iasenzaniro', 'andrea.iasenzaniro@gmail.com', 'operatore', 10);

-- Inserisci dati nella tabella TIPO_VEICOLO
INSERT INTO TIPO_VEICOLO (descrizione, tariffa_base) VALUES
('Moto', 3.00),
('Furgone', 7.50);

-- Inserisci dati nella tabella VEICOLO
INSERT INTO VEICOLO (targa, esente, tipo_veicolo, utente) VALUES
('AB123CD', FALSE, 1, 1),
('IJ789KL', TRUE, 2, 2);

-- Inserisci dati nella tabella ZONA_ZTL
INSERT INTO ZONA_ZTL (nome) VALUES
('Centro Storico'),
('Zona Industriale');

-- Inserisci dati nella tabella ORARIO_CHIUSURA
INSERT INTO ORARIO_CHIUSURA (giorni_settimana_festivi, fascia_oraria_F, fascia_oraria_L, tariffa_F, tariffa_L) VALUES
('Lun-Ven', '08:00', '18:00', 2.00, 1.50),
('Sab-Dom', '10:00', '20:00', 3.00, 2.50);

-- Inserisci dati nella tabella VARCO_ZTL
INSERT INTO VARCO_ZTL (nome, via, zona_ztl, orario_chiusura) VALUES
('Varco 1', 'Via Roma', 1, 1),
('Varco 2', 'Via Milano', 2, 2);

-- Inserisci dati nella tabella TRANSITO
INSERT INTO TRANSITO (veicolo, varco, data_ora) VALUES
('AB123CD', 1, '2024-07-07 08:30:00'),
('IJ789KL', 2, '2024-07-07 09:00:00');

-- Inserisci dati nella tabella MULTA
INSERT INTO MULTA (transito, data_multa, pagata, importo_token, uuid_pagamento) VALUES
(1, '2024-07-07 10:00:00', FALSE, 5, '550e8400-e29b-41d4-a716-446655440000'),
(2, '2024-07-07 11:00:00', TRUE, 3, '550e8400-e29b-41d4-a716-446655440001');
