import React from "react";
import { Card } from "@/components/ui/card";
import { Droplets, Thermometer } from "lucide-react";
import Link from "next/link";

async function Page() {
  const weatherWorkerResponse = await fetch(
    "https://weatherworker.sthivaios.dev",
    {
      method: "GET",
      headers: {
        Authorization: process.env.WEATHERWORKER_API_KEY ?? "",
      },
    },
  );

  const weatherWorkerResponseJson = await weatherWorkerResponse.json();

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-bold">Weather Station</h1>
      <p className="text-center">
        This page is pretty cool... It shows live readings <br />
        from a weather station in my room, because why not lol.
      </p>
      <Card className="w-max flex flex-row items-center justify-center gap-10 p-15">
        <Card className="flex flex-col items-center justify-center gap-4 w-max p-10 hover:bg-muted transition duration-300">
          <Thermometer size="56" />
          <h2 className="text-2xl font-bold">Temperature</h2>
          <p className="text-4xl font-extrabold">
            {weatherWorkerResponseJson.ds18b20.value.toFixed(1)}ºC
          </p>
          <p className="italic text-sm text-center">
            Last update:
            <br />
            {new Date(
              Number(weatherWorkerResponseJson.ds18b20.timestamp),
            ).toLocaleString()}
          </p>
        </Card>
        <Card className="flex flex-col items-center justify-center gap-4 w-max p-10 hover:bg-muted transition duration-300">
          <Droplets size="56" />
          <h2 className="text-2xl font-bold">Humidity</h2>
          <p className="text-4xl font-extrabold">
            {weatherWorkerResponseJson.dht11.value}%
          </p>
          <p className="italic text-sm text-center">
            Last update:
            <br />
            {new Date(
              Number(weatherWorkerResponseJson.dht11.timestamp),
            ).toLocaleString()}
          </p>
        </Card>
      </Card>
      <div className="flex flex-col items-center">
        <p className="text-center italic">
          Check out the repos that make this work (post about this coming soon):
        </p>
        <p className="italic">
          <Link
            href={"https://github.com/sthivaios/website-weatherworker"}
            target="_blank"
            className="hyperlink underline"
          >
            WeatherWorker
          </Link>
          ,{" "}
          <Link
            href={"https://github.com/sthivaios/website-weatherworker-bridge"}
            target="_blank"
            className="hyperlink underline"
          >
            WeatherWorker Bridge
          </Link>
          ,{" "}
          <Link
            href={"https://github.com/sthivaios/EDLAVP-ESP-FW"}
            target="_blank"
            className="hyperlink underline"
          >
            EDLAVP ESP32 Firmware
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Page;
