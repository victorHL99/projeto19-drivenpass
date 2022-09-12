import Joi from 'joi';
var credentialCreateSchema = Joi.object({
    url: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    title: Joi.string().required()
});
var credentialSchema = {
    credentialCreateSchema: credentialCreateSchema
};
export default credentialSchema;
