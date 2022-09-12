import Joi from 'joi';

const noteCreateSchema = Joi.object({
  title: Joi.string().required().max(50),
  description: Joi.string().required().max(1000),
})

const noteSchema = {
  noteCreateSchema
}

export default noteSchema