import moment from "moment-timezone";

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
      name: 'waktu_pmonline'
    }
  });
  if(!setting) throw new Error('Setting jam PM belum di set');

  const timeRange = JSON.parse(setting.data) as {
    open: string;
    close: string;
    buka: number;
    tutup: number;
  }

  // const current = moment.tz('Asia/Jakarta').startOf('day');
  // const openAt = current.clone().add(timeRange.buka, 'hours');
  // const closeAt = current.clone().add(timeRange.tutup, 'hours');
  // const isBetween = moment.tz().isBetween(openAt, closeAt);
  // console.log(openAt.toDate(), closeAt.toDate(), isBetween);

  const current = moment.tz('Asia/Jakarta');
  const openAt = current.clone().set({hour: timeRange.buka});
  const closeAt = current.clone().set({hour: timeRange.tutup});
  const now = moment.tz('Asia/Jakarta');
  const isBetween = now.isBetween(openAt, closeAt, null, '[)');
  console.log(openAt.toDate(), closeAt.toDate(), now.toDate(), isBetween);

  return {
    status: isBetween ? true : false,
    openAt: openAt.format('HH:mm'),
    closeAt: closeAt.format('HH:mm'),
  }
}

const hasRegistered = async (pasien: Pasien, visitDate?: string): Promise<[boolean, string|null]> => {
  const [online, inward] = await Promise.all([
    PatientService.hasRegisteredOnline(pasien),
    PatientService.stillInWard(pasien)
  ]);

  if(online) return [true, ERROR_MESSAGE.REGISTRATION.ALREADY_REGISTERED_ONLINE];
  if(inward) return [true, ERROR_MESSAGE.REGISTRATION.STILL_IN_WARD];

  if(visitDate && (await PatientService.hasRegisteredOffline(pasien, visitDate)))
    return [true, ERROR_MESSAGE.REGISTRATION.ALREADY_REGISTERED];

  return [false, null];
}

export default {
  hasRegistered,
  isRegisteredWithinTimeFrame
}