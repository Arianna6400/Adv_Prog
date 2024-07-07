import Database from '../utils/database';
import Utente from './utente';
import TipoVeicolo from './tipoVeicolo';
import Veicolo from './veicolo';
import ZonaZtl from './zonaZtl';
import OrarioChiusura from './orarioChiusura';
import VarcoZtl from './varcoZtl';
import Transito from './transito';
import Multa from './multa';

const sequelize = Database.getInstance();

// Inizializzare le relazioni
Utente.hasMany(Veicolo, { foreignKey: 'utente' });
Veicolo.belongsTo(Utente, { foreignKey: 'utente' });

TipoVeicolo.hasMany(Veicolo, { foreignKey: 'tipo_veicolo' });
Veicolo.belongsTo(TipoVeicolo, { foreignKey: 'tipo_veicolo' });

ZonaZtl.hasMany(VarcoZtl, { foreignKey: 'zona_ztl' });
VarcoZtl.belongsTo(ZonaZtl, { foreignKey: 'zona_ztl' });

OrarioChiusura.hasMany(VarcoZtl, { foreignKey: 'orario_chiusura' });
VarcoZtl.belongsTo(OrarioChiusura, { foreignKey: 'orario_chiusura' });

Veicolo.hasMany(Transito, { foreignKey: 'veicolo' });
Transito.belongsTo(Veicolo, { foreignKey: 'veicolo' });

VarcoZtl.hasMany(Transito, { foreignKey: 'varco' });
Transito.belongsTo(VarcoZtl, { foreignKey: 'varco' });

Transito.hasMany(Multa, { foreignKey: 'transito' });
Multa.belongsTo(Transito, { foreignKey: 'transito' });

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
};

// Funzione per sincronizzare i modelli con il database
export const initModels = async () => {
  await sequelize.sync({ alter: true }); // Usa { alter: true } per aggiornare le tabelle esistenti
};

export default db;