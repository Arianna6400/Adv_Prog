import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';
import ZonaZtl from './zonaZtl';
import OrarioChiusura from './orarioChiusura';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface VarcoZtlAttributes {
  id_varco: number;
  nome: string;
  via: string;
  zona_ztl: number;
  orario_chiusura: number;
}

// Interfaccia per la creazione del modello, rende 'id_varco' opzionale
export interface VarcoZtlCreationAttributes extends Optional<VarcoZtlAttributes, 'id_varco'> {}

// Implementazione del modello
class VarcoZtl extends Model<VarcoZtlAttributes, VarcoZtlCreationAttributes> implements VarcoZtlAttributes {
  public id_varco!: number;
  private _nome!: string;
  private _via!: string;
  private _zona_ztl!: number;
  private _orario_chiusura!: number;

  // Getter e setter per 'nome'
  public get nome(): string {
    return this._nome;
  }

  public set nome(value: string) {
    this._nome = value;
  }

  // Getter e setter per 'via'
  public get via(): string {
    return this._via;
  }

  public set via(value: string) {
    this._via = value;
  }

  // Getter e setter per 'zona_ztl'
  public get zona_ztl(): number {
    return this._zona_ztl;
  }

  public set zona_ztl(value: number) {
    this._zona_ztl = value;
  }

  // Getter e setter per 'orario_chiusura'
  public get orario_chiusura(): number {
    return this._orario_chiusura;
  }

  public set orario_chiusura(value: number) {
    this._orario_chiusura = value;
  }
}

// Inizializzazione del modello
VarcoZtl.init(
  {
    id_varco: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('nome');
      },
      set(value: string) {
        this.setDataValue('nome', value);
      },
    },
    via: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('via');
      },
      set(value: string) {
        this.setDataValue('via', value);
      },
    },
    zona_ztl: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ZonaZtl,
        key: 'id_zona',
      },
      get() {
        return this.getDataValue('zona_ztl');
      },
      set(value: number) {
        this.setDataValue('zona_ztl', value);
      },
    },
    orario_chiusura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: OrarioChiusura,
        key: 'id_orario',
      },
      get() {
        return this.getDataValue('orario_chiusura');
      },
      set(value: number) {
        this.setDataValue('orario_chiusura', value);
      },
    },
  },
  {
    sequelize,
    tableName: 'varco_ztl',
    timestamps: false, // Disabilita i timestamp
  }
);

export default VarcoZtl;