import dbConnect from "@/lib/dbconnect";
import WeatherInfo from "@/app/models/WeatherInfo";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    // console.error("Body", req.json());
    const read = await req.json()
    console.log("read",read)
    const uploadInfo = await WeatherInfo.create(read); // Using parsed object
    console.log("Document created", uploadInfo);
    // Handle success response
  } catch (error) {
    console.error("Error creating document", error);
  }
  return NextResponse.json({ message: "Success" });
}
