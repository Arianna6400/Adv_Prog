
// Inizializza i modelli di Sequelize e definisce le relazioni tra i modelli

import sequelize from '../config/database';
import Payment from './payment';

const models = {
  Payment: Payment.initModel(sequelize),
};

Payment.associate(models);

export { sequelize };
export default models;
