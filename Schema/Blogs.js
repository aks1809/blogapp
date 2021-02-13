import mongoose from "mongoose";

const BlogsSchema = mongoose.Schema({
  type: Number,
  title: String,
  desc: String,
  image: String,
});

export default mongoose.model("blogs", BlogsSchema);
