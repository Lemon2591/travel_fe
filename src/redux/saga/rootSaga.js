import { all } from "redux-saga/effects";
import { watchLoadingSaga } from "./loadingSaga";
import { watchUserSaga } from "./userSaga";

export default function* rootSaga() {
  yield all([watchLoadingSaga(), watchUserSaga()]);
}
