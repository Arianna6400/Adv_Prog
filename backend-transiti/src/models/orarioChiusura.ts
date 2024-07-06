import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../config/database';

const sequelize = Database.getInstance();

interface OrarioChiusuraAttributes {
  id: number;
  giorni_settimana_festivi: string;
  fascia_oraria_F: string;
  fascia_oraria_L: string;
  tariffa_F: number;
  tariffa_L: number;
}

interface OrarioChiusuraCreationAttributes extends Optional<OrarioChiusuraAttributes, 'id'> {}

class OrarioChiusura extends Model<OrarioChiusuraAttributes, OrarioChiusuraCreationAttributes> implements OrarioChiusuraAttributes {
  public id!: number;
  public giorni_settimana_festivi!: string;
  public fascia_oraria_F!: string;
  public fascia_oraria_L!: string;
  public tariffa_F!: number;
  public tariffa_L!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

OrarioChiusura.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    giorni_settimana_festivi: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fascia_oraria_F: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fascia_oraria_L: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tariffa_F: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    tariffa_L: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'ORARIO_CHIUSURA',
  }
);

export default OrarioChiusura;
