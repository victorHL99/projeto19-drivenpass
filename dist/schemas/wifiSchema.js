import Joi from 'joi';
var wifiCreateSchema = Joi.object({
    label: Joi.string().required().max(50),
    password: Joi.string().required().max(30)
});
var wifiSchema = {
    wifiCreateSchema: wifiCreateSchema
};
export default wifiSchema;
