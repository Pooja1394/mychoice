import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { basepath } from "../utils/Constant";
import { push, Link } from "react-router-redux";
import {
  CREATE_AUCTION_REQUEST_SUCCESS,
  CREATE_AUCTION_REQUEST_FAILURE,
  UPDATE_AUCTION_REQUEST_SUCCESS,
  UPDATE_AUCTION_REQUEST_FAILURE
} from "../actions/types";
import { Button, notification } from "antd";
import AddProductContent from "../component/AddProductContent";
const openNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description
  });
};
// function that makes the api request and returns a Promise for response
export function postData(data, url, method) {
  console.log("data...", data);
  let token = localStorage.getItem("token");
  let headers = {
    Authorization: "Bearer " + token,
    Accept: "application/json"
  };
  return axios({
    method: method,
    url: url,
    data,
    headers
  });
}

// worker saga: makes the api call when watcher saga sees the action
export function* CreateAuctionSaga(action) {
  try {
    const response = yield call(
      postData,
      action.data,
      `${basepath}auction/addAuction`,
      "post"
    );
    console.log(response);
    const data = response.data;
    console.log("response", data);
    // dispatch a success action to the store with the new data
    yield put({ type: CREATE_AUCTION_REQUEST_SUCCESS, data });
    {openNotificationWithIcon('success',"Auctions","Auction is Successfully Created")}
    action.history.push("/home/auction");
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: CREATE_AUCTION_REQUEST_FAILURE, error });
    //{openNotificationWithIcon('error',"Auctions",error)}
  }
}
export function* UpdateAuctionSaga(action) {
  try {
    const response = yield call(
      postData,
      action.data,
      `${basepath}auction/updateAuction`,
      "put"
    );
    console.log(response);
    const data = response.data;
    console.log("response", data);
    // dispatch a success action to the store with the new data
    yield put({ type: UPDATE_AUCTION_REQUEST_SUCCESS, data });
    {
      openNotificationWithIcon(
        "success",
        "Auctions",
        "Auction is Successfully Updated"
      );
    }
    action.history.push("/home/auction");
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: UPDATE_AUCTION_REQUEST_FAILURE, error });
    {
      openNotificationWithIcon("error", "Auctions", error);
    }
  }
}
