import { Sequelize } from "sequelize-typescript";

import config from "../../config";

const dbAntrean = new Sequelize(config.database.antrean);

export default dbAntrean;
