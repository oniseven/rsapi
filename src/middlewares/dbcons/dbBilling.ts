import { Sequelize } from "sequelize-typescript";

import config from "../../configs";

const dbBilling = new Sequelize(config.database.billing);

export default dbBilling;
