import { takeEvery, takeLatest } from 'redux-saga/effects'
import {
  WEB_SOCKET_CONNECT_SUCCESS,
  NEW_ONLINE_USERS,
  WEBSOCKET_MESSAGE_RECEIVED,
  ONLINE_USERS,
  GET_PRODUCT_DETAIL
} from '../actions/types';
import {socket} from '../websocket';

const handleNewMessage = function* handleNewMessage(params) {
  // if(socket){
    yield takeLatest(GET_PRODUCT_DETAIL,(action)=>{
      socket.send(JSON.stringify({type:'AUCTION_COMPLETE_DETAIL','auctionId':'5b489f897bda7e13283e11c0'}))
    })
    yield takeLatest(ONLINE_USERS,(action)=>{
      socket.send(JSON.stringify({ type: action.type}))
    })
    yield takeLatest(WEB_SOCKET_CONNECT_SUCCESS, (action) => {
      socket.send(JSON.stringify({ type: 'NEW_MESSAGE', data: 'connection stablish' }))
    })
    yield takeLatest(NEW_ONLINE_USERS, (action) => {
      socket.send(JSON.stringify({ type: 'NEW_MESSAGE', data: 'get Online users' }))
    })
    yield takeLatest(WEBSOCKET_MESSAGE_RECEIVED, (action) => {
      socket.send(JSON.stringify({ type: 'NEW_MESSAGE', data: 'get new messages' }))
    })
  // }
}

export default handleNewMessage