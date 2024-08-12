import AuthService from "../AuthService";
import PatientService from "../PatientService";

jest.mock("../PatientService");

describe("AuthService Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getPatientData", () => {
    it("should return patient data", async () => {
      const mockPatient = { id: 1, no_rm: '123456', nama: "John Doe", tgl_lahir: '1990-08-08' };
      (PatientService.getData as jest.Mock).mockResolvedValue(mockPatient);

      const result = await AuthService.getPatientData("123456", "1990-08-08");
      expect(result).toEqual(mockPatient);
      expect(PatientService.getData).toHaveBeenCalledWith(
        "123456",
        new Date("1990-08-08")
      );
    });

    it("should return null if no patient found", async () => {
      (PatientService.getData as jest.Mock).mockResolvedValue(null);

      const result = await AuthService.getPatientData('123457', '1990-08-01');
      expect(result).toBeNull();
    })
  });
});
