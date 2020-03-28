const { celebrate, Segments, Joi } = require('celebrate');

module.exports = () => {
  const listProfile = celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  });

  return listProfile;
};
