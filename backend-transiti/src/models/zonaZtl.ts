import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ZonaZtlAttributes {
  id_zona: number;
  nome: string;
}

interface ZonaZtlCreationAttributes extends Optional<ZonaZtlAttributes, 'id_zona'> {}

class ZonaZtl extends Model<ZonaZtlAttributes, ZonaZtlCreationAttributes> implements ZonaZtlAttributes {
  public id_zona!: number;
  public nome!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
