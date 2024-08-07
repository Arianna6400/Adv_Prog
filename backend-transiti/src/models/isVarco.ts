import { DataTypes, Model, Optional } from 'sequelize';
import Database from "../utils/database";

const sequelize = Database.getInstance();

export interface IsVarcoAttributes {
    id_utente: number;
    id_varco: number;
}

class IsVarco extends Model<IsVarcoAttributes> implements IsVarcoAttributes {
    public id_utente!: number;
    public id_varco!: number;
}

IsVarco.init(
    {
        id_utente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        id_varco: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
    },
    {
        sequelize,
        tableName: 'is_varco',
        timestamps: false,
    }
);

export default IsVarco;