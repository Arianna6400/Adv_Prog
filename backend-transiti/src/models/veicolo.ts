import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import TipoVeicolo from './tipoVeicolo';
import User from './user';

interface VeicoloAttributes {
  targa: string;
  esente: boolean;
  tipo_veicolo_FK: number;
  utente_FK: number;
}

interface VeicoloCreationAttributes extends Optional<VeicoloAttributes, 'esente'> {}

class Veicolo extends Model<VeicoloAttributes, VeicoloCreationAttributes> implements VeicoloAttributes {
  public targa!: string;
  public esente!: boolean;
  public tipo_veicolo_FK!: number;
  public utente_FK!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Veicolo.init(
  {
    targa: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    esente: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    tipo_veicolo_FK: {
      type: DataTypes.INTEGER,
      references: {
        model: TipoVeicolo,
        key: 'id',
      },
    },
    utente_FK: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id_utente',
      },
    },
  },
  {
    sequelize,
    tableName: 'VEICOLO',
  }
);

TipoVeicolo.hasMany(Veicolo, { foreignKey: 'tipo_veicolo_FK' });
User.hasMany(Veicolo, { foreignKey: 'utente_FK' });
Veicolo.belongsTo(TipoVeicolo, { foreignKey: 'tipo_veicolo_FK' });
Veicolo.belongsTo(User, { foreignKey: 'utente_FK' });

export default Veicolo;
