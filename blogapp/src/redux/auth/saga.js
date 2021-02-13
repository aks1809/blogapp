import { all, takeEvery, put, fork } from "redux-saga/effects";
import { createBrowserHistory } from "history";
import actions from "./actions";
import axios from "axios";

const history = createBrowserHistory();

const clearToken = () => {
  localStorage.removeItem("id_token");
  localStorage.removeItem("name");
};

const getToken = () => {
  try {
    const idToken = localStorage.getItem("id_token");
    const name = localStorage.getItem("name");
    return { idToken, name };
  } catch (err) {
    clearToken();
    return null;
  }
};

export function* loginRequest() {
  yield takeEvery("LOGIN_REQUEST", function* () {
    const data = yield axios.get("/auth/user").then((res) => res.data);
    if (data.id) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: data.id,
        profile: data.name,
      });
    } else {
      yield put({ type: actions.LOGIN_ERROR });
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield localStorage.setItem("id_token", payload.token);
    yield localStorage.setItem("name", payload.profile);
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    yield axios.get("/auth/logout");
    yield clearToken();
    history.push("/");
  });
}
export function* checkAuthorization() {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const profile = getToken();
    if (profile.token) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        token: profile.token,
        profile: profile.name,
      });
    }
  });
}
export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
