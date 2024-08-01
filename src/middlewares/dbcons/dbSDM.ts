import { Sequelize } from "sequelize-typescript";

import config from "../../config";

const dbSDM = new Sequelize(config.database.sdm);

export default dbSDM;
