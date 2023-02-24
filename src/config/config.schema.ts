import * as Joi from 'joi';

export const configSchemaValidation = Joi.object({
  PORT: Joi.number().default(3000).required(),
  DATABASE_URI: Joi.string().required(),
  APP_VERSION: Joi.string().required(),
  APP_HISTORY_LIMIT: Joi.number().default(20).required(),
});
