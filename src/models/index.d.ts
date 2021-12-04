import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type OpenWeatherModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class OpenWeatherModel {
  readonly id: string;
  readonly OPENWEATHER_PROD_API_KEY?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<OpenWeatherModel, OpenWeatherModelMetaData>);
  static copyOf(source: OpenWeatherModel, mutator: (draft: MutableModel<OpenWeatherModel, OpenWeatherModelMetaData>) => MutableModel<OpenWeatherModel, OpenWeatherModelMetaData> | void): OpenWeatherModel;
}