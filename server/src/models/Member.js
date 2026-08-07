import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Member name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
