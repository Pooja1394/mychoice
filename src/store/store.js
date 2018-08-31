
import { reducer }   from "../reducers/UserReducer";
import {createStore,applyMiddleware} from 'redux'   
import logger from 'redux-logger';
import {watcherSaga} from "../sagas/AllWatcherSagas"
import {websocketSagas} from "../sagas/websocketSagas";
import createSagaMiddleware from "redux-saga";
import {socketMiddleware} from '../websocket';
import handleNewMessage from '../sagas/websocketSagas'
const sagaMiddleware = createSagaMiddleware();

const store=createStore(reducer,applyMiddleware(logger,sagaMiddleware)); 

const socket = socketMiddleware(store.dispatch, store);

sagaMiddleware.run(handleNewMessage, { socket, store })
sagaMiddleware.run(watcherSaga);

export default store;
