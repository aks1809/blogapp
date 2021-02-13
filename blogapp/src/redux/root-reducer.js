import { combineReducers } from "redux";
import Auth from "./auth/reducer";
import Blogs from "./blogs/reducer";

export default combineReducers({
  Auth,
  Blogs,
});
