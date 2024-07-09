import dbConfig from "@/DataBase/data.config";
import Upload from "@/DataBase/uploadSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConfig();

  try {
    const uploads = await Upload.find(); // Retrieve all uploads from the database
    return NextResponse.json(uploads);
  } catch (error) {
    console.error("Error retrieving uploads:", error);
    return NextResponse.json(
      { message: "Error retrieving uploads", error },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest, res: NextResponse) {
  await dbConfig(); // Ensure database connection

  try {
    const data = await req.json(); // Parse JSON body
    const { fileName, fileType, fileSize, img } = data;

    if (!fileName || !fileType || !fileSize || !img) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newUpload = new Upload({
      fileName,
      fileType,
      fileSize,
      img,
    });

    await newUpload.save();
    return NextResponse.json({ message: "Upload saved successfully" });
  } catch (error) {
    console.error("Error saving upload:", error);
    return NextResponse.json(
      { message: "Error saving upload", error },
      { status: 500 }
    );
  }
}
