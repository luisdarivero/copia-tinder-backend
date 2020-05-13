const { celebrate, Joi, Segments } = require('celebrate');

module.exports = {
    signup: celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string(),
            name: Joi.string().required(),
            gender: Joi.string().required().valid('Mujer').valid('Hombre'),
            //minimo 18 años de edad
            birth_date: Joi.date().required().max(Date.now() - (31557600000 * 18))
        }),
    }),
};