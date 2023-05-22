import axios from "axios";
import { WeatherResponse } from "./types";

export const fetchForecast = async (latitude: number, longitude: number) => {
  try {
    const { data } = await axios.get<WeatherResponse>(process.env["WEATHER_API_URL"] as string, {
      params: {
        key: process.env["WEATHER_API_KEY"],
        q: `${latitude},${longitude}`,
        days: 2,
      },
    });

    const currentDay = data.forecast.forecastday[0];
    const nextDay = data.forecast.forecastday[1];

    const currentTemperature = currentDay.day.avgtemp_c;
    const currentHumidity = currentDay.day.avghumidity;
    const currentPrecipitation = currentDay.day.totalprecip_mm;

    const nextTemperature = nextDay.day.avgtemp_c;
    const nextHumidity = nextDay.day.avghumidity;
    const nextPrecipitation = nextDay.day.totalprecip_mm;

    return {
      current: {
        temperature: currentTemperature,
        humidity: currentHumidity,
        precipitation: currentPrecipitation,
      },
      next: {
        temperature: nextTemperature,
        humidity: nextHumidity,
        precipitation: nextPrecipitation,
      },
    };
  } catch (error) {
    console.error("Error fetching forecast:", error);
    throw error;
  }
};
