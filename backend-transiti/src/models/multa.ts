import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../config/database';
import Transito from './transito';

const sequelize = Database.getInstance();

interface MultaAttributes {
  id_multa: number;
  transito_FK: number;
  data_multa: Date;
  pagata: boolean;
  importo_token: number;
  uuid_pagamento: string;
}

interface MultaCreationAttributes extends Optional<MultaAttributes, 'id_multa' | 'pagata' | 'importo_token' | 'uuid_pagamento'> {}

class Multa extends Model<MultaAttributes, MultaCreationAttributes> implements MultaAttributes {
  public id_multa!: number;
  public transito_FK!: number;
  public data_multa!: Date;
  public pagata!: boolean;
  public importo_token!: number;
  public uuid_pagamento!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Multa.init(
  {
    id_multa: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    transito_FK: {
      type: DataTypes.INTEGER,
      references: {
        model: Transito,
        key: 'id_transito',
      },
    },
    data_multa: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    pagata: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    importo_token: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    uuid_pagamento: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'MULTA',
  }
);

Transito.hasMany(Multa, { foreignKey: 'transito_FK' });
Multa.belongsTo(Transito, { foreignKey: 'transito_FK' });

export default Multa;