import moment from "moment";
import { Setting } from "../models/billing/master/Setting"
import { Pasien } from "../models/billing/master/Pasien";
import PatientService from "./PatientService";
import { ERROR_MESSAGE } from "../constants/messages";

const isRegisteredWithinTimeFrame = async (): Promise<{
  status: boolean;
  openAt: string;
  closeAt: string;
}> => {
  const setting = await Setting.findOne({
    where: {
      id: 9,
      aktif: 1
    }
  });
  if(!setting) throw new Error('Setting jam PM belum di set');

  const timeRange = JSON.parse(setting.data) as {
    open: string;
    close: string;
    buka: number;
    tutup: number;
  }

  const openAt = moment().startOf('day').add(timeRange.buka, 'hours');
  const closeAt = moment().startOf('day').add(timeRange.tutup, 'hours');
  const isBetween = moment().isBetween(openAt, closeAt);

  return {
    status: isBetween ? true : false,
    openAt: openAt.format('HH:mm'),
    closeAt: closeAt.format('HH:mm'),
  }
}

const hasRegistered = async (pasien: Pasien, visitDate?: string): Promise<[boolean, string]> => {
  const [online, inward] = await Promise.all([
    PatientService.hasRegisteredOnline(pasien),
    PatientService.stillInWard(pasien)
  ]);

  let status = online || inward ? true : false;
  let message = "passed";
  if(online) message = ERROR_MESSAGE.REGISTRATION.ALREADY_REGISTERED_ONLINE;
  if(inward) message = ERROR_MESSAGE.REGISTRATION.STILL_IN_WARD;

  if(visitDate && (await PatientService.hasRegisteredOffline(pasien, visitDate))){
    status = true;
    message = ERROR_MESSAGE.REGISTRATION.ALREADY_REGISTERED;
  }

  return [status, message];
}

export default {
  hasRegistered,
  isRegisteredWithinTimeFrame
}