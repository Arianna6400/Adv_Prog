import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface ZonaZtlAttributes {
  id_zona: number;
  nome: string;
}

// Interfaccia per la creazione del modello, rende 'id_zona' opzionale
export interface ZonaZtlCreationAttributes extends Optional<ZonaZtlAttributes, 'id_zona'> {}

// Implementazione del modello
class ZonaZtl extends Model<ZonaZtlAttributes, ZonaZtlCreationAttributes> implements ZonaZtlAttributes {
  public id_zona!: number;
  private _nome!: string;

  // Getter per 'id_zona'
  public getIdZona(): number {
    return this.id_zona;
  }

  // Setter per 'id_zona'
  public setIdZona(value: number): void {
    this.id_zona = value;
  }

  // Getter per 'nome'
  public get nome(): string {
    return this._nome;
  }

  // Setter per 'nome'
  public set nome(value: string) {
    this._nome = value;
  }
}

// Inizializzazione del modello
ZonaZtl.init(
  {
    id_zona: {
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
  },
  {
    sequelize,
    tableName: 'zona_ztl',
    timestamps: false, // Disabilita i timestamp
  }
);

export default ZonaZtl;