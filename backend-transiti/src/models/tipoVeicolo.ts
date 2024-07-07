import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';

interface TipoVeicoloAttributes {
  id: number;
  descrizione: string;
  tariffa_base: number;
}

interface TipoVeicoloCreationAttributes extends Optional<TipoVeicoloAttributes, 'id'> {}

class TipoVeicolo extends Model<TipoVeicoloAttributes, TipoVeicoloCreationAttributes> implements TipoVeicoloAttributes {
  public id!: number;
  public descrizione!: string;
  public tariffa_base!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TipoVeicolo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descrizione: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tariffa_base: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'TIPO_VEICOLO',
  }
);

export default TipoVeicolo;
