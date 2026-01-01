"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Thermometer, Droplets } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

function DataDisplay() {
  const query = useQuery({
    queryKey: ["weatherworker_data"],
    queryFn: async () => {
      const res = await fetch("/api/weather", { cache: "no-store" });
      if (!res.ok) throw new Error("Fetch failed");
      return res.json();
    },
    staleTime: 0,
    refetchInterval: 60000,
    gcTime: 0,
  });

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
      {query.isLoading || query.isRefetching ? (
        <div className="fixed flex flex-row items-center z-50 gap-5">
          <Spinner className="size-10"></Spinner>
          <p className="text-xl">Loading...</p>
        </div>
      ) : null}
      <div
        className={`flex flex-col w-full items-center gap-10 ${query.isLoading || query.isRefetching ? "blur-2xl" : ""} transition-all duration-100`}
      >
        <div className="flex flex-row gap-10">
          <Card className="flex flex-col items-center justify-center gap-4 w-max p-10 hover:bg-muted transition duration-300">
            <Thermometer size="56" />
            <h2 className="text-2xl font-bold">Temperature</h2>
            <p className="text-4xl font-extrabold">
              {query.data?.ds18b20?.value.toFixed(1)}ºC
            </p>
            <p className="italic text-sm text-center">
              Last update:
              <br />
              {query.data?.ds18b20?.timestamp
                ? new Date(
                    Number(query.data.ds18b20.timestamp),
                  ).toLocaleString()
                : "Unavailable"}
            </p>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-4 w-max p-10 hover:bg-muted transition duration-300">
            <Droplets size="56" />
            <h2 className="text-2xl font-bold">Humidity</h2>
            <p className="text-4xl font-extrabold">
              {query.data?.dht11?.value}%
            </p>
            <p className="italic text-sm text-center">
              Last update:
              <br />
              {query.data?.dht11?.timestamp
                ? new Date(Number(query.data.dht11.timestamp)).toLocaleString()
                : "Unavailable"}
            </p>
          </Card>
        </div>
        <Button
          onClick={() => query.refetch()}
          className="hover:cursor-pointer"
          disabled={query.isLoading || query.isRefetching}
        >
          Refresh
        </Button>
      </div>
    </Card>
  );
}

export default DataDisplay;
