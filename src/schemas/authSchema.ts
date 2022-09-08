import Joi from 'joi';

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{10,}$/),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const authSchemas = {
  signupSchema,
  signinSchema
}

export default authSchemas


// TODO : document this
/**
/^
  (?=.*\d)              // deve conter ao menos um dígito
  (?=.*[a-z])           // deve conter ao menos uma letra minúscula
  (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
  (?=.*[$*&@#])         // deve conter ao menos um caractere especial
  [0-9a-zA-Z$*&@#]{10,}  // deve conter ao menos 10 dos caracteres mencionados
$/
 */