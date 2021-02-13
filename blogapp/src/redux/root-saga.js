import { all } from "redux-saga/effects";
import authSaga from "./auth/saga";
import blogsSaga from "./blogs/saga";

export default function* rootSaga() {
  yield all([authSaga(), blogsSaga()]);
}
