import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },

    issueDate: {
      type: Date,
      required: true
    },

    dueDate: {
      type: Date,
      required: true
    },

    returned: {
      type: Boolean,
      default: false
    },

    returnDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Issue = mongoose.model("Issue", issueSchema);

export default Issue;