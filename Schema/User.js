import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  id: String,
  name: String,
  picture: String,
});

export default mongoose.model("users", UserSchema);
