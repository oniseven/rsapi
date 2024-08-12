import Joi, { ObjectSchema } from "joi"
import { validateUserInput } from "../InputValidationUtils";
import { ClientException } from "../../exceptions/ClientException";
import { CustomException } from "../../exceptions/CustomException";

describe('validateUserInput', () => {
  const schema: ObjectSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().integer().required()
  });

  it("should return validated data if input is valid", () => {
    const input = {name: 'Johm Doe', age: 30};
    const result = validateUserInput(schema, input);

    expect(result).toEqual(input);
  });

  it("should throw ClientException  if input is invalid", () => {
    const input = {name: 'John Doe'};
    
    expect(() => validateUserInput(schema, input)).toThrow(CustomException);
    expect(() => validateUserInput(schema, input)).toThrow('\"age\" is required');
  })
})