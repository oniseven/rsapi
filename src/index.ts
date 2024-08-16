import cors from "cors";
import https from "https";
import dotenv from "dotenv";
import express from "express";
import { readFileSync } from "fs";
import { json } from "body-parser";
import moment from "moment-timezone";

const NODE_ENV = process.env.NODE_ENV || "development";
const ENV_FILE = NODE_ENV !== "production" ? ".env.development" : ".env";
dotenv.config({
  path: ENV_FILE,
});

import routes from "./routes";
import ErrorHandler from "./middlewares/ErrorHandler";
import setupMetrics from "./middlewares/MetricsHandler";
import LimiterHandler from "./middlewares/LimiterHandler";
import ResponseHandler from "./middlewares/ResponseHandler";

import dbSDM from "./middlewares/dbcons/dbSDM";
import dbBilling from "./middlewares/dbcons/dbBilling";
import dbAntrean from "./middlewares/dbcons/dbAntrean";

const PORT = process.env.PORT || 8008;
moment.tz(process.env.MOMENT_TIMEZONE || "Asia/Jakarta");

export function createApp() {
  const app = express();

  // set up metric, for api monitoring using prometheus
  setupMetrics(app);
  // set up limiter for every user in 1 minutes
  app.use(LimiterHandler);
  // set up others middleware handle
  app.use(json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );
  // handling custom response
  app.use(ResponseHandler);
  // handling cors
  app.use(cors());
  // set up the route
  app.use(routes);
  // set up middleware error handler
  app.use(ErrorHandler);

  return app;
}

export async function connectDatabases() {
  await dbBilling.authenticate();
  console.log("-------- DB Billing connected --------");
  // Uncomment these when ready to use
  // await dbAntrean.authenticate();
  // console.log("-------- DB Antrean connected --------");
  // await dbSDM.authenticate();
  // console.log("-------- DB SDM connected     --------");
}

function startServer(app: express.Express): void {
  if (NODE_ENV !== "production") {
    app.listen(PORT, () => {
      console.info(`Server Http is running in ${NODE_ENV} on PORT ${PORT}`);
    });
  } else {
    const credential = {
      key: readFileSync("/etc/ssl/api/api_rsisjs_id.key"),
      cert: readFileSync("/etc/ssl/api/api_rsisjs_id.crt"),
      ca: readFileSync("/etc/ssl/api/api_rsisjs_id.ca-bundle.crt"),
    };
    const httpsServer = https.createServer(credential, app);
    httpsServer.listen(PORT, () => {
      console.log(`Server Https is running in ${NODE_ENV} on PORT ${PORT}`);
    });
  }
}

async function startApp() {
  console.log("🚀 ~ ENV:", NODE_ENV);
  console.log("🚀 ~ ENV_FILE:", ENV_FILE);
 
  try {
    console.log("#### connection to database");
    await connectDatabases();
    
    console.log("#### Starting up application");
    const app = createApp();
    startServer(app);
  } catch (error) {
    console.log("🚀 ~ startApp ~ error:", error);
  }
}

if (require.main === module) {
  startApp();
}

export { startApp };