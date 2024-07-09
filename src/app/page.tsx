"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState("");
  const [allImage, setImage] = useState([]);

  const handleForm = (e: any) => {
    e.preventDefault();
    const img = e.target.fileUpload.files[0];

    if (!img) return;
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = () => {
      const fileType = img.type;
      const fileSize = img.size.toString();
      const fileName = img.name;
      const imgBase64 = reader.result as string;

      const imgObject = {
        fileName,
        fileType,
        fileSize,
        img: imgBase64,
      };

      sendData(imgObject);
      setFile(imgBase64);
    };
  };

  const sendData = async (imgObject: any) => {
    try {
      const res = await axios.post("/api/upload", imgObject, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllImage = async () => {
    try {
      const res = await axios.get("/api/upload");
      setImage(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  getAllImage();
  return (
    <main className="flex h-screen items-center justify-center flex-col">
      <form
        onSubmit={handleForm}
        action="#"
        method="post"
        className="flex flex-col gap-5 border-2 p-10 rounded-md shadow-sm"
      >
        <label
          htmlFor="fileUpload"
          className="label capitalize text-2xl font-semibold"
        >
          Upload file
        </label>
        <input
          type="file"
          name="fileUpload"
          id="fileUpload"
          className="file-input file-input-bordered w-full max-w-xs"
        />
        <input type="submit" className="btn" />
      </form>
      <>
        {allImage.map((img: any) => {
          return (
            <div className="max-w-md mt-10 border p-5 relative" key={img._id}>
              <Image
                src={img.img || "https://picsum.photos/200"}
                width={500}
                height={250}
                alt=""
              />
              <div className="absolute top-0 right-0">
                <button
                  className="btn btn-circle btn-outline btn-xs"
                  onClick={() => alert(`Delete Image ${img._id}`)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <span className="sr-only">Delete Image</span>
                </button>
              </div>
            </div>
          );
        })}
      </>
    </main>
  );
}
