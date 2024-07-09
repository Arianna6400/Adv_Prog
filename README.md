# Progetto Programmazione Avanzata A.A. 23/24

# Indice

1. [Obiettivo](#obiettivo)
2. [Progettazione](#progettazione)
   1. [Architettura dei servizi](#architettura-dei-servizi)
   2. [Diagramma dei casi d'uso](#diagramma-dei-casi-duso)
   3. [Diagramma E-R](#diagramma-e-r)
3. [API](#api)
4. [Set-up](#set-up)
5. [Strumenti utilizzati](#strumenti-utilizzati)
6. [Autori](#autori)

## Obiettivo

## Progettazione

### Architettura dei servizi

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

### Diagramma dei casi d'uso

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

### Diagramma E-R

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
        int importo_token
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
        datetime orario_inizio_L
        datetime orario_fine_L
        datetime orario_inizio_F
        datetime orario_fine_F
        float tariffa_F
        float tariffa_L
    }

    UTENTE ||--o{ VEICOLO : "owns"
    TIPO_VEICOLO ||--o{ VEICOLO : "is"
    VEICOLO ||--o{ TRANSITO : "executes"
    TRANSITO |o--o| MULTA : "creates"
    ZONA_ZTL ||--o{ VARCO_ZTL : "include"
    ORARIO_CHIUSURA ||--o{ VARCO_ZTL : "has"
    VARCO_ZTL ||--o{ TRANSITO : "crosses"
```

## API

## Set-up

## Strumenti utilizzati

[![](https://skillicons.dev/icons?i=ts,express,nodejs,sequelize,docker,postgres,postman,github,vscode)](https://skillicons.dev)

## Autori 

|Nome | GitHub |
|-----------|--------|
| 👩 **Agresta Arianna** | [Click here](https://github.com/Arianna6400) |
| 👨 **Iasenzaniro Andrea** | [Click here](https://github.com/AndreaIasenzaniro) |
