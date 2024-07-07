import sequelize from '../utils/database';
import User from './user';
import TipoVeicolo from './tipoVeicolo';
import Veicolo from './veicolo';
import ZonaZtl from './zonaZtl';
import OrarioChiusura from './orarioChiusura';
import VarcoZtl from './varcoZtl';
import Transito from './transito';
import Multa from './multa';

// Inizializzare le relazioni
User.hasMany(Veicolo, { foreignKey: 'utente_FK' });
Veicolo.belongsTo(User, { foreignKey: 'utente_FK' });

TipoVeicolo.hasMany(Veicolo, { foreignKey: 'tipo_veicolo_FK' });
Veicolo.belongsTo(TipoVeicolo, { foreignKey: 'tipo_veicolo_FK' });

ZonaZtl.hasMany(VarcoZtl, { foreignKey: 'zona_ztl_FK' });
VarcoZtl.belongsTo(ZonaZtl, { foreignKey: 'zona_ztl_FK' });

OrarioChiusura.hasMany(VarcoZtl, { foreignKey: 'orario_chiusura_FK' });
VarcoZtl.belongsTo(OrarioChiusura, { foreignKey: 'orario_chiusura_FK' });

Veicolo.hasMany(Transito, { foreignKey: 'veicolo_FK' });
Transito.belongsTo(Veicolo, { foreignKey: 'veicolo_FK' });

VarcoZtl.hasMany(Transito, { foreignKey: 'varco' });
Transito.belongsTo(VarcoZtl, { foreignKey: 'varco' });

Transito.hasMany(Multa, { foreignKey: 'transito_FK' });
Multa.belongsTo(Transito, { foreignKey: 'transito_FK' });

const db = {
  sequelize,
  User,
  TipoVeicolo,
  Veicolo,
  ZonaZtl,
  OrarioChiusura,
  VarcoZtl,
  Transito,
  Multa,
};

export default db;