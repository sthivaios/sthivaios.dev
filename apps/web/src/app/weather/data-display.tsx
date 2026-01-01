"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Thermometer, Droplets } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { tryCatch } from "@/lib/try-catch";
import { fetchWeatherWorkerData } from "@/app/weather/actions";

function DataDisplay() {
  const query = useQuery({
    queryKey: ["weatherworker_data"],
    queryFn: async () => {
      const { data, error } = await tryCatch(fetchWeatherWorkerData());

      if (error) throw error;
      return data;
    },
  });

  if (query.isLoading) {
    return (
      <Card className="w-max flex flex-row items-center justify-center gap-10 p-15">
        Loading...
      </Card>
    );
  }

  if (query.error) {
    return (
      <Card className="w-max flex flex-row items-center justify-center gap-10 p-15">
        Error!
        <br />
        {query.error.message}
      </Card>
    );
  }

  return (
    <Card className="w-max flex flex-row items-center justify-center gap-10 p-15">
      <Card className="flex flex-col items-center justify-center gap-4 w-max p-10 hover:bg-muted transition duration-300">
        <Thermometer size="56" />
        <h2 className="text-2xl font-bold">Temperature</h2>
        <p className="text-4xl font-extrabold">67ºC</p>
        <p className="italic text-sm text-center">
          Last update:
          <br />
          {new Date().toLocaleString()}
        </p>
      </Card>
      <Card className="flex flex-col items-center justify-center gap-4 w-max p-10 hover:bg-muted transition duration-300">
        <Droplets size="56" />
        <h2 className="text-2xl font-bold">Humidity</h2>
        <p className="text-4xl font-extrabold">67%</p>
        <p className="italic text-sm text-center">
          Last update:
          <br />
          {new Date().toLocaleString()}
        </p>
      </Card>
    </Card>
  );
}

export default DataDisplay;
