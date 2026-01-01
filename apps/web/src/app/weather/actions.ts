"use server";

import axios from "axios";

export async function fetchWeatherWorkerData() {
  try {
    const { data } = await axios.get("https://weatherworker.sthivaios.dev", {
      headers: {
        Authorization: `${process.env.WEATHERWORKER_API_KEY}`,
      },
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error: "Failed to fetch weather data" };
  }
}
