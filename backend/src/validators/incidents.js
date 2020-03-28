const { celebrate, Segments, Joi } = require('celebrate');

module.exports = () => {
  const listIncidents = celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  });
  const createIncidents = celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().min(10).max(50).required(),
      description: Joi.string().min(20).max(200).required(),
      value: Joi.number().min(0).required(),
    }),
  });
  const deleteIncidents = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  });

  return {
    listIncidents,
    createIncidents,
    deleteIncidents,
  };
};
