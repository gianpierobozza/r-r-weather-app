// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { OpenWeatherModel } = initSchema(schema);

export {
  OpenWeatherModel
};