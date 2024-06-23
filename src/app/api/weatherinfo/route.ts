import dbConnect from "@/lib/dbconnect";
import WeatherInfoModel from "@/app/models/WeatherInfoModel";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();
  try {
    const read = await req.json()
    const uploadInfo = await WeatherInfoModel.create(read); 
    console.log("Document created", uploadInfo);
  } catch (error) {
    console.error("Error creating document", error);
  }
  return NextResponse.json({ message: "Success" });
}
