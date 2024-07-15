# Progetto Programmazione Avanzata A.A. 23/24

![Typescript](https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visualstudiocode&logoColor=white)

# Indice

1. [Obiettivo](#-obiettivo)
2. [Progettazione](#-progettazione)
   1. [Architettura dei servizi](#-architettura-dei-servizi)
   2. [Diagramma dei casi d'uso](#-diagramma-dei-casi-duso)
   3. [Diagramma E-R](#-diagramma-e-r)
   4. [Diagrammi delle sequenze](#-diagrammi-delle-sequenze)
3. [API](#-api)
4. [Set-up](#-set-up)
5. [Strumenti utilizzati](#-strumenti-utilizzati)
6. [Autori](#-autori)

# 📌 Obiettivo

# 🏗️ Progettazione

## 🖥️ Architettura dei servizi

```mermaid
graph TD;
    subgraph Rete-Backend
        subgraph Container-Transiti
            transiti[Backend-Transiti<br>transiti:3000]
        end
        subgraph Container-Pagamenti
            pagamenti[Backend-Pagamenti<br>pagamenti:3001]
        end
        subgraph Container-DB
            db[(PostgreSQL<br>db:5432)]
        end
    end

    user[Utente]
    
    user --> |API calls| transiti
    user --> |API calls| pagamenti
    transiti --> |depends_on| db
    pagamenti --> |depends_on| db

    style transiti fill:#f9f,stroke:#333,stroke-width:4px
    style pagamenti fill:#9ff,stroke:#333,stroke-width:4px
    style db fill:#ff9,stroke:#333,stroke-width:4px
    style user fill:#acf,stroke:#333,stroke-width:4px
```

## 📊 Diagramma dei casi d'uso

```mermaid
graph TD
    Operatore(fa:fa-user Operatore) ---|Gestione| GestioneZTL(fa:fa-folder-open Gestione_ZTL)
    Operatore ---|Gestione| GestioneVarchi(fa:fa-folder-open Gestione_Varchi)
    Operatore ---|Gestione| GestioneTransiti(fa:fa-folder-open Gestione_Transiti)
    Operatore ---|Eliminazione| EliminazioneTransiti(fa:fa-folder-open Eliminazione_e_Update_Transiti)

    GestioneTransiti ----|Include| InserimentoTransiti(fa:fa-folder-open Inserimento_Transiti)
    GestioneTransiti ---|Include| EliminazioneTransiti
    GestioneTransiti ---|Include| CreazioneAutomaticaMulta(fa:fa-folder-open Creazione_Automatica_Multa)
    Varco(fa:fa-road Varco) ---|Inserimento| InserimentoTransiti

    Automobilista(fa:fa-user-lock Automobilista) ---|Verifica| VerificaMulte(fa:fa-folder-open Verifica_Multe)
    Automobilista ---|Scarica| ScaricaBollettino(fa:fa-folder-open Scarica_Bollettino)
    Automobilista ---|Pagamento| PagamentoMulta(fa:fa-folder-open Pagamento_Multa)

    VerificaMulte ----|Controlla| CreazioneAutomaticaMulta
```

## 🗂️ Diagramma E-R

```mermaid
erDiagram
    TIPO_VEICOLO {
        int id_tipo_veicolo PK
        string descrizione 
        float tariffa_base
    }

    VEICOLO {
        string targa PK
        bool esente
        int tipo_veicolo FK
        int utente FK
    }

    TRANSITO {
        int id_transito PK
        datetime data_ora
        string veicolo FK
        int varco FK
    }

    MULTA {
        int id_multa PK
        datetime data_multa
        bool pagata
        float importo_token
        int uuid_pagamento
        int transito FK
    }

    UTENTE {
        int id_utente PK
        string nome
        string cognome
        string email
        string ruolo
        float token_rimanenti
    }

    ZONA_ZTL {
        int id_zona PK
        string nome
    }

    VARCO_ZTL {
        int id_varco PK
        string nome
        string via
        int zona_ztl FK
        int orario_chiusura FK
    }

    ORARIO_CHIUSURA {
        int id_orario PK
        string giorni_settimana_festivi
        datetime orario_inizio_l
        datetime orario_fine_l
        datetime orario_inizio_f
        datetime orario_fine_f
        float tariffa_f
        float tariffa_l
    }

    IS_VARCO {
        int id_utente PK, FK
        int id_varco PK, FK
    }

    UTENTE ||--o{ VEICOLO : "owns"
    TIPO_VEICOLO ||--o{ VEICOLO : "is"
    VEICOLO ||--o{ TRANSITO : "executes"
    TRANSITO |o--o| MULTA : "creates"
    ZONA_ZTL ||--o{ VARCO_ZTL : "include"
    ORARIO_CHIUSURA ||--o{ VARCO_ZTL : "has"
    VARCO_ZTL ||--o{ TRANSITO : "crosses"
    UTENTE ||--o| IS_VARCO : "has"
    VARCO_ZTL ||--o| IS_VARCO : "has"
```
## 🔄 Diagrammi delle sequenze

🚌 **Backend-Transiti**

* __POST /login__

```mermaid
sequenceDiagram
    participant U as Utente
    participant Auth as AuthMiddleware
    participant JWT as JWT Library
    participant ENV as Environment
    participant Err as ErrorHandler
 
    U->>+Auth: Richiesta con credenziali
    Auth->>+ENV: Ottiene JWT_SECRET
    ENV-->>Auth: JWT_SECRET
    Auth->>+JWT: jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
    JWT-->>Auth: Token generato
    Auth-->>U: Restituisce token
 
    U->>+Auth: Richiesta con token
    Auth->>+ENV: Ottiene JWT_SECRET
    ENV-->>Auth: JWT_SECRET
    Auth->>+JWT: jwt.verify(token, JWT_SECRET)
    alt Token valido
        JWT-->>Auth: Payload decodificato
        Auth-->>U: Accesso consentito
    else Token non valido
        JWT-->>Auth: null
        Auth-->>Err: Genera errore, token non valido
        Err-->>U: Accesso negato
    end
```

* __GET /varchi/:id/transiti__

```mermaid
sequenceDiagram
    participant U as Utente
    participant C as Controller
    participant R as VarcoZtlRepository
    participant DAO_VZ as VarcoZtlDao
    participant DAO_Z as ZonaZtlDao
    participant DAO_OC as OrarioChiusuraDao
    participant DAO_T as TransitoDao
    participant DAO_V as VeicoloDao
    participant VZ as VarcoZtl
    participant Z as ZonaZtl
    participant OC as OrarioChiusura
    participant T as Transito
    participant V as Veicolo
    participant Auth as AuthMiddleware
    participant Err as ErrorHandler
    participant JWT as JWT 
    participant ENV as Environment

    U->>+Auth: Richiesta con token
    Auth->>+ENV: Ottiene JWT_SECRET
    ENV-->>Auth: JWT_SECRET
    Auth->>+JWT: jwt.verify(token, JWT_SECRET)
    alt Token valido
        JWT-->>Auth: Payload decodificato
        Auth->>C: Passa controllo
    else Token non valido
        JWT-->>Auth: null
        Auth-->>Err: Genera errore
        Err-->>U: Errore autenticazione
    end
    C->>+R: getVarcoZtlWithTransiti(id)
    R->>+DAO_VZ: getById(id)
    DAO_VZ->>+VZ: Trova varco ZTL per ID
    alt Varco trovato
        VZ-->>DAO_VZ: Varco ZTL
        DAO_VZ-->>R: Varco ZTL
    else Varco non trovato
        VZ-->>DAO_VZ: null
        DAO_VZ-->>R: null
        R-->>C: null
        C-->>U: Varco ZTL non trovato
    end
    R->>+DAO_Z: getById(varcoZtl.zona_ztl)
    DAO_Z->>+Z: Trova zona ZTL per ID
    alt Zona trovata
        Z-->>DAO_Z: Zona ZTL
        DAO_Z-->>R: Zona ZTL
    else Zona non trovata
        Z-->>DAO_Z: null
        DAO_Z-->>R: null
        R-->>C: null
        C-->>U: Zona ZTL non trovata
    end
    R->>+DAO_OC: getById(varcoZtl.orario_chiusura)
    DAO_OC->>+OC: Trova orario di chiusura per ID
    alt Orario trovato
        OC-->>DAO_OC: Orario di chiusura
        DAO_OC-->>R: Orario di chiusura
    else Orario non trovato
        OC-->>DAO_OC: null
        DAO_OC-->>R: null
        R-->>C: null
        C-->>U: Orario di chiusura non trovato
    end
    R->>+DAO_T: getAll()
    DAO_T->>+T: Trova tutti i transiti
    alt Transiti trovati
        T-->>DAO_T: Transiti
        DAO_T-->>R: Transiti
        R->>+DAO_V: getById(transito.veicolo)
        DAO_V->>+V: Trova veicolo per ID
        alt Veicolo trovato
            V-->>DAO_V: Veicolo
            DAO_V-->>R: Veicolo
        else Veicolo non trovato
            V-->>DAO_V: null
            DAO_V-->>R: null
        end
        R-->>C: Varco ZTL con dettagli e transiti
        C-->>U: Varco ZTL con transiti
    else Transiti non trovati
        T-->>DAO_T: null
        DAO_T-->>R: null
        R-->>C: null
        C-->>U: Transiti non trovati
    end
```

* __POST /varcoZtl__

```mermaid
sequenceDiagram
    participant U as Utente
    participant Auth as AuthMiddleware
    participant C as Controller
    participant R as VarcoZtlRepository
    participant DAO_VZ as VarcoZtlDao
    participant DAO_U as UtenteDao
    participant DAO_IV as IsVarcoDao
    participant VZ as VarcoZtl
    participant UTE as Utente
    participant IV as IsVarco
    participant Err as ErrorHandler
    participant DB as Database
    participant TR as Transaction

    U->>+Auth: Richiesta con token
    Auth->>+C: Token valido e ruolo verificato
    alt Utente autorizzato
        Auth-->>C: Autorizzazione passata
        C->>+R: createVarcoZtl(req.body)
        R->>+DB: Ottiene istanza database
        DB-->>R: Istanza database
        R->>+TR: Start Transaction
        R->>+DAO_VZ: create(data, { transaction })
        DAO_VZ->>+VZ: Crea nuovo varco ZTL
        alt Varco creato
            VZ-->>DAO_VZ: Nuovo varco ZTL
            DAO_VZ-->>R: Nuovo varco ZTL
        else Varco non creato
            VZ-->>DAO_VZ: null
            DAO_VZ-->>R: null
            R-->>TR: Rollback Transaction
            R-->>C: Errore creazione varco
            C-->>Err: Genera errore, creazione varco fallita
            Err-->>U: Errore creazione varco
        end
        R->>+DAO_U: create(data, { transaction })
        DAO_U->>+UTE: Crea nuovo utente
        alt Utente creato
            UTE-->>DAO_U: Nuovo utente
            DAO_U-->>R: Nuovo utente
        else Utente non creato
            UTE-->>DAO_U: null
            DAO_U-->>R: null
            R-->>TR: Rollback Transaction
            R-->>C: Errore creazione utente
            C-->>Err: Genera errore, creazione utente fallita
            Err-->>U: Errore creazione utente
        end
        R->>+DAO_IV: create(data, { transaction })
        DAO_IV->>+IV: Crea associazione is_varco
        alt Associazione creata
            IV-->>DAO_IV: Associazione creata
            DAO_IV-->>R: Associazione creata
            R-->>TR: Commit Transaction
            R-->>C: Varco creato con successo
            C-->>U: Varco creato con successo
        else Associazione non creata
            IV-->>DAO_IV: null
            DAO_IV-->>R: null
            R-->>TR: Rollback Transaction
            R-->>C: Errore creazione associazione
            C-->>Err: Genera errore, creazione associazione fallita
            Err-->>U: Errore creazione associazione
        end
    else Utente non autorizzato
        Auth-->>C: Autorizzazione fallita
        C-->>Err: Genera errore, accesso non autorizzato
        Err-->>U: Accesso non autorizzato
    end
```

* __DELETE /zonaZtl/:id__   

```mermaid
sequenceDiagram
    participant U as Utente
    participant Auth as AuthMiddleware
    participant C as Controller
    participant R as ZonaZtlRepository
    participant DAO_VZ as VarcoZtlDao
    participant DAO_ZZ as ZonaZtlDao
    participant ZZ as ZonaZtl
    participant VZ as VarcoZtl
    participant Err as ErrorHandler

    U->>+Auth: Richiesta con token
    Auth->>+C: Token valido e ruolo verificato
    alt Utente autorizzato
        Auth-->>C: Autorizzazione passata
        C->>+R: deleteZonaZtl(id)
        R->>+DAO_VZ: getAll()
        DAO_VZ->>+VZ: Verifica varchi associati alla zona
        alt Varchi associati trovati
            VZ-->>DAO_VZ: Varchi associati trovati
            DAO_VZ-->>R: Varchi associati trovati
            R-->>C: Impossibile eliminare zona con varchi associati
            C-->>Err: Genera errore, zona con varchi associati
            Err-->>U: Errore, zona con varchi associati
        else Nessun varco associato
            VZ-->>DAO_VZ: Nessun varco associato
            DAO_VZ-->>R: Nessun varco associato
            R->>+DAO_ZZ: delete(id)
            DAO_ZZ->>+ZZ: Cancella zona ZTL
            alt Zona cancellata
                ZZ-->>DAO_ZZ: Zona ZTL cancellata
                DAO_ZZ-->>R: Zona ZTL cancellata
                R-->>C: Zona ZTL cancellata
                C-->>U: Zona ZTL cancellata con successo
            else Zona non trovata
                ZZ-->>DAO_ZZ: null
                DAO_ZZ-->>R: null
                R-->>C: Zona ZTL non trovata
                C-->>Err: Genera errore, zona ZTL non trovata
                Err-->>U: Errore, zona ZTL non trovata
            end
        end
    else Utente non autorizzato
        Auth-->>C: Autorizzazione fallita
        C-->>Err: Genera errore, accesso non autorizzato
        Err-->>U: Accesso non autorizzato
    end
```

* __GET /transiti/:id__

```mermaid
sequenceDiagram
    participant U as Utente
    participant Auth as AuthMiddleware
    participant C as Controller
    participant R as TransitoRepository
    participant DAO_T as TransitoDao
    participant DAO_V as VeicoloDao
    participant DAO_Z as VarcoZtlDao
    participant T as Transito
    participant V as Veicolo
    participant Z as VarcoZtl
    participant Err as ErrorHandler

    U->>+Auth: Richiesta con token
    Auth->>+C: Token valido e ruolo verificato
    alt Utente autorizzato
        Auth-->>C: Autorizzazione passata
        C->>+R: getTransitoById(id)
        R->>+DAO_T: getById(id)
        DAO_T->>+T: Trova transito per ID
        alt Transito trovato
            T-->>DAO_T: Transito
            DAO_T-->>R: Transito
        else Transito non trovato
            T-->>DAO_T: null
            DAO_T-->>R: null
            R-->>C: null
            C-->>Err: Genera errore, transito non trovato
            Err-->>U: Transito non trovato
        end
        R->>+DAO_V: getById(transito.veicolo)
        DAO_V->>+V: Trova veicolo per ID
        alt Veicolo trovato
            V-->>DAO_V: Veicolo
            DAO_V-->>R: Veicolo
        else Veicolo non trovato
            V-->>DAO_V: null
            DAO_V-->>R: null
            R-->>C: null
            C-->>Err: Genera errore, veicolo non trovato
            Err-->>U: Veicolo non trovato
        end
        R->>+DAO_Z: getById(transito.varco)
        DAO_Z->>+Z: Trova varco ZTL per ID
        alt Varco trovato
            Z-->>DAO_Z: Varco ZTL
            DAO_Z-->>R: Varco ZTL
        else Varco non trovato
            Z-->>DAO_Z: null
            DAO_Z-->>R: null
            R-->>C: null
            C-->>Err: Genera errore, varco non trovato
            Err-->>U: Varco non trovato
        end
        R-->>C: Transito, Veicolo, Varco ZTL
        C-->>U: Transito con dettagli
    else Utente non autorizzato
        Auth-->>C: Autorizzazione fallita
        C-->>Err: Genera errore, accesso non autorizzato
        Err-->>U: Accesso non autorizzato
    end
```

* __POST /transiti__

```mermaid
sequenceDiagram
    participant U as Utente
    participant Auth as AuthMiddleware
    participant C as Controller
    participant R as TransitoRepository
    participant DAO_T as TransitoDao
    participant DAO_V as VeicoloDao
    participant DAO_Z as VarcoZtlDao
    participant DAO_M as MultaDao
    participant T as Transito
    participant V as Veicolo
    participant Z as VarcoZtl
    participant M as Multa
    participant Err as ErrorHandler
    participant DB as Database
    participant TR as Transaction

    U->>+Auth: Richiesta con token
    Auth->>+C: Token valido e ruolo verificato
    alt Utente autorizzato
        Auth-->>C: Autorizzazione passata
        C->>+R: createTransito(req.body)
        R->>+DB: Ottiene istanza database
        DB-->>R: Istanza database
        R->>+TR: Start Transaction
        R->>+DAO_T: create(data, { transaction })
        DAO_T->>+T: Crea nuovo transito
        T-->>DAO_T: Nuovo transito
        DAO_T-->>R: Nuovo transito
        R->>+DAO_V: getById(transito.veicolo)
        DAO_V->>+V: Trova veicolo per ID
        alt Veicolo trovato
            V-->>DAO_V: Veicolo
            DAO_V-->>R: Veicolo
        else Veicolo non trovato
            V-->>DAO_V: null
            DAO_V-->>R: null
            R-->>TR: Rollback Transaction
            R-->>C: Veicolo non trovato
            C-->>Err: Genera errore, veicolo non trovato
            Err-->>U: Errore creazione transito
        end
        R->>+DAO_Z: getById(transito.varco)
        DAO_Z->>+Z: Trova varco ZTL per ID
        alt Varco trovato
            Z-->>DAO_Z: Varco ZTL
            DAO_Z-->>R: Varco ZTL
        else Varco non trovato
            Z-->>DAO_Z: null
            DAO_Z-->>R: null
            R-->>TR: Rollback Transaction
            R-->>C: Varco non trovato
            C-->>Err: Genera errore, varco non trovato
            Err-->>U: Errore creazione transito
        end
        alt Necessario calcolare multa
            R->>+R: shouldCalculateMulta(newTransito)
            R->>+DAO_M: calcolaMulta(newTransito)
            DAO_M->>+M: Calcola e crea multa
            M-->>DAO_M: Multa creata
            DAO_M-->>R: Multa creata
            R-->>TR: Commit Transaction
            R-->>C: Nuovo transito e multa creati
            C-->>U: Transito e multa creati con successo
        else Non necessario calcolare multa
            R-->>TR: Commit Transaction
            R-->>C: Nuovo transito
            C-->>U: Transito creato con successo
        end
    else Utente non autorizzato
        Auth-->>C: Autorizzazione fallita
        C-->>Err: Genera errore, accesso non autorizzato
        Err-->>U: Accesso non autorizzato
    end
```

* __GET /multe/bollettino/:uuid__

```mermaid
sequenceDiagram
    participant U as Utente
    participant Auth as AuthMiddleware
    participant C as Controller
    participant R as MultaRepository
    participant DAO_M as MultaDao
    participant DAO_T as TransitoDao
    participant DAO_V as VeicoloDao
    participant M as Multa
    participant T as Transito
    participant V as Veicolo
    participant Err as ErrorHandler
    participant QR as QRCode
    participant PDF as PDFDocument

    U->>+Auth: Richiesta con token
    Auth->>+C: Token valido e ruolo verificato
    alt Utente autorizzato
        Auth-->>C: Autorizzazione passata
        C->>+R: getMultaWithDetailsByUUID(uuid, utenteId)
        R->>+DAO_M: getMultaByUUID(uuid)
        DAO_M->>+M: Trova multa per UUID
        alt Multa trovata
            M-->>DAO_M: Multa
            DAO_M-->>R: Multa
        else Multa non trovata
            M-->>DAO_M: null
            DAO_M-->>R: null
            R-->>C: null
            C-->>Err: Genera errore, multa non trovata
            Err-->>U: Multa non trovata
        end
        R->>+DAO_T: getById(multa.transito)
        DAO_T->>+T: Trova transito per ID
        alt Transito trovato
            T-->>DAO_T: Transito
            DAO_T-->>R: Transito
        else Transito non trovato
            T-->>DAO_T: null
            DAO_T-->>R: null
            R-->>C: null
            C-->>Err: Genera errore, transito non trovato
            Err-->>U: Transito non trovato
        end
        R->>+DAO_V: getById(transito.veicolo)
        DAO_V->>+V: Trova veicolo per ID
        alt Veicolo trovato
            V-->>DAO_V: Veicolo
            DAO_V-->>R: Veicolo
        else Veicolo non trovato
            V-->>DAO_V: null
            DAO_V-->>R: null
            R-->>C: null
            C-->>Err: Genera errore, veicolo non trovato
            Err-->>U: Veicolo non trovato
        end
        R-->>C: Multa, Transito, Veicolo
        C->>+QR: generateQRCode(qrString)
        QR-->>C: qrCodeUrl
        C->>+PDF: createPDF(res, { multa, transito, veicolo, qrCodeUrl })
        PDF-->>U: Bollettino PDF
    else Utente non autorizzato
        Auth-->>C: Autorizzazione fallita
        C-->>Err: Genera errore, accesso non autorizzato
        Err-->>U: Accesso non autorizzato
    end
```

💳 **Backend-Pagamenti**

* __POST /pagamulta__

```mermaid
sequenceDiagram
    participant U as Utente
    participant Auth as AuthMiddleware
    participant C as Controller
    participant DAO_M as MultaDao
    participant DAO_U as UtenteDao
    participant M as Multa
    participant UTE as Utente
    participant Err as ErrorHandler
    participant TR as Transaction
    participant DB as Database

    U->>+Auth: Richiesta con token
    Auth->>+C: Token valido e ruolo verificato
    alt Utente autorizzato
        C->>+DB: Ottiene istanza database
        DB-->>C: Istanza database
        C->>+TR: Start Transaction
        C->>+DAO_M: getMultaByUUID(uuid, { transaction })
        DAO_M->>+M: Trova multa per UUID
        alt Multa trovata
            M-->>DAO_M: Multa
            DAO_M-->>C: Multa
            alt Multa non pagata
                C->>+DAO_U: getById(id, { transaction })
                DAO_U->>+UTE: Trova utente per ID
                alt Utente trovato
                    UTE-->>DAO_U: Utente
                    DAO_U-->>C: Utente
                    alt Token sufficienti
                        C->>UTE: Aggiorna token
                        C->>M: Segna multa come pagata
                        C->>+TR: Commit Transaction
                        TR-->>C: Transazione completata
                        C-->>U: Pagamento effettuato con successo
                    else Token insufficienti
                        C-->>TR: Rollback Transaction
                        TR-->>C: Transazione annullata
                        C-->>Err: Genera errore, token insufficienti
                        Err-->>U: Errore, token insufficienti
                    end
                else Utente non trovato
                    UTE-->>DAO_U: null
                    DAO_U-->>C: null
                    C-->>TR: Rollback Transaction
                    TR-->>C: Transazione annullata
                    C-->>Err: Genera errore, utente non trovato
                    Err-->>U: Errore, utente non trovato
                end
            else Multa già pagata
                C-->>TR: Rollback Transaction
                TR-->>C: Transazione annullata
                C-->>Err: Genera errore, multa già pagata
                Err-->>U: Multa già pagata
            end
        else Multa non trovata
            M-->>DAO_M: null
            DAO_M-->>C: null
            C-->>TR: Rollback Transaction
            TR-->>C: Transazione annullata
            C-->>Err: Genera errore, multa non trovata
            Err-->>U: Errore, multa non trovata
        end
    else Utente non autorizzato
        C-->>Err: Genera errore, accesso non autorizzato
        Err-->>U: Accesso non autorizzato
    end
```

* __POST /ricaricatoken/:id__

```mermaid
sequenceDiagram
    participant U as Utente
    participant Auth as AuthMiddleware
    participant C as Controller
    participant DAO_U as UtenteDao
    participant UTE as Utente
    participant Err as ErrorHandler

    U->>+Auth: Richiesta con token
    Auth->>+C: Token valido e ruolo verificato
    alt Utente autorizzato
        C->>+DAO_U: rechargeTokens(id, tokens)
        DAO_U->>+UTE: Ricarica token utente
        alt Utente trovato
            UTE-->>DAO_U: Utente aggiornato
            DAO_U-->>C: Utente aggiornato
            C-->>U: Token ricaricati con successo
        else Utente non trovato
            UTE-->>DAO_U: null
            DAO_U-->>C: null
            C-->>Err: Genera errore, utente non trovato
            Err-->>U: Errore, utente non trovato
        end
    else Utente non autorizzato
        C-->>Err: Genera errore, accesso non autorizzato
        Err-->>U: Accesso non autorizzato
    end
```

# 🔌 API

# ⚙️ Set-up

# 🛠️ Strumenti utilizzati

[![](https://skillicons.dev/icons?i=ts,express,nodejs,sequelize,docker,postgres,postman,github,vscode)](https://skillicons.dev)

# 👥 Autori 

|Nome | GitHub |
|-----------|--------|
| 👩 **Agresta Arianna** | [Click here](https://github.com/Arianna6400) |
| 👨 **Iasenzaniro Andrea** | [Click here](https://github.com/AndreaIasenzaniro) |
