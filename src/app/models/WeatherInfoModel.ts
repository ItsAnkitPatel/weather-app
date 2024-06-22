import mongoose, { Schema } from "mongoose";

export interface weatherInfo extends mongoose.Document {
  location: string;
  country: string;
  weather: {
    temp: number;
    humidity: number;
  };
  latitude: number;
  longitude: number;
}

const weatherInfoSchema: Schema = new mongoose.Schema<weatherInfo>(
  {
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    weather: {
      temp: {
        type: Number,
        required: true,
      },
      humidity: {
        type: Number,
        required: true,
      },
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const WeatherInfoModel =
  mongoose.models.WeatherInfo ||
  mongoose.model("WeatherInfo", weatherInfoSchema);

export default WeatherInfoModel;
