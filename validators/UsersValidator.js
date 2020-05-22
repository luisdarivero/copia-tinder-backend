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
    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
          name: Joi.string().required(),
          gender: Joi.string().required().valid('Mujer').valid('Hombre'),
          email: Joi.string().email().required(),
          password: Joi.string(),
          birth_date: Joi.date().required().max(Date.now() - (31557600000 * 18))
        }),
      }),
    find_near_users: celebrate({
        [Segments.BODY]: Joi.object().keys({
            coordinates: Joi.array().length(2).items(
            
                Joi.number().required().min(-180.0).max(180),
                Joi.number().required().min(-90).max(90)
            )
        }),
    }),
    //Posteriormente se puede agregar un validador desde rutas de usuario
    // upload_photo: celebrate({
    //     [Segments.BODY]: Joi.object().keys({
    //         photo: Joi.string().required()
    //     }),
    // })
};