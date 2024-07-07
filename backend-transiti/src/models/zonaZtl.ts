import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
interface ZonaZtlAttributes {
  id_zona: number;
  nome: string;
}

// Interfaccia per la creazione del modello, rende 'id_zona' opzionale
interface ZonaZtlCreationAttributes extends Optional<ZonaZtlAttributes, 'id_zona'> {}

// Implementazione del modello
class ZonaZtl extends Model<ZonaZtlAttributes, ZonaZtlCreationAttributes> implements ZonaZtlAttributes {
  public id_zona!: number;
  public nome!: string;
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
    },
  },
  {
    sequelize,
    tableName: 'ZONA_ZTL',
  }
);

export default ZonaZtl;