import Joi from 'joi';

const credentialCreateSchema = Joi.object({
  url: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  title: Joi.string().required(),
});

const credentialSchema = {
  credentialCreateSchema
}

export default credentialSchema