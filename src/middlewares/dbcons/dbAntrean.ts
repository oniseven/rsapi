import { Sequelize } from "sequelize-typescript";

import config from "../../configs";

const dbAntrean = new Sequelize(config.database.antrean);

export default dbAntrean;
