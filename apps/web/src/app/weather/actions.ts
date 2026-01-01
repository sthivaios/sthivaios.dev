"use server";

import axios from "axios";
import { tryCatch } from "@/lib/try-catch";

export async function fetchWeatherWorkerData() {
  const { data, error } = await tryCatch(
    axios.get("https://weatherworker.sthivaios.dev", {
      headers: {
        Authorization: `${process.env.WEATHERWORKER_API_KEY}`,
      },
    }),
  );

  if (error) throw error;

  return data;
}
