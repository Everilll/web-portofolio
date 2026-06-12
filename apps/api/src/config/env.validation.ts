import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().default(3001),
  NODE_ENV: Joi.string().default('development'),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),
  FRONTEND_URL: Joi.string().required(),
  CLOUDINARY_CLOUD_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
  THROTTLE_TTL: Joi.number().default(60000),
  THROTTLE_LIMIT: Joi.number().default(10),
  CONTACT_THROTTLE_TTL: Joi.number().default(300000),
  CONTACT_THROTTLE_LIMIT: Joi.number().default(3),
  MAX_FILE_SIZE_MB: Joi.number().default(5),
  SWAGGER_ENABLED: Joi.string().default('true'),
});