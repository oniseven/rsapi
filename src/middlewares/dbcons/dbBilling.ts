import { Sequelize } from "sequelize-typescript";

import config from "../../config";

const dbBilling = new Sequelize(config.database.billing);

export default dbBilling;
