import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UserAttributes {
  id_utente: number;
  nome: string;
  cognome: string;
  email: string;
  ruolo: string;
  token_rimanenti: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id_utente'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id_utente!: number;
  public nome!: string;
  public cognome!: string;
  public email!: string;
  public ruolo!: string;
  public token_rimanenti!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id_utente: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cognome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    ruolo: {
      type: DataTypes.ENUM('operatore', 'varco', 'automobilista', 'admin'),
      allowNull: false,
    },
    token_rimanenti: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'UTENTE',
  }
);

export default User;
