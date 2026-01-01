import React from "react";
import { Card } from "@/components/ui/card";
import { Thermometer, Droplets } from "lucide-react";
import Link from "next/link";
import DataDisplay from "@/app/weather/data-display";

function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-3xl font-bold">Weather Station</h1>
      <p className="text-center">
        This page is pretty cool... It shows live readings <br />
        from a weather station in my room, because why not lol.
      </p>
      <DataDisplay />
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
