const { celebrate, Segments, Joi } = require('celebrate');

module.exports = () => {
  const createOng = celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      whatsapp: Joi.string().regex(/^\d+$/).min(10).max(11).required(),
      city: Joi.string().required(),
      uf: Joi.string().length(2).required(),
    }),
  });

  return createOng;
};
