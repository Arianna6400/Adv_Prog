# Progetto Programmazione Avanzata A.A. 23/24

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

## API

## Set-up

## Strumenti utilizzati

[![](https://skillicons.dev/icons?i=ts,express,nodejs,sequelize,docker,postgres,postman,github,vscode)](https://skillicons.dev)

## Autori 

|Nome | GitHub |
|-----------|--------|
| 👩 **Agresta Arianna** | [Click here](https://github.com/Arianna6400) |
| 👨 **Iasenzaniro Andrea** | [Click here](https://github.com/AndreaIasenzaniro) |
