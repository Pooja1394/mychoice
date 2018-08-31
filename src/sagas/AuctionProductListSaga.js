import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import { basepath } from "../utils/Constant";
import { push, Link } from "react-router-redux";
import {
  AUCTION_PRODUCT_LIST_REQUEST_SUCCESS,
  AUCTION_PRODUCT_LIST_REQUEST_FAILURE,
  AUCTION_LIST_FILTER_REQUEST_SUCCESS,
  AUCTION_LIST_FILTER_REQUEST_FAILURE
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
export function postData(data, url) {
  let token = localStorage.getItem("token");
  let headers = {
    Authorization: "Bearer " + token,
    Accept: "application/json"
  };
  console.log("data...", data);
  return axios({
    method: "get",
    url: url,
    data,
    headers
  });
}

// worker saga: makes the api call when watcher saga sees the action
export function* AuctionProductListSaga(action) {
  try {
    const response = yield call(
      postData,
      action.data,
      `${basepath}auction/getAuction`
    );
    console.log(response);
    const data = response.data;
    console.log("response", data);
    // dispatch a success action to the store with the new data
    yield put({ type: AUCTION_PRODUCT_LIST_REQUEST_SUCCESS, data });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: AUCTION_PRODUCT_LIST_REQUEST_FAILURE, error });
    //{openNotificationWithIcon('error',"User Registration",error)}
  }
}

//auction filter post api-----------------------------*/
export function auctionfilterpostData(data, url) {
  let token = localStorage.getItem("token");
  let headers = {
    Authorization: "Bearer " + token,
    Accept: "application/json"
  };
  console.log("data...", data);
  return axios({
    method: "post",
    url: url + "?limit=" + data.limit + "&page=" + data.page,
    data,
    headers
  });
}

// worker saga: makes the api call when watcher saga sees the action
export function* AuctionProductListFilterSaga(action) {
  try {
    const response = yield call(
      auctionfilterpostData,
      action.data,
      `${basepath}auction/auctionList`
    );
    console.log(response);
    const data = response.data;
    console.log("response", data);
    // dispatch a success action to the store with the new data
    yield put({ type: AUCTION_LIST_FILTER_REQUEST_SUCCESS, data });
    // {openNotificationWithIcon('success',"User Registration","Auction producted List is Successfully Done.")}
    //action.history.push('/home/auction');
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: AUCTION_LIST_FILTER_REQUEST_FAILURE, error });
    //{openNotificationWithIcon('error',"User Registration",error)}
  }
}
