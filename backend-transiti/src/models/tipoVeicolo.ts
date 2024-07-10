import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface TipoVeicoloAttributes {
  id_tipo_veicolo: number;
  descrizione: string;
  tariffa_base: number;
}

// Interfaccia per la creazione del modello, rende 'id_tipo_veicolo' opzionale
export interface TipoVeicoloCreationAttributes extends Optional<TipoVeicoloAttributes, 'id_tipo_veicolo'> {}

// Implementazione del modello
class TipoVeicolo extends Model<TipoVeicoloAttributes, TipoVeicoloCreationAttributes> implements TipoVeicoloAttributes {
  private _id_tipo_veicolo!: number;
  private _descrizione!: string;
  private _tariffa_base!: number;

  // Getter e setter per id_tipo_veicolo
  public get id_tipo_veicolo(): number {
    return this._id_tipo_veicolo;
  }

  public set id_tipo_veicolo(value: number) {
    this._id_tipo_veicolo = value;
  }

  // Getter e setter per descrizione
  public get descrizione(): string {
    return this._descrizione;
  }

  public set descrizione(value: string) {
    this._descrizione = value;
  }

  // Getter e setter per tariffa_base
  public get tariffa_base(): number {
    return this._tariffa_base;
  }

  public set tariffa_base(value: number) {
    this._tariffa_base = value;
  }
}

// Inizializzazione del modello
TipoVeicolo.init(
  {
    id_tipo_veicolo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      get() {
        return this.getDataValue('id_tipo_veicolo');
      },
      set(value: number) {
        this.setDataValue('id_tipo_veicolo', value);
      }
    },
    descrizione: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('descrizione');
      },
      set(value: string) {
        this.setDataValue('descrizione', value);
      }
    },
    tariffa_base: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        return this.getDataValue('tariffa_base');
      },
      set(value: number) {
        this.setDataValue('tariffa_base', value);
      }
    },
  },
  {
    sequelize,
    tableName: 'tipo_veicolo',
    timestamps: false, // Disabilita i timestamp
  }
);

export default TipoVeicolo;