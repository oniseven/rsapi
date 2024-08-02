import { Request, Response } from "express";
import { validateUserInput } from "../utils/InputValidationHelper";

import { ClientException } from "../exceptions/ClientException";
import { ERROR_MESSAGE } from "../constants/messages";

import { ForbiddenException } from "../exceptions/ForbiddenException";
import { AuthSchema } from "../validations/AuthSchema";
import AuthService from "../services/AuthService";

const AuthController = async (
  req: Request,
  res: Response
): Promise<Express.Response> => {
  const { norm, birthdate, register } = req.body as {
    norm: string;
    birthdate: string;
    register?: boolean;
  };

  // input validation
  const input = validateUserInput(AuthSchema, { norm, birthdate });

  // validate the patient
  const patient = await AuthService.getPatientData(input.norm, input.birthdate);
  if (!patient)
    throw new ClientException(ERROR_MESSAGE.REGISTRATION.PATIENT_NOT_FOUND);

  if (register) {
    // jika pasien daftar visite
    const { status: isBetweenTimeFrame, openAt, closeAt } =
      await AuthService.isRegisteredWithinTimeFrame();
    if (!isBetweenTimeFrame)
      throw new ForbiddenException(
        `Pendaftaran online hanya dapat dilakukan di hari aktif pada pukul ${openAt} sampai pukul ${closeAt}`
      );

    // jika sudah registrasi atau masih rawat inap
    const [hasRegistered, message] = await AuthService.hasRegistered(patient);
    if (hasRegistered) throw new ForbiddenException(message);
  }

  // create token
  const token = await AuthService.createToken(patient);

  // get jwt token
  return res.withData({ token });
};

export default AuthController;
