import Joi from 'joi';
var cardCreateSchema = Joi.object({
    label: Joi.string().required().max(50),
    number: Joi.string().required().length(16),
    name: Joi.string().required(),
    securityCode: Joi.string().required().length(3),
    expirationDate: Joi.string().required().length(5),
    password: Joi.string().required().length(4),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().required().valid('credit', 'debit', 'both')
});
var cardSchema = {
    cardCreateSchema: cardCreateSchema
};
export default cardSchema;
