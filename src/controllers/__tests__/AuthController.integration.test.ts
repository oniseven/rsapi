import MockDate from "mockdate";
import moment from "moment-timezone";
import { ERROR_MESSAGE } from "../../constants/messages";
import { Pasien } from "../../models/billing/master/Pasien";
import {
  closeTestDatabase,
  request,
  setupTestDatabase,
} from "../../testServer";
import { Setting } from "../../models/billing/master/Setting";

describe("AuthController Integration Test", () => {
  const endPoint: string = "/auth";
  let mockPatient: Pasien;
  let timeframeSetting: Setting;

  const dummyPatientData = {
    no_rm: "000001",
    nama: "John Doe",
    tgl_lahir: "1990-01-01",
    no_ktp: "ktp1234567890",
    sex: "l",
    alamat: "Surabaya, Indonesia",
  };

  beforeAll(async () => {
    await setupTestDatabase();
    mockPatient = await Pasien.create(dummyPatientData);
    timeframeSetting =
      (await Setting.findOne({ where: { name: "waktu_pmonline" } })) ||
      (await Setting.create({
        name: "waktu_pmonline",
        keterangan: "Jam buka tutup pm online",
        data: JSON.stringify({
          open: "07:00",
          close: "20:00",
          buka: 7,
          tutup: 20,
        }),
      }));
  });

  afterAll(async () => {
    await Pasien.destroy({
      where: { id: mockPatient.id },
    });
    await closeTestDatabase();
  });

  beforeEach(() => {
    moment.tz.setDefault("Asia/Jakarta");
  });

  afterEach(() => {
    moment.tz.setDefault();
    MockDate.reset();
  });

  const setMockTime = (time: string = "before") => {
    const timeframe = JSON.parse(timeframeSetting.data) as {
      close: string;
      open: string;
      buka: number;
      tutup: number;
    };
    const hours =
      time === "before"
        ? timeframe.buka - 1
        : time === "after"
        ? timeframe.tutup + 1
        : timeframe.buka + 3;

    MockDate.set(
      moment.tz("Asia/Jakarta").startOf("day").add(hours, "hours").toDate()
    );
  };

  it("should authenticate user and return a token", async () => {
    const response = await request.post(endPoint).send({
      norm: mockPatient.no_rm,
      birthdate: mockPatient.tgl_lahir,
    });

    // check status code
    expect(response.status).toBe(200);

    // check overall structure
    expect(response.body).toMatchObject({
      metadata: { status: true, message: "success" },
      response: { token: expect.any(String) },
    });

    // Check if token is a valid JWT
    expect(response.body.response.token).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
  });

  it("should allow registration within the timeframe", async () => {
    setMockTime("within");

    const response = await request.post(endPoint).send({
      norm: mockPatient.no_rm,
      birthdate: mockPatient.tgl_lahir,
      register: true,
    });

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      metadata: { status: true, message: "success" },
      response: { token: expect.any(String) },
    });
    expect(response.body.response.token).toMatch(/^[\w-]*\.[\w-]*\.[\w-]*$/);
  });

  describe("should return 400", () => {
    it("when user input is not valid", async () => {
      const response = await request.post(endPoint).send({
        no_rm: "000001",
        birthdate: "1990-09-09",
      });

      // check status code
      expect(response.status).toBe(400);

      // check overall structure
      expect(response.body).toMatchObject({
        metadata: { status: false, message: expect.any(String) },
      });
    });

    it("when pasien is not found", async () => {
      const response = await request.post(endPoint).send({
        norm: "000002",
        birthdate: "1990-10-10",
      });

      // check status code
      expect(response.status).toBe(400);

      // check overall structure
      expect(response.body).toMatchObject({
        metadata: {
          status: false,
          message: ERROR_MESSAGE.REGISTRATION.PATIENT_NOT_FOUND,
        },
      });
    });
  });

  describe("should return 403", () => {
    it.each([["before"], ["after"]])(
      "when registering %s the timeframe",
      async (time) => {
        setMockTime(time);

        const response = await request.post(endPoint).send({
          norm: mockPatient.no_rm,
          birthdate: mockPatient.tgl_lahir,
          register: true,
        });

        expect(response.status).toBe(403);
        expect(response.body).toMatchObject({
          metadata: {
            status: false,
            message: expect.stringContaining(
              "Pendaftaran online hanya dapat dilakukan di hari aktif"
            ),
          },
        });
      }
    );
  });
});
