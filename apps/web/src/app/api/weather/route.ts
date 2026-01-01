import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const { data } = await axios.get(
      `https://weatherworker.sthivaios.dev?timestamp=${new Date().getTime()}`,
      {
        headers: {
          Authorization: process.env.WEATHERWORKER_API_KEY!,
        },
      },
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 },
    );
  }
}
