import Database from '../utils/database';
import Utente from './utente';
import TipoVeicolo from './tipoVeicolo';
import Veicolo from './veicolo';
import ZonaZtl from './zonaZtl';
import OrarioChiusura from './orarioChiusura';
import VarcoZtl from './varcoZtl';
import Transito from './transito';
import Multa from './multa';
import IsVarco from './isVarco';

const sequelize = Database.getInstance();

/**
 * Inizializzare le relazioni
 */
// 
// Un Utente può avere molti Veicoli
Utente.hasMany(Veicolo, { foreignKey: 'utente' });
Veicolo.belongsTo(Utente, { foreignKey: 'utente' });

// Un TipoVeicolo può essere associato a molti Veicoli
TipoVeicolo.hasMany(Veicolo, { foreignKey: 'tipo_veicolo' });
Veicolo.belongsTo(TipoVeicolo, { foreignKey: 'tipo_veicolo' });

// Una ZonaZtl può avere molti VarcoZtl
ZonaZtl.hasMany(VarcoZtl, { foreignKey: 'zona_ztl' });
VarcoZtl.belongsTo(ZonaZtl, { foreignKey: 'zona_ztl' });

// Un OrarioChiusura può essere associato a molti VarcoZtl
OrarioChiusura.hasMany(VarcoZtl, { foreignKey: 'orario_chiusura' });
VarcoZtl.belongsTo(OrarioChiusura, { foreignKey: 'orario_chiusura' });

// Un Veicolo può avere molti Transiti
Veicolo.hasMany(Transito, { foreignKey: 'veicolo' });
Transito.belongsTo(Veicolo, { foreignKey: 'veicolo' });

// Un VarcoZtl può avere molti Transiti
VarcoZtl.hasMany(Transito, { foreignKey: 'varco' });
Transito.belongsTo(VarcoZtl, { foreignKey: 'varco' });

// Un Transito può avere molte Multe
Transito.hasMany(Multa, { foreignKey: 'transito' });
Multa.belongsTo(Transito, { foreignKey: 'transito' });

// Un Utente può avere un solo VarcoZtl tramite IsVarco
Utente.hasOne(IsVarco, { foreignKey: 'id_utente' });
IsVarco.belongsTo(Utente, { foreignKey: 'id_utente' });

VarcoZtl.hasOne(IsVarco, { foreignKey: 'id_varco' });
IsVarco.belongsTo(VarcoZtl, { foreignKey: 'id_varco' });

// Crea un oggetto che contiene le istanze del database e dei modelli
const db = {
  sequelize,
  Utente,
  TipoVeicolo,
  Veicolo,
  ZonaZtl,
  OrarioChiusura,
  VarcoZtl,
  Transito,
  Multa,
  IsVarco,
};

// Funzione per sincronizzare i modelli con il database
export const initModels = async () => {
  await sequelize.sync({ alter: true }); // Usa { alter: true } per aggiornare le tabelle esistenti
};

export default db;