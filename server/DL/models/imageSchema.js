import mongoose from "mongoose";

export const imageSchema = new mongoose.Schema({
    image_public_id: {
      type: String,
    },
    image_url: {
      type: String,
      required: true,
    },
  });