const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  post: {
    type: String,
    required: true,
  },
  upVotes: {
    type: [
      {
        voterId: {
          type: String,
          required: true,
        },
        voterName: {
          type: String,
          required: true,
        },
        isDisabled: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  downVotes: {
    type: [
      {
        voterId: {
          type: String,
          required: true,
        },
        voterName: {
          type: String,
          required: true,
        },
        isDisabled: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  comments: {
    type: [
      {
        commenterId: {
          type: String,
          required: true,
        },
        commenterName: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        isDisabled: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
  isDisabled: {
    type: Boolean,
    required: true,
  },
});
postSchema.plugin(uniqueValidator);
const Post = mongoose.model("post", postSchema);
module.exports.Post = Post;
