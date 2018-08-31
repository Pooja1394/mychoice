import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {push} from 'react-router-redux'
import { DATA_BIDS_BY_BANK_SUCCESS, DATA_BIDS_BY_BANK_FAILURE } from "../actions/types";

//function that makes the api request and returns a Promise for response
export function getData(data) {
  console.log("dattttaaaa",data)
  let token=localStorage.getItem("token")
  
  let headers={
    'Authorization':'Bearer '+token,
    'Accept': 'application/json',
  }
  return axios({
    method: "post",
    headers:headers,
    data:data,
    url: basepath+`buybank/buybidlist`+'?limit='+data.limit+'&page='+data.page+'&filtername='+data.filterName+'&filterData='+data.filterData,
    });
}
  
// worker saga: makes the api call when watcher saga sees the action
export function* BidsByBankSaga(action) {
  try {
    const response = yield call(getData,action.data);
    const data = response.data;
    console.log("response in userlist-------",response.data);
    // dispatch a success action to the store with the new data
    yield put({ type:DATA_BIDS_BY_BANK_SUCCESS, data });
   
    
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: DATA_BIDS_BY_BANK_FAILURE, error })
    
    alert(error);
    
  }
}
