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
  public nome!: string;
  public via!: string;
  public zona_ztl!: number;
  public orario_chiusura!: number;
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
    },
    via: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zona_ztl: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ZonaZtl,
        key: 'id_zona',
      },
    },
    orario_chiusura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: OrarioChiusura,
        key: 'id_orario',
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