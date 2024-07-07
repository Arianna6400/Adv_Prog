import { DataTypes, Model, Optional } from 'sequelize';
import Database from '../utils/database';
import TipoVeicolo from './tipoVeicolo';
import Utente from './utente';

const sequelize = Database.getInstance();

// Interfaccia che definisce tutte le proprietà del modello
export interface VeicoloAttributes {
  targa: string;
  esente: boolean;
  tipo_veicolo: number;
  utente: number;
}

// Interfaccia per la creazione del modello, 'targa' non è opzionale perché è la chiave primaria
export interface VeicoloCreationAttributes extends Optional<VeicoloAttributes, 'esente'> {}

// Implementazione del modello
class Veicolo extends Model<VeicoloAttributes, VeicoloCreationAttributes> implements VeicoloAttributes {
  public targa!: string;
  public esente!: boolean;
  public tipo_veicolo!: number;
  public utente!: number;
}

// Inizializzazione del modello
Veicolo.init(
  {
    targa: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    esente: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    tipo_veicolo: {
      type: DataTypes.INTEGER,
      references: {
        model: TipoVeicolo,
        key: 'id_tipo_veicolo',
      },
    },
    utente: {
      type: DataTypes.INTEGER,
      references: {
        model: Utente,
        key: 'id_utente',
      },
    },
  },
  {
    sequelize,
    tableName: 'VEICOLO',
  }
);

export default Veicolo;