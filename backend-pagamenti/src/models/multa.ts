import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface MultaAttributes {
  id_multa: number;
  transito: number;
  data_multa: Date;
  pagata: boolean;
  importo_token: number;
  uuid_pagamento: string;
}

// Interfaccia per la creazione del modello, rende 'id_multa' opzionale
export interface MultaCreationAttributes extends Optional<MultaAttributes, 'id_multa'> {}

// Implementazione del modello
class Multa extends Model<MultaAttributes, MultaCreationAttributes> implements MultaAttributes {
  public id_multa!: number;
  private _transito!: number;
  private _data_multa!: Date;
  private _pagata!: boolean;
  private _importo_token!: number;
  private _uuid_pagamento!: string;

  // Getter e setter per 'transito'
  public get transito(): number {
    return this._transito;
  }

  public set transito(value: number) {
    this._transito = value;
  }

  // Getter e setter per 'data_multa'
  public get data_multa(): Date {
    return this._data_multa;
  }

  public set data_multa(value: Date) {
    this._data_multa = value;
  }

  // Getter e setter per 'pagata'
  public get pagata(): boolean {
    return this._pagata;
  }

  public set pagata(value: boolean) {
    this._pagata = value;
  }

  // Getter e setter per 'importo_token'
  public get importo_token(): number {
    return this._importo_token;
  }

  public set importo_token(value: number) {
    this._importo_token = value;
  }

  // Getter e setter per 'uuid_pagamento'
  public get uuid_pagamento(): string {
    return this._uuid_pagamento;
  }

  public set uuid_pagamento(value: string) {
    this._uuid_pagamento = value;
  }
}

// Inizializzazione del modello
Multa.init(
  {
    id_multa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      get() {
        return this.getDataValue('transito');
      },
      set(value: number) {
        this.setDataValue('transito', value);
      },
    },
    data_multa: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      get() {
        return this.getDataValue('data_multa');
      },
      set(value: Date) {
        this.setDataValue('data_multa', value);
      },
    },
    pagata: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      get() {
        return this.getDataValue('pagata');
      },
      set(value: boolean) {
        this.setDataValue('pagata', value);
      },
    },
    importo_token: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
      get() {
        return this.getDataValue('importo_token');
      },
      set(value: number) {
        this.setDataValue('importo_token', value);
      }
    },
    uuid_pagamento: {
      type: DataTypes.UUID,
      allowNull: false,
      get() {
        return this.getDataValue('uuid_pagamento');
      },
      set(value: string) {
        this.setDataValue('uuid_pagamento', value);
      },
    },
  },
  {
    sequelize,
    tableName: 'multa',
    timestamps: false, // Disabilita i timestamp
  }
);

export default Multa;