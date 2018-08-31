import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { basepath } from "../../utils/Constant";
import { push } from "react-router-redux";
import {
  ADD_COUPON_PERMISSION_REQUEST,
  ADD_COUPON_PERMISSION_SUCCESS,
  ADD_COUPON_PERMISSION_FAILURE
} from "../../actions/types";
import { openNotificationWithIcon } from "../../utils/Method";
// function that makes the api request and returns a Promise for response
export function postData(data, url) {
  let headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    Accept: "application/json"
  };
  return axios({
    method: "post",
    url: url,
    data,
    headers: headers
  });
}

// worker saga: makes the api call when watcher saga sees the action
export function* AddCouponPermissionSaga(action) {
  console.log("data=====", action.data);
  try {
    const response = yield call(
      postData,
      action.data,
      `${basepath}permission/createCouponPermission `
    );
    const data = response.data;
    // dispatch a success action to the store with the new data
    yield put({ type: ADD_COUPON_PERMISSION_SUCCESS, data });
    openNotificationWithIcon(
      "success",
      "Add Permission",
      "Permission added successfully"
    );
    action.history.push("/home/coupons/permissions");
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: ADD_COUPON_PERMISSION_FAILURE, error });
    alert(error);
  }
}
