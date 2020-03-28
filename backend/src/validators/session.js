const { celebrate, Segments, Joi } = require('celebrate');
module.exports = () => {
  const login = celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  });

  return login;
};
