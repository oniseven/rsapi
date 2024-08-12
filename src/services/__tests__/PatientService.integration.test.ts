import dotenv from "dotenv";
const ENV_FILE = ".env.development";
dotenv.config({
  path: ENV_FILE,
});
import config from "../../configs";
import PatientService from "../PatientService";
import { Sequelize } from "sequelize-typescript";
import { Pelayanan } from "../../models/billing/Pelayanan";
import { Kunjungan } from "../../models/billing/Kunjungan";
import { Pasien } from "../../models/billing/master/Pasien";
import { ReservasiOnline } from "../../models/billing/ReservasiOnline";
import moment from "moment";

const sequelize = new Sequelize(config.database.billing);

describe("PatientService Integration", () => {
  let pasien: Pasien;
  let visitDate: string = moment().format('YYYY-MM-DD');

  beforeAll(async () => {
    // synchronize all model with database
    await sequelize.sync();

    // create pasien test data
    pasien = await Pasien.create({
      no_rm: "000001",
      nama: "John Doe",
      tgl_lahir: "1990-01-01",
      no_ktp: "ktp1234567890",
      sex: "l",
      alamat: "Surabaya, Indonesia",
    });
  });

  afterAll(async () => {
    await Pasien.destroy({ where: { id: pasien.id } });
    await sequelize.close();
  });

  describe("hasRegisteredOnline", () => {
    beforeAll(async () => {
      // create online resevation test data
      await ReservasiOnline.create({
        pasien_id: pasien.id,
        unit_id: 10,
        kelas_id: 1,
        kso_kelas_id: 28,
        kso_id: 338,
        tgl_reservasi: visitDate,
        dokter_id: 1134,
        no_iterasi: 1,
        no_reservasi: 1,
        tgl: visitDate,
        jenis_app: 1,
      });
    });

    it("should return true if the patient has registered online", async () => {
      const mockPatient = await Pasien.findOne({
        where: { no_rm: "000001", tgl_lahir: "1990-01-01" },
      });
      const result = await PatientService.hasRegisteredOnline(mockPatient!);
      expect(result).toBe(true);
    });

    it("should return false if the patient has not registered online", async () => {
      const mockPatient = await Pasien.findOne({
        where: { no_rm: "000001", tgl_lahir: "1990-01-01" },
      });

      // remove the existing registration
      await ReservasiOnline.destroy({ where: { pasien_id: mockPatient!.id } });

      const result = await PatientService.hasRegisteredOnline(mockPatient!);
      expect(result).toBe(false);
    });
  });

  describe("hasRegisteredOffline", () => {
    let kunjungan: Kunjungan;

    beforeAll(async () => {
      kunjungan = await Kunjungan.create({
        no_billing: 1,
        pasien_id: pasien.id,
        jenis_layanan: 1,
        unit_id: 10,
        loket_id: 77,
        tgl: visitDate,
        kelas_id: 1,
        kso_id: 338,
        kso_kelas_id: 28,
        user_act: 2432,
      });

      await Pelayanan.create({
        kunjungan_id: kunjungan.id,
        pasien_id: pasien.id,
        no_antrian: 1,
        jenis_kunjungan: 1,
        jenis_layanan: 1,
        unit_id: 10,
        unit_id_asal: 77,
        kso_id: 338,
        kelas_id: 1,
        tgl: visitDate,
        dokter_id: 1134,
        dokter_tujuan_id: 1134,
        user_act: 2432,
      });
    });

    afterAll(async () => {});

    it("should return true if patient has registered offline", async () => {
      const mockPatient = await Pasien.findOne({
        where: { no_rm: "000001" },
      });

      const result = await PatientService.hasRegisteredOffline(
        mockPatient!,
        visitDate
      );
      expect(result).toBe(true);
    });

    it("should return false if patient has not registered offline", async () => {
      const mockPatient = await Pasien.findOne({
        where: { no_rm: "000001" },
      });
      const mockKunjungan = await Kunjungan.findOne({
        where: { pasien_id: pasien.id },
      });

      // remove existing visit
      await Pelayanan.destroy({ where: { kunjungan_id: mockKunjungan!.id } });
      await Kunjungan.destroy({ where: { id: mockKunjungan!.id } });

      const result = await PatientService.hasRegisteredOffline(
        mockPatient!,
        visitDate
      );

      expect(result).toBe(false);
    });
  });
});
