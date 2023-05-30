import { useEffect, useState } from "react";
import axios from "axios";
import type { WeatherResponse } from "./types";

export function useFetchData(center: { lat: number; lng: number }) {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: number;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get<WeatherResponse>(import.meta.env["VITE_WEATHER_API_URL"], {
          params: {
            key: import.meta.env["VITE_WEATHER_API_KEY"],
            q: `${center.lat},${center.lng}`,
            days: 2,
          },
        });

        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    // wait 2 seconds before fetching data
    timer = setTimeout(fetchData, 2000);

    // wait 2 seconds before fetching data and don't fetch data on initial render
    // if (center.lat === CENTER['lat'] && center.lng === CENTE['lng']) {
    //   timer = setTimeout(fetchData, 2000);
    // }

    return () => clearTimeout(timer);
  }, [center]);

  return { data, loading };
}
