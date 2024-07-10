import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';
import Veicolo from './veicolo';
import VarcoZtl from './varcoZtl';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface TransitoAttributes {
  id_transito: number;
  veicolo: string;
  varco: number;
  data_ora: Date;
}

// Interfaccia per la creazione del modello, rende 'id_transito' opzionale
export interface TransitoCreationAttributes extends Optional<TransitoAttributes, 'id_transito'> {}

// Implementazione del modello
class Transito extends Model<TransitoAttributes, TransitoCreationAttributes> implements TransitoAttributes {
  public id_transito!: number;
  private _veicolo!: string;
  private _varco!: number;
  private _data_ora!: Date;

  // Getter e setter
  public get veicolo(): string {
    return this._veicolo;
  }

  public set veicolo(value: string) {
    this._veicolo = value;
  }

  public get varco(): number {
    return this._varco;
  }

  public set varco(value: number) {
    this._varco = value;
  }

  public get data_ora(): Date {
    return this._data_ora;
  }

  public set data_ora(value: Date) {
    this._data_ora = value;
  }
}

// Inizializzazione del modello
Transito.init(
  {
    id_transito: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    veicolo: {
      type: DataTypes.STRING,
      references: {
        model: Veicolo,
        key: 'targa',
      },
      get() {
        return this.getDataValue('veicolo');
      },
      set(value: string) {
        this.setDataValue('veicolo', value);
      }
    },
    varco: {
      type: DataTypes.INTEGER,
      references: {
        model: VarcoZtl,
        key: 'id_varco',
      },
      get() {
        return this.getDataValue('varco');
      },
      set(value: number) {
        this.setDataValue('varco', value);
      }
    },
    data_ora: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return this.getDataValue('data_ora');
      },
      set(value: Date) {
        this.setDataValue('data_ora', value);
      }
    },
  },
  {
    sequelize,
    tableName: 'transito',
    timestamps: false, // Disabilita i timestamp
  }
);

export default Transito;