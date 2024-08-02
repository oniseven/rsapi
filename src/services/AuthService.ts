import * as jwt from 'jsonwebtoken';

import { encrypt } from "../utils/EncryptionUtils";
import { Pasien } from "../models/billing/master/Pasien";
import { JwtPayload } from "../types/types";
import PatientService from "./PatientService";
import RegistrationService from "./RegistrationService";
import config from '../config';

const getPatientData = async(norm: string, birthdate: string) => {
  return await PatientService.getData(norm, new Date(birthdate));
}

const isRegisteredWithinTimeFrame = async () => {
  return await RegistrationService.isRegisteredWithinTimeFrame();
}

const hasRegistered = async (pasien: Pasien) => {
  return await RegistrationService.hasRegistered(pasien);
}

const createToken = async (pasien: Pasien): Promise<string> => {
  const payload: JwtPayload = {
    id: encrypt(String(pasien.id)),
    name: pasien.nama,
    norm: pasien.no_rm
  };

  const token = jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRED
  })

  return token;
}

export default {
  createToken,
  hasRegistered,
  getPatientData,
  isRegisteredWithinTimeFrame
}