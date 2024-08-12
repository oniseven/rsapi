import { Op } from "sequelize";
import PatientService from "../PatientService";
import { Unit } from "../../models/billing/master/Unit";
import { Kunjungan } from "../../models/billing/Kunjungan";
import { Pelayanan } from "../../models/billing/Pelayanan";
import { Pasien } from "../../models/billing/master/Pasien";
import { ReservasiOnline } from "../../models/billing/ReservasiOnline";

// Mock all the model
jest.mock("../../models/billing/Kunjungan");
jest.mock("../../models/billing/Pelayanan");
jest.mock("../../models/billing/master/Unit");
jest.mock("../../models/billing/master/Pasien");
jest.mock("../../models/billing/ReservasiOnline");

describe("PatientService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getData", () => {
    it("should return patient data for valid norm and birthdate", async () => {
      const mockPatient = { id: "1", nama: "John Doe" };
      (Pasien.findOne as jest.Mock).mockResolvedValue(mockPatient);

      const result = await PatientService.getData(
        "123",
        new Date("1990-08-01")
      );
      expect(result).toEqual(mockPatient);
      expect(Pasien.findOne).toHaveBeenCalledWith({
        attributes: ["id", "no_rm", "nama"],
        logging: false,
        where: { no_rm: "123", tgl_lahir: new Date("1990-08-01") },
      });
    });

    it("should return null if no patient found", async () => {
      (Pasien.findOne as jest.Mock).mockResolvedValue(null);

      const result = await PatientService.getData(
        "123",
        new Date("1990-08-01")
      );
      expect(result).toBeNull();
    });
  });

  describe("hasRegisteredOnline", () => {
    it("should return true if patient is already registered online", async () => {
      const mockPatient = { no_rm: "123456", nama: "John Doe" } as Pasien;
      (ReservasiOnline.count as jest.Mock).mockResolvedValue(1);

      const result = await PatientService.hasRegisteredOnline(mockPatient);
      expect(result).toBe(true);
      expect(ReservasiOnline.count).toHaveBeenCalledWith({
        include: [
          {
            model: Pasien,
            attributes: [],
            required: true,
            where: {
              no_rm: mockPatient.no_rm,
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
    });

    it("should return false if the patient has not registered online", async () => {
      const mockPatient = { no_rm: "123456", nama: "John Doe" } as Pasien;
      (ReservasiOnline.count as jest.Mock).mockResolvedValue(0);

      const result = await PatientService.hasRegisteredOnline(mockPatient);
      expect(result).toBe(false);
    });
  });

  describe("stillInWard", () => {
    it("should return true if the patient still in inward", async () => {
      const mockPatient = { no_rm: '123456', nama: 'John Doe' } as Pasien;
      (Kunjungan.count as jest.Mock).mockResolvedValue(1);

      const result = await PatientService.stillInWard(mockPatient);
      expect(result).toBe(true);
      expect(Kunjungan.count).toHaveBeenCalledWith({
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
              no_rm: mockPatient.no_rm,
            },
          },
        ],
        where: {
          pulang: 0,
        },
      })
    });

    it("should return false if the patient not in inward", async () => {
      const mockPatient = { no_rm: '123456', nama: 'John Doe' } as Pasien;
      (Kunjungan.count as jest.Mock).mockResolvedValue(0);

      const result = await PatientService.stillInWard(mockPatient);
      expect(result).toBe(false);
    })
  })

  describe("hasRegisteredOffline", () => {
    it("should return true if patient has registered offline on the visit date", async () => {
      const mockPatient = { no_rm: "123456", nama: "John Doe" } as Pasien;
      const visitDate = "2024-08-08";
      (Pelayanan.count as jest.Mock).mockResolvedValue(1);

      const result = await PatientService.hasRegisteredOffline(
        mockPatient,
        visitDate
      );
      expect(result).toBe(true);
      expect(Pelayanan.count).toHaveBeenCalledWith({
        include: [
          {
            model: Pasien,
            attributes: [],
            required: true,
            where: {
              no_rm: mockPatient.no_rm,
            },
          },
        ],
        where: {
          tgl: visitDate,
        },
      });
    });

    it("should return false if patient has not registered offline on the visit date", async () => {
      const mockPatient = { no_rm: '123456', 'nama': 'John Doe' } as Pasien;
      const visitDate = '2024-08-08';
      (Pelayanan.count as jest.Mock).mockResolvedValue(0);

      const result = await PatientService.hasRegisteredOffline(mockPatient, visitDate);
      expect(result).toBe(false);
    })
  });
});
