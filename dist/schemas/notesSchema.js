import Joi from 'joi';
var noteCreateSchema = Joi.object({
    title: Joi.string().required().max(50),
    description: Joi.string().required().max(1000)
});
var noteSchema = {
    noteCreateSchema: noteCreateSchema
};
export default noteSchema;
