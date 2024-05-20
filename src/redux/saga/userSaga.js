import { call, put, takeEvery } from "redux-saga/effects";
import { setUserReducer } from "../reducer/userReducer";
import constants from "../action/constant";
import { createAction } from "@reduxjs/toolkit";

export const userAction = createAction(constants.GET_USER);
export function* userSaga(action) {
  try {
    yield put(setUserReducer(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* watchUserSaga() {
  yield takeEvery(userAction, userSaga);
}
