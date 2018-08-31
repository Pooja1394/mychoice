import { SET_PRIVILIGES_AT_LOGIN, SET_PRIVILIGES_AT_LOGIN_SUCCESS } from "../actions/types";
import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";


export function* setPrivilegeAtLoginSaga(action) {
    
      // dispatch a success action to the store with the new data
      yield put({ type: SET_PRIVILIGES_AT_LOGIN_SUCCESS,data:action.data });
      //{openNotificationWithIcon('success',"User Registration","product List is Successfully Done.")}
      //action.history.push('/home/auction');
     
  }