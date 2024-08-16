import moment from "moment-timezone";
import MockDate from "mockdate";
import RegistrationService from "../RegistrationService";
import { Setting } from "../../models/billing/master/Setting";
import PatientService from "../PatientService";
import { Pasien } from "../../models/billing/master/Pasien";
import { ERROR_MESSAGE } from "../../constants/messages";

jest.mock("../PatientService");
jest.mock("../../models/billing/master/Setting");
jest.mock("../../models/billing/master/Pasien");

describe("RegistrationService Test", () => {
  const mockedSettingData = {
    open: "08:00",
    close: "16:00",
    buka: 8,
    tutup: 16,
  };

  beforeEach(() => {
    moment.tz.setDefault("Asia/Jakarta");
  });

  afterEach(() => {
    moment.tz.setDefault();
    MockDate.reset();
    jest.clearAllMocks();
  });

  describe("isRegisteredWithinTimeFrame", () => {
    const setMockTime = (time: string = "before") => {
      const hours =
        time === "before"
          ? mockedSettingData.buka - 1
          : time === "after"
          ? mockedSettingData.tutup + 1
          : mockedSettingData.buka + 1;

      const mockedDate = moment.tz('Asia/Jakarta').startOf("day").add(hours, "hours").toDate();
      MockDate.set(mockedDate);
    };

    it("should return Exception when setting timeframe is not found", async () => {
      (Setting.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        RegistrationService.isRegisteredWithinTimeFrame()
      ).rejects.toThrow("Setting jam PM belum di set");
    });

    it("should handle invalid JSON data in setting", async () => {
      (Setting.findOne as jest.Mock).mockResolvedValue({
        data: "Invalid JSON",
      });

      await expect(RegistrationService.isRegisteredWithinTimeFrame()).rejects.toThrow();
    });

    it.each(["before", "after"])(
      "Should return false when registering %s the timeframe",
      async (time) => {
        setMockTime(time);

        (Setting.findOne as jest.Mock).mockResolvedValue({
          data: JSON.stringify(mockedSettingData),
        });

        const result = await RegistrationService.isRegisteredWithinTimeFrame();

        expect(result).toMatchObject({
          status: false,
          openAt: "08:00",
          closeAt: "16:00",
        });
      }
    );

    it("should return true when registering within the timeframe", async () => {
      setMockTime("within");

      (Setting.findOne as jest.Mock).mockResolvedValue({
        data: JSON.stringify(mockedSettingData),
      });

      const result = await RegistrationService.isRegisteredWithinTimeFrame();

      expect(result).toMatchObject({
        status: true,
        openAt: "08:00",
        closeAt: "16:00",
      });
    });

    it("should work correctly at exact opening time", async () => {
      const mockedDate = moment.tz('Asia/Jakarta').startOf("day").add(mockedSettingData.buka, "hours").toDate();
      MockDate.set(mockedDate);
  
      (Setting.findOne as jest.Mock).mockResolvedValue({
        data: JSON.stringify(mockedSettingData),
      });
  
      const result = await RegistrationService.isRegisteredWithinTimeFrame();
  
      expect(result.status).toBe(true);
    });

    it("should work correctly at exact closing time", async () => {
      const mockedDate = moment.tz('Asia/Jakarta').startOf("day").add(mockedSettingData.tutup, "hours").toDate();
      MockDate.set(mockedDate);
  
      (Setting.findOne as jest.Mock).mockResolvedValue({
        data: JSON.stringify(mockedSettingData),
      });
  
      const result = await RegistrationService.isRegisteredWithinTimeFrame();
  
      expect(result.status).toBe(false);
    });
  });

  describe("hasRegistered", () => {
    const mockPatient = { id: 1, no_rm: "000001", nama: "John Doe" } as Pasien;

    const setupMock = (options: {
      registeredOnline?: boolean;
      isStillInWard?: boolean;
      registeredOffline?: boolean;
    }) => {
      (PatientService.hasRegisteredOnline as jest.Mock).mockResolvedValue(
        options.registeredOnline ?? false
      );
      (PatientService.stillInWard as jest.Mock).mockResolvedValue(
        options.isStillInWard ?? false
      );
      (PatientService.hasRegisteredOffline as jest.Mock).mockResolvedValue(
        options.registeredOffline ?? false
      );
    };

    it("should return false if patient hasn't registered at all", async () => {
      setupMock({});

      const result = await RegistrationService.hasRegistered(mockPatient);

      expect(result).toEqual([false, null]);
    });

    it("should return true and error message if already register on online registration", async () => {
      setupMock({ registeredOnline: true });

      const [status, message] = await RegistrationService.hasRegistered(
        mockPatient
      );

      expect(status).toBe(true);
      expect(message).toBe(
        ERROR_MESSAGE.REGISTRATION.ALREADY_REGISTERED_ONLINE
      );
      expect(PatientService.hasRegisteredOnline).toHaveBeenCalledWith(
        mockPatient
      );
    });

    it("should return true and error message if still in ward", async () => {
      setupMock({ isStillInWard: true });

      const [status, message] = await RegistrationService.hasRegistered(
        mockPatient
      );

      expect(status).toBe(true);
      expect(message).toBe(ERROR_MESSAGE.REGISTRATION.STILL_IN_WARD);
      expect(PatientService.stillInWard).toHaveBeenCalledWith(mockPatient);
    });

    it("should return true and error message if already register on offline registration", async () => {
      const visitDate = moment().format("YYYY-MM-DD");
      setupMock({ registeredOffline: true });

      const [status, message] = await RegistrationService.hasRegistered(
        mockPatient,
        visitDate
      );

      expect(status).toBe(true);
      expect(message).toBe(ERROR_MESSAGE.REGISTRATION.ALREADY_REGISTERED);
      expect(PatientService.hasRegisteredOffline).toHaveBeenCalledWith(
        mockPatient,
        visitDate
      );
    });
  });
});
