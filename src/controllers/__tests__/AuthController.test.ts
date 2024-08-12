import { Request, Response } from "express";
import AuthController from "../AuthController";
import AuthService from "../../services/AuthService";
import { AuthSchema } from "../../validations/AuthSchema";
import { Pasien } from "../../models/billing/master/Pasien";
import { ClientException } from "../../exceptions/ClientException";
import { CustomException } from "../../exceptions/CustomException";
import { validateUserInput } from "../../utils/InputValidationUtils";

jest.mock("../../services/AuthService");
jest.mock("../../utils/InputValidationUtils");
jest.mock("../../models/billing/master/Pasien");

describe("AuthController Test", () => {
  beforeAll(() => {
    process.env.ED_SECRET =
      "1be5a9ab7f3fc312fbcedefb43419258bb480350395d89538891e34ad32c3294";
  });

  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;
  let withDataMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    withDataMock = jest.fn();

    req = {
      body: {
        norm: "000001",
        birthdate: "1990-01-01",
        register: true,
      },
    };

    res = {
      status: statusMock,
      json: jsonMock,
      withData: withDataMock,
    };

    next = jest.fn();

    jest.clearAllMocks();
  });

  it("should throw Exception when validateUserInput fails", async () => {
    (validateUserInput as jest.Mock).mockImplementation(() => {
      throw new ClientException("Validation failed");
    });

    await expect(
      AuthController(req as Request, res as Response)
    ).rejects.toThrow(CustomException);

    expect(validateUserInput).toHaveBeenCalledWith(AuthSchema, {
      norm: "000001",
      birthdate: "1990-01-01",
    });
    expect(AuthService.getPatientData).not.toHaveBeenCalled();
    expect(AuthService.isRegisteredWithinTimeFrame).not.toHaveBeenCalled();
    expect(AuthService.hasRegistered).not.toHaveBeenCalled();
    expect(AuthService.createToken).not.toHaveBeenCalled();
  });

  it("should throw Exception when user is not found", async () => {
    (validateUserInput as jest.Mock).mockReturnValue({
      norm: "000001",
      birthdate: "1990-01-01",
    });

    (AuthService.getPatientData as jest.Mock).mockImplementation(() => {
      throw new ClientException("Patient not found");
    });

    await expect(
      AuthController(req as Request, res as Response)
    ).rejects.toThrow(CustomException);

    expect(validateUserInput).toHaveBeenCalledWith(AuthSchema, {
      norm: "000001",
      birthdate: "1990-01-01",
    });
    expect(AuthService.getPatientData).toHaveBeenCalledWith(
      "000001",
      "1990-01-01"
    );
    expect(AuthService.isRegisteredWithinTimeFrame).not.toHaveBeenCalled();
    expect(AuthService.hasRegistered).not.toHaveBeenCalled();
    expect(AuthService.createToken).not.toHaveBeenCalled();
  });

  it("should not call isRegisteredWithinTimeFrame and hasRegistered when register equal to false or undefined", async () => {
    req.body.register = false;
    const mockPatient = { id: 1, no_rm: "000001", nama: "John Doe" } as Pasien;

    (validateUserInput as jest.Mock).mockReturnValue({
      norm: "000001",
      birthdate: "1990-01-01",
    });

    (AuthService.getPatientData as jest.Mock).mockResolvedValue(mockPatient);

    await AuthController(req as Request, res as Response);

    expect(validateUserInput).toHaveBeenCalledWith(AuthSchema, {
      norm: "000001",
      birthdate: "1990-01-01",
    });
    expect(AuthService.getPatientData).toHaveBeenCalledWith(
      "000001",
      "1990-01-01"
    );

    expect(AuthService.isRegisteredWithinTimeFrame).not.toHaveBeenCalled();
    expect(AuthService.hasRegistered).not.toHaveBeenCalled();

    expect(AuthService.createToken).toHaveBeenCalled();
  });

  it("should call isRegisteredWithinTimeFrame and hasRegistered when register equal to true", async () => {
    const mockPatient = { id: 1, no_rm: "000001", nama: "John Doe" } as Pasien;
    const mockWithinTimeFrame = {
      status: true,
      openAt: "07:00",
      closeAt: "12:00",
    };

    (validateUserInput as jest.Mock).mockReturnValue({
      norm: "000001",
      birthdate: "1990-01-01",
    });

    (AuthService.getPatientData as jest.Mock).mockResolvedValue(mockPatient);

    (AuthService.isRegisteredWithinTimeFrame as jest.Mock).mockResolvedValue(
      mockWithinTimeFrame
    );

    (AuthService.hasRegistered as jest.Mock).mockResolvedValue([
      false,
      "passed",
    ]);

    await AuthController(req as Request, res as Response);

    expect(validateUserInput).toHaveBeenCalledWith(AuthSchema, {
      norm: "000001",
      birthdate: "1990-01-01",
    });
    expect(AuthService.getPatientData).toHaveBeenCalledWith(
      "000001",
      "1990-01-01"
    );

    expect(AuthService.isRegisteredWithinTimeFrame).toHaveBeenCalled();
    expect(AuthService.hasRegistered).toHaveBeenCalledWith(mockPatient);
    expect(AuthService.createToken).toHaveBeenCalled();
  });

  it("should throw Exception if registration is within the restricted timeframe", async () => {
    const mockPatient = { id: 1, no_rm: "000001", nama: "John Doe" } as Pasien;
    const mockWithinTimeFrame = {
      status: false,
      openAt: "07:00",
      closeAt: "12:00",
    };

    (validateUserInput as jest.Mock).mockReturnValue({
      norm: "000001",
      birthdate: "1990-01-01",
    });

    (AuthService.getPatientData as jest.Mock).mockResolvedValue(mockPatient);

    (AuthService.isRegisteredWithinTimeFrame as jest.Mock).mockResolvedValue(
      mockWithinTimeFrame
    );

    await expect(
      AuthController(req as Request, res as Response)
    ).rejects.toThrow(CustomException);

    expect(validateUserInput).toHaveBeenCalledWith(AuthSchema, {
      norm: "000001",
      birthdate: "1990-01-01",
    });
    expect(AuthService.getPatientData).toHaveBeenCalledWith(
      "000001",
      "1990-01-01"
    );
    expect(AuthService.isRegisteredWithinTimeFrame).toHaveBeenCalled();
    expect(AuthService.hasRegistered).not.toHaveBeenCalled();
    expect(AuthService.createToken).not.toHaveBeenCalled();
  });

  it("should throw Exception if the patient is already registered", async () => {
    const mockPatient = { id: 1, no_rm: "000001", nama: "John Doe" } as Pasien;
    const mockWithinTimeFrame = {
      status: true,
      openAt: "07:00",
      closeAt: "12:00",
    };

    (validateUserInput as jest.Mock).mockReturnValue({
      norm: "000001",
      birthdate: "1990-01-01",
    });

    (AuthService.getPatientData as jest.Mock).mockResolvedValue(mockPatient);

    (AuthService.isRegisteredWithinTimeFrame as jest.Mock).mockResolvedValue(
      mockWithinTimeFrame
    );

    (AuthService.hasRegistered as jest.Mock).mockResolvedValue([
      true,
      "Had been registered",
    ]);

    await expect(
      AuthController(req as Request, res as Response)
    ).rejects.toThrow(CustomException);

    expect(validateUserInput).toHaveBeenCalledWith(AuthSchema, {
      norm: "000001",
      birthdate: "1990-01-01",
    });
    expect(AuthService.getPatientData).toHaveBeenCalledWith(
      "000001",
      "1990-01-01"
    );
    expect(AuthService.isRegisteredWithinTimeFrame).toHaveBeenCalled();
    expect(AuthService.hasRegistered).toHaveBeenCalledWith(mockPatient);
    expect(AuthService.createToken).not.toHaveBeenCalled();
  });

  it("should return token when all validation is passed", async () => {
    const mockPatient = { id: 1, no_rm: "000001", nama: "John Doe" } as Pasien;
    const mockWithinTimeFrame = {
      status: true,
      openAt: "07:00",
      closeAt: "12:00",
    };

    (validateUserInput as jest.Mock).mockReturnValue({
      norm: "000001",
      birthdate: "1990-01-01",
    });

    (AuthService.getPatientData as jest.Mock).mockResolvedValue(mockPatient);

    (AuthService.isRegisteredWithinTimeFrame as jest.Mock).mockResolvedValue(
      mockWithinTimeFrame
    );

    (AuthService.hasRegistered as jest.Mock).mockResolvedValue([ false, "passed" ]);

    (AuthService.createToken as jest.Mock).mockResolvedValue("mocked_token");

    await AuthController(req as Request, res as Response);

    expect(validateUserInput).toHaveBeenCalledWith(AuthSchema, {
      norm: "000001",
      birthdate: "1990-01-01",
    });
    expect(AuthService.getPatientData).toHaveBeenCalledWith(
      "000001",
      "1990-01-01"
    );
    expect(AuthService.isRegisteredWithinTimeFrame).toHaveBeenCalled();
    expect(AuthService.hasRegistered).toHaveBeenCalledWith(mockPatient);
    expect(AuthService.createToken).toHaveBeenCalledWith(mockPatient);
    expect(res.withData).toHaveBeenCalledWith({ token: "mocked_token" });
  });
});
