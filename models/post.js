const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    posterId: { type: String, required: true },
    message: { type: String, required: true },
    imageUrl: { type: String },
    usersLiked: {
      type: [String]
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("post", postSchema);
