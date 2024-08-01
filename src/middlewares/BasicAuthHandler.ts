import basicAuth from 'basic-auth'
import { NextFunction, Request, Response } from 'express';

const USERNAME_ = process.env.USERNAME_METRICS;
const PASSWORD_ = process.env.PASSWORD_METRICS;

function BasicAuthHandler(req: Request, res: Response, next: NextFunction) {
  const credentials = basicAuth(req);
  
  if (!credentials || credentials.name !== USERNAME_ || credentials.pass !== PASSWORD_) {
    res.set('WWW-Authenticate', 'Basic realm="Prometheus Metrics"');
    return res.status(401).send('Authentication required.');
  }
  
  // If authentication is successful, proceed to the next middleware
  next();
}

export default BasicAuthHandler;