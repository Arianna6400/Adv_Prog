import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';
import TipoVeicolo from './tipoVeicolo';
import Utente from './utente';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface VeicoloAttributes {
  targa: string;
  esente: boolean;
  tipo_veicolo: number;
  utente: number;
}

// Interfaccia per la creazione del modello, 'targa' non è opzionale perché è la chiave primaria
export interface VeicoloCreationAttributes extends Optional<VeicoloAttributes, 'esente'> {}

// Implementazione del modello
class Veicolo extends Model<VeicoloAttributes, VeicoloCreationAttributes> implements VeicoloAttributes {
  public targa!: string;
  private _esente!: boolean;
  private _tipo_veicolo!: number;
  private _utente!: number;

  // Getter e setter per 'esente'
  public get esente(): boolean {
    return this._esente;
  }

  public set esente(value: boolean) {
    this._esente = value;
  }

  // Getter e setter per 'tipo_veicolo'
  public get tipo_veicolo(): number {
    return this._tipo_veicolo;
  }

  public set tipo_veicolo(value: number) {
    this._tipo_veicolo = value;
  }

  // Getter e setter per 'utente'
  public get utente(): number {
    return this._utente;
  }

  public set utente(value: number) {
    this._utente = value;
  }
}

// Inizializzazione del modello
Veicolo.init(
  {
    targa: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    esente: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      get() {
        return this.getDataValue('esente');
      },
      set(value: boolean) {
        this.setDataValue('esente', value);
      },
    },
    tipo_veicolo: {
      type: DataTypes.INTEGER,
      references: {
        model: TipoVeicolo,
        key: 'id_tipo_veicolo',
      },
      get() {
        return this.getDataValue('tipo_veicolo');
      },
      set(value: number) {
        this.setDataValue('tipo_veicolo', value);
      },
    },
    utente: {
      type: DataTypes.INTEGER,
      references: {
        model: Utente,
        key: 'id_utente',
      },
      get() {
        return this.getDataValue('utente');
      },
      set(value: number) {
        this.setDataValue('utente', value);
      },
    },
  },
  {
    sequelize,
    tableName: 'veicolo',
    timestamps: false, // Disabilita i timestamp
  }
);

export default Veicolo;