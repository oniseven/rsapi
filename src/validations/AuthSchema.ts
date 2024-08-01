import coreJoi from "joi";
import joiDate from "@joi/date";
import JoiMessage from "../constants/joi.message";

const Joi = coreJoi.extend(joiDate) as typeof coreJoi;

export const AuthSchema = Joi.object({
  norm: Joi.string().label("No RM").required().messages({
    "any.required": JoiMessage.required,
    "number.base": JoiMessage.string,
    "number.empty": JoiMessage.empty,
  }),
  birthdate: Joi.date()
    .label("Tgl. Lahir")
    .format("YYYY-MM-DD")
    .required()
    .messages({
      "any.required": JoiMessage.required,
      "date.empty": JoiMessage.empty,
      "date.format": JoiMessage.date.format,
      "date.base": JoiMessage.date.base,
    }),
});
