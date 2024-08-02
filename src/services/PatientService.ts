import { Op } from "sequelize";
import { Pasien } from "../models/billing/master/Pasien";
import { ReservasiOnline } from "../models/billing/ReservasiOnline";
import { SequelizeLogging } from "../types";
import { Pelayanan } from "../models/billing/Pelayanan";
import { Kunjungan } from "../models/billing/Kunjungan";
import { ViewKunjunganInap } from "../models/billing/view/ViewKunjunganInap";
import { Unit } from "../models/billing/master/Unit";

const getData = async (
  norm: string,
  birthdate: Date,
  logging: SequelizeLogging = false
): Promise<Pasien | null> => {
  return Pasien.findOne({
    attributes: ["id", "no_rm", "nama"],
    where: {
      no_rm: norm,
      tgl_lahir: birthdate,
    },
    logging,
  });
};

const hasRegisteredOnline = async (pasien: Pasien): Promise<boolean> => {
  const hasRegistered = await ReservasiOnline.count({
    include: [
      {
        model: Pasien,
        attributes: [],
        required: true,
        where: {
          no_rm: pasien.no_rm,
        },
      },
    ],
    where: {
      tgl: {
        [Op.eq]: ReservasiOnline.sequelize?.literal("CURDATE()"),
      },
      status: {
        [Op.in]: [0, 1],
      },
    },
  });

  return !!hasRegistered;
};

const stillInWard = async (pasien: Pasien) => {
  const hasRegistered = await Kunjungan.count({
    include: [
      {
        model: Pelayanan,
        required: true,
        include: [{
          model: Unit,
          required: true,
          where: {
            inap: 1
          }
        }]
      },
      {
        model: Pasien,
        required: true,
        where: {
          no_rm: pasien.no_rm,
        },
      },
    ],
    where: {
      pulang: 0,
    },
  });

  return !!hasRegistered;
};

const hasRegisteredOffline = async (pasien: Pasien, visitDate: string) => {
  const hasRegistered = await Pelayanan.count({
    include: [
      {
        model: Pasien,
        attributes: [],
        required: true,
        where: {
          no_rm: pasien.no_rm,
        },
      },
    ],
    where: {
      tgl: visitDate,
    },
  });

  return !!hasRegistered;
};

export default {
  getData,
  stillInWard,
  hasRegisteredOnline,
  hasRegisteredOffline,
};
