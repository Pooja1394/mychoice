import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import {openNotificationWithIcon} from "../utils/Method"
import { CREATE_NEW_USER_FOR_NOTIFICATION_SUCCESS } from "../actions/types";

  
// worker saga: makes the api call when watcher saga sees the action
export function* WebSocketNotificationSaga(action) {
  try {
    // dispatch a success action to the store with the new data
    yield put({ type: CREATE_NEW_USER_FOR_NOTIFICATION_SUCCESS });
  } catch (error) {
    // dispatch a failure action to the store with the error
    alert(error);
    
  }
}
