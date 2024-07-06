import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../config/database';
import ZonaZtl from './zonaZtl';
import OrarioChiusura from './orarioChiusura';

const sequelize = Database.getInstance();

interface VarcoZtlAttributes {
  id_varco: number;
  nome: string;
  via: string;
  zona_ztl_FK: number;
  orario_chiusura_FK: number;
}

interface VarcoZtlCreationAttributes extends Optional<VarcoZtlAttributes, 'id_varco'> {}

class VarcoZtl extends Model<VarcoZtlAttributes, VarcoZtlCreationAttributes> implements VarcoZtlAttributes {
  public id_varco!: number;
  public nome!: string;
  public via!: string;
  public zona_ztl_FK!: number;
  public orario_chiusura_FK!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

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
    zona_ztl_FK: {
      type: DataTypes.INTEGER,
      references: {
        model: ZonaZtl,
        key: 'id_zona',
      },
    },
    orario_chiusura_FK: {
      type: DataTypes.INTEGER,
      references: {
        model: OrarioChiusura,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'VARCO_ZTL',
  }
);

ZonaZtl.hasMany(VarcoZtl, { foreignKey: 'zona_ztl_FK' });
OrarioChiusura.hasMany(VarcoZtl, { foreignKey: 'orario_chiusura_FK' });
VarcoZtl.belongsTo(ZonaZtl, { foreignKey: 'zona_ztl_FK' });
VarcoZtl.belongsTo(OrarioChiusura, { foreignKey: 'orario_chiusura_FK' });

export default VarcoZtl;
