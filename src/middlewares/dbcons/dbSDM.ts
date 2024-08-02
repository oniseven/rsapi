import { Sequelize } from "sequelize-typescript";

import config from "../../configs";

const dbSDM = new Sequelize(config.database.sdm);

export default dbSDM;
