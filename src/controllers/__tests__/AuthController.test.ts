import { Request, Response } from "express";
import AuthController from "../AuthController";
import { validateUserInput } from "../../utils/InputValidationUtils";
import { ClientException } from "../../exceptions/ClientException";
import AuthService from "../../services/AuthService";
import { ForbiddenException } from "../../exceptions/ForbiddenException";
import { AuthSchema } from "../../validations/AuthSchema";
import { Pasien } from "../../models/billing/master/Pasien";
import { CustomException } from "../../exceptions/CustomException";

jest.mock("../../services/AuthService");
jest.mock("../../utils/InputValidationUtils");

describe("AuthController Test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      body: {
        norm: "000001",
        birthdate: "1990-01-01",
        register: true,
      },
    };

    res = {
      withData: jest.fn().mockReturnThis(),
    };

    jest.clearAllMocks();
  });

  const mockPatient = { id: 1, no_rm: "000001", nama: "John Doe" } as Pasien;

  const setupMocks = (options: {
    validationError?: boolean;
    patientNotFound?: boolean;
    withinTimeFrame?: boolean;
    alreadyRegistered?: boolean;
  }) => {
    if (options.validationError) {
      (validateUserInput as jest.Mock).mockImplementation(() => {
        throw new ClientException("Validation failed");
      });
    } else {
      (validateUserInput as jest.Mock).mockReturnValue(req.body);
    }

    if (options.patientNotFound) {
      (AuthService.getPatientData as jest.Mock).mockResolvedValue(null);
    } else {
      (AuthService.getPatientData as jest.Mock).mockResolvedValue(mockPatient);
    }

    (AuthService.isRegisteredWithinTimeFrame as jest.Mock).mockResolvedValue({
      status: options.withinTimeFrame !== false,
      openAt: "07:00",
      closeAt: "12:00",
    });

    (AuthService.hasRegistered as jest.Mock).mockResolvedValue([
      options.alreadyRegistered, 
      options.alreadyRegistered ? "Had been registered" : "passed"
    ]);

    (AuthService.createToken as jest.Mock).mockResolvedValue("mocked_token");
  };

  it('should throw ClientException when validation fails', async () => {
    setupMocks({ validationError: true });

    await expect(AuthController(req as Request, res as Response)).rejects.toThrow(CustomException);
  });

  it('should throw ClientException when patient is not found', async () => {
    setupMocks({ patientNotFound: true });

    await expect(AuthController(req as Request, res as Response)).rejects.toThrow(CustomException);
    expect(AuthService.getPatientData).toHaveBeenCalledWith("000001", "1990-01-01");
  });

  it('should throw ForbiddenException when registration is outside the allowed timeframe', async () => {
    setupMocks({ withinTimeFrame: false });

    await expect(AuthController(req as Request, res as Response)).rejects.toThrow(CustomException);
    expect(AuthService.isRegisteredWithinTimeFrame).toHaveBeenCalled();
  });

  it('should throw ForbiddenException when patient is already registered', async () => {
    setupMocks({ alreadyRegistered: true });

    await expect(AuthController(req as Request, res as Response)).rejects.toThrow(CustomException);
    expect(AuthService.hasRegistered).toHaveBeenCalledWith(mockPatient);
  });

  it.each([true, false, undefined])('should handle registration correctly when register is %s', async (registerValue) => {
    req.body.register = registerValue;
    setupMocks({});

    await AuthController(req as Request, res as Response);

    expect(AuthService.getPatientData).toHaveBeenCalledWith("000001", "1990-01-01");
    
    if (registerValue === true) {
      expect(AuthService.isRegisteredWithinTimeFrame).toHaveBeenCalled();
      expect(AuthService.hasRegistered).toHaveBeenCalledWith(mockPatient);
    } else {
      expect(AuthService.isRegisteredWithinTimeFrame).not.toHaveBeenCalled();
      expect(AuthService.hasRegistered).not.toHaveBeenCalled();
    }

    expect(AuthService.createToken).toHaveBeenCalledWith(mockPatient);
    expect(res.withData).toHaveBeenCalledWith({ token: "mocked_token" });
  });

  it('should return token when all validation is passed', async () => {
    setupMocks({});

    await AuthController(req as Request, res as Response);

    expect(validateUserInput).toHaveBeenCalledWith(AuthSchema, {
      norm: "000001",
      birthdate: "1990-01-01",
    });
    expect(AuthService.getPatientData).toHaveBeenCalledWith("000001", "1990-01-01");
    expect(AuthService.isRegisteredWithinTimeFrame).toHaveBeenCalled();
    expect(AuthService.hasRegistered).toHaveBeenCalledWith(mockPatient);
    expect(AuthService.createToken).toHaveBeenCalledWith(mockPatient);
    expect(res.withData).toHaveBeenCalledWith({ token: "mocked_token" });
  });
});