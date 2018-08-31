import { takeLatest, call, put } from "redux-saga/effects";
import { 
    NEW_USER_CONNECTED_SUCCESS,
    EMPLOYEE_CONNECTED_SUCCESS,
    USER_DISCONNECTED_SUCCESS,
    EMPLOYEE_DISCONNECTED_SUCCESS,
    CHANGE_USER_STATUS_SUCCESS
  } from "../actions/types";

export function* changeUserStatus(action){
    yield put({
        type:CHANGE_USER_STATUS_SUCCESS,
        data:action.data
    })
}

export function* OnlineUserSaga(action){
    yield put({
        type:NEW_USER_CONNECTED_SUCCESS,
        data:action.data
    })
}

export function* EmployeeConnectSaga(action){
  yield put({
      type:EMPLOYEE_CONNECTED_SUCCESS,
      data:action.data
  })
}


export function* UserDisSaga(action){
  yield put({
      type:USER_DISCONNECTED_SUCCESS,
      data:action.data
  })
}


export function* EmployeeDisSaga(action){
    console.log("EmployeeDisSaga----->",action)
    yield put({
        type:EMPLOYEE_DISCONNECTED_SUCCESS,
        data:action.data
    })
  }