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
    tipo_veicolo INTEGER REFERENCES TIPO_VEICOLO(id),
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
    orario_chiusura INTEGER REFERENCES ORARIO_CHIUSURA(id)
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
