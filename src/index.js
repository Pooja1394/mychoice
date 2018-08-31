import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { watcherSaga } from "./sagas/AllWatcherSagas";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { reducer } from "./redux";
import { Provider } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

let store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(watcherSaga);

ReactDOM.render(
<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
