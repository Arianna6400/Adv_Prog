import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../utils/database';
import Veicolo from './veicolo';
import VarcoZtl from './varcoZtl';

interface TransitoAttributes {
  id_transito: number;
  veicolo_FK: string;
  varco: number;
  dataOra: Date;
}

interface TransitoCreationAttributes extends Optional<TransitoAttributes, 'id_transito'> {}

class Transito extends Model<TransitoAttributes, TransitoCreationAttributes> implements TransitoAttributes {
  public id_transito!: number;
  public veicolo_FK!: string;
  public varco!: number;
  public dataOra!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transito.init(
  {
    id_transito: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    veicolo_FK: {
      type: DataTypes.STRING,
      references: {
        model: Veicolo,
        key: 'targa',
      },
    },
    varco: {
      type: DataTypes.INTEGER,
      references: {
        model: VarcoZtl,
        key: 'id_varco',
      },
    },
    dataOra: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'TRANSITO',
  }
);

Veicolo.hasMany(Transito, { foreignKey: 'veicolo_FK' });
VarcoZtl.hasMany(Transito, { foreignKey: 'varco' });
Transito.belongsTo(Veicolo, { foreignKey: 'veicolo_FK' });
Transito.belongsTo(VarcoZtl, { foreignKey: 'varco' });

export default Transito;