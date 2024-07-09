import mongoose, { Schema } from "mongoose";

const uploadSchema = new Schema({
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  fileSize: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Upload = mongoose.models.Upload || mongoose.model("Upload", uploadSchema);

export default Upload;
