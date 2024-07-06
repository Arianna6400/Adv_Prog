
// Inizializza i modelli di Sequelize e definisce le relazioni tra i modelli

import sequelize from '../config/database';
import User from './user';
import Vehicle from './vehicle';
import Transit from './transit';
import Multa from './multa';

const models = {
  User: User.initModel(sequelize),
  Vehicle: Vehicle.initModel(sequelize),
  Transit: Transit.initModel(sequelize),
  Multa: Multa.initModel(sequelize),
};

User.associate(models);
Vehicle.associate(models);
Transit.associate(models);
Multa.associate(models);

export { sequelize };
export default models;
