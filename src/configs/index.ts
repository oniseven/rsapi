import path from "path";
import { SequelizeOptions } from "sequelize-typescript";

interface DatabaseConfig {
  billing: SequelizeOptions;
  antrean: SequelizeOptions;
  sdm: SequelizeOptions;
}

const config: {
  database: DatabaseConfig;
  JWT_SECRET: string;
  JWT_EXPIRED: string;
  [key: string]: any;
} = {
  database: {
    billing: {
      database: process.env.DB_NAME_BILLING || "default_billing_db",
      dialect: "mysql",
      username: process.env.DB_USERNAME_BILLING || "default_billing_user",
      password: process.env.DB_PASSWORD_BILLING || "default_billing_password",
      host: process.env.DB_HOST_BILLING || "localhost",
      port: +(process.env.DB_PORT_BILLING || 3306),
      models: [path.join(__dirname, "/../models/billing/**/*.js")],
      define: {
        timestamps: false,
      },
      logging: false,
    },
    antrean: {
      database: process.env.DB_NAME_ANTRE || "default_antrean_db",
      dialect: "mysql",
      username: process.env.DB_USERNAME_ANTRE || "default_antrean_user",
      password: process.env.DB_PASSWORD_ANTRE || "default_antrean_password",
      host: process.env.DB_HOST_ANTRE || "localhost",
      port: +(process.env.DB_PORT_ANTRE || 3306),
      models: [path.join(__dirname, "/../models/antrean/**/*.js")],
      define: {
        timestamps: false,
      },
      logging: false,
    },
    sdm: {
      database: process.env.DB_NAME_SDM || "default_sdm_db",
      dialect: "mysql",
      username: process.env.DB_USERNAME_SDM || "default_sdm_user",
      password: process.env.DB_PASSWORD_SDM || "default_sdm_password",
      host: process.env.DB_HOST_SDM || "localhost",
      port: +(process.env.DB_PORT_SDM || 3306),
      models: [path.join(__dirname, "/../models/sdm/**/*.js")],
      define: {
        timestamps: false,
      },
      logging: false,
    },
  },
  JWT_SECRET: process.env.JWT_ENCRYPTION || "secret",
  JWT_EXPIRED: process.env.JWT_EXPIRATION || "1h",
};

export default config;
