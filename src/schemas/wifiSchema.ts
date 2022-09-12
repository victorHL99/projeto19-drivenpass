import Joi from 'joi';

const wifiCreateSchema = Joi.object({
  label: Joi.string().required().max(50),
  password: Joi.string().required().max(30),
})

const wifiSchema = {
  wifiCreateSchema
}

export default wifiSchema