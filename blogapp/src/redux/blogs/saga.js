import { all, takeEvery, put, fork } from "redux-saga/effects";
import actions from "./actions";
import axios from "axios";

export function* fetchBlogs() {
  yield takeEvery(actions.FETCH_BLOGS_START, function* (type) {
    const data = yield axios
      .get(`/auth/blogs/${type.payload}`)
      .then((res) => res.data);
    console.log(data);
    yield put({
      type: actions.FETCH_BLOGS_SUCCESS,
      payload: {
        loading: false,
        data: data,
      },
    });
  });
}
export default function* rootSaga() {
  yield all([fork(fetchBlogs)]);
}
