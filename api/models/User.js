const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
     firstName:{
      type:String,
      required:true,
    },
     lastName:{
      type: String,
      required: true,
     },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    birthDate: {
      type: String,
      required: true,
    },
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    likedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
); //giving an information about when its updated or created

module.exports = mongoose.model("User", UserSchema);
