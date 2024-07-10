import { DataTypes, Model, Optional } from 'sequelize';
import Database from "../utils/database";

const sequelize = Database.getInstance();

export interface IsVarcoAttributes {
    id_utente: number;
    id_varco: number;
}

class IsVarco extends Model<IsVarcoAttributes> implements IsVarcoAttributes {
    private _id_utente!: number;
    private _id_varco!: number;

    get id_utente(): number {
        return this._id_utente;
    }

    set id_utente(value: number) {
        this._id_utente = value;
    }

    get id_varco(): number {
        return this._id_varco;
    }

    set id_varco(value: number) {
        this._id_varco = value;
    }
}

IsVarco.init(
    {
        id_utente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, //  chiave primaria
            get(this: IsVarco): number {
                return this.id_utente;
            },
            set(this: IsVarco, value: number) {
                this.id_utente = value;
            }
        },
        id_varco: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, // chiave primaria
            get(this: IsVarco): number {
                return this.id_varco;
            },
            set(this: IsVarco, value: number) {
                this.id_varco = value;
            }
        },
    },
    {
        sequelize,
        tableName: 'is_varco',
        timestamps: false,
    }
);

export default IsVarco;