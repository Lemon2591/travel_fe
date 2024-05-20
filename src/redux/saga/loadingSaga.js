import { put, takeEvery } from "redux-saga/effects";
import {
  setLoadingReducer,
  setLoadingElementReducer,
} from "../reducer/loadingReducer";

import constants from "../action/constant";
import { createAction } from "@reduxjs/toolkit";

export const loadingAction = createAction(constants.HANDLE_LOADING);
export const loadingElementAction = createAction(
  constants.HANDLE_LOADING_ELEMENT
);

export function* loadingSaga(action) {
  try {
    yield put(setLoadingReducer(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* loadingElementSaga(action) {
  try {
    yield put(setLoadingElementReducer(action.payload));
  } catch (error) {
    console.log(error);
  }
}

export function* watchLoadingSaga() {
  yield takeEvery(loadingAction, loadingSaga);
  yield takeEvery(loadingElementAction, loadingElementSaga);
}
