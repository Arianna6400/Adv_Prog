# Progetto Programmazione Avanzata A.A. 23/24

![Typescript](https://img.shields.io/badge/Typescript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visualstudiocode&logoColor=white)

# Indice

1. [Obiettivo](#obiettivo)
2. [Progettazione](#progettazione)
   1. [Architettura dei servizi](#architettura-dei-servizi)
   2. [Diagramma dei casi d'uso](#diagramma-dei-casi-duso)
   3. [Diagramma E-R](#diagramma-e-r)
   4. [Diagrammi delle sequenze](#diagrammi-delle-sequenze)
3. [API](#api)
4. [Set-up](#set-up)
5. [Strumenti utilizzati](#strumenti-utilizzati)
6. [Autori](#autori)

## 📌 Obiettivo

## 🏗️ Progettazione

### 🖥️ Architettura dei servizi

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

### 📊 Diagramma dei casi d'uso

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

### 🗂️ Diagramma E-R

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
### 🔄 Diagrammi delle sequenze

🚌 **Backend-Transiti**

💳 **Backend-Pagamenti**

* __POST /pagamulta__

```mermaid
sequenceDiagram
    participant U as Utente
    participant C as Controller
    participant DAO_M as MultaDao
    participant DAO_U as UtenteDao
    participant M as Multa
    participant DB as Database
    participant Auth as AuthMiddleware
    participant Err as ErrorHandler
    participant JWT as JWT Library
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
    C->>+DB: Start Transaction
    C->>+DAO_M: getMultaByUUID(uuid)
    DAO_M->>+M: Trova multa per UUID
    alt Multa trovata
        M-->>DAO_M: Multa
        DAO_M-->>C: Multa
    else Multa non trovata
        M-->>DAO_M: null
        DAO_M-->>C: null
        C->>DB: Rollback Transaction
        C-->>U: Multa non trovata
    end
    alt Multa già pagata
        C->>DB: Rollback Transaction
        C-->>U: Multa già pagata
    end
    C->>+DAO_U: getById(id)
    DAO_U->>+U: Trova utente per ID
    alt Utente trovato
        U-->>DAO_U: Utente
        DAO_U-->>C: Utente
    else Utente non trovato
        U-->>DAO_U: null
        DAO_U-->>C: null
        C->>DB: Rollback Transaction
        C-->>U: Utente non trovato
    end
    alt Token insufficienti
        C->>DB: Rollback Transaction
        C-->>U: Token insufficienti
    end
    C->>+DAO_U: Aggiorna token_rimanenti
    DAO_U->>U: Aggiorna token
    C->>+DAO_M: Aggiorna stato multa a pagata
    DAO_M->>M: Aggiorna stato multa
    C->>DB: Commit Transaction
    C-->>U: Pagamento effettuato con successo
```

* __POST /ricaricatoken/:id__

```mermaid
sequenceDiagram
    participant U as Utente
    participant C as Controller
    participant DAO_U as UtenteDao
    participant Auth as AuthMiddleware
    participant Err as ErrorHandler
    participant JWT as JWT Library
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
    C->>+DAO_U: rechargeTokens(id, tokens)
    DAO_U->>+U: Trova e aggiorna utente per ID
    alt Utente trovato
        U-->>DAO_U: Utente aggiornato
        DAO_U-->>C: Utente aggiornato
        C-->>U: Token ricaricati con successo
    else Utente non trovato
        U-->>DAO_U: null
        DAO_U-->>C: null
        C-->>U: Utente non trovato
    end
```

## 🔌 API

## ⚙️ Set-up

## 🛠️ Strumenti utilizzati

[![](https://skillicons.dev/icons?i=ts,express,nodejs,sequelize,docker,postgres,postman,github,vscode)](https://skillicons.dev)

## 👥 Autori 

|Nome | GitHub |
|-----------|--------|
| 👩 **Agresta Arianna** | [Click here](https://github.com/Arianna6400) |
| 👨 **Iasenzaniro Andrea** | [Click here](https://github.com/AndreaIasenzaniro) |
