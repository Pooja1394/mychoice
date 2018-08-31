import {
    WEB_SOCKET_CONNECT_SUCCESS,
    WEBSOCKET_MESSAGE_RECEIVED,
    NEW_ONLINE_USERS,
    CREATE_NEW_USER_FOR_NOTIFICATION,
    NEW_USER_CONNECTED_REQUEST,
    USER_DISCONNECTED_REQUEST,
    EMPLOYEE_CONNECTED_REQUEST,
    EMPLOYEE_DISCONNECTED_REQUEST,
    CHANGE_USER_STATUS,
    CONNECT_TO_WEBSOCKET
} from './actions/types';
import store from './store/store';

export let socket = null;

export function webConnection(data) {
    console.log("socket data------>",data);
    let wsUrl = "wss://apimychoice.sia.co.in/ws?id=" + data.id;
    // let wsUrl = "ws://localhost:5001?id=5b3c72c9d47e7e340efa9efa";
    socket = new WebSocket(wsUrl);
    socketMiddleware(store.dispatch, store);
}

export function socketMiddleware(dispatch, store) {
    if (socket) {
        socket.onopen = () => {
            dispatch({ type: WEB_SOCKET_CONNECT_SUCCESS, data: '' })
        }
        socket.onmessage = (ws) => {
            let onLine=store.getState().online;
            let interval=setTimeout(() => {
                socket.send(JSON.stringify({ type: 'HEART_BEAT', data: 'alive' }))
                if(localStorage.getItem("email")==null){
                    clearInterval(interval);
                    socket.close();
                }
                if(onLine!=window.navigator.onLine){
                    onLine=window.navigator.onLine;
                    dispatch({ type: CHANGE_USER_STATUS, data: window.navigator.onLine })
                }
            }, 5000);
            let res = JSON.parse(ws.data);
            switch (res.type) {
                case "ONLINE_USERS":
                    //dispatch({ type: NEW_ONLINE_USERS, data: res.data })
                    break;

                case "CONNECTED":
                    dispatch({ type: WEB_SOCKET_CONNECT_SUCCESS, data: res.data })
                    break;

                case "NEW_MESSAGE":
                    dispatch({ type: WEBSOCKET_MESSAGE_RECEIVED, data: res.data })
                    break;
                case "NEW_CONNECTING_USER":{
                    if(res.data.type=='user'){
                        dispatch({ type: NEW_USER_CONNECTED_REQUEST, data: res.data })
                        break;
                    }else{
                        dispatch({ type: EMPLOYEE_CONNECTED_REQUEST, data: res.data })
                        break;    
                    }
                }
                   
                case "ClOSE_CONNECTION":{
                    if(res.data && res.data.type)
                    if(res.data.type=="employee"||res.data.type=='admin'){
                        console.log("in adminclose")
                        dispatch({ type: EMPLOYEE_DISCONNECTED_REQUEST, data: res.data })
                        break;
                    }else{
                        dispatch({ type: USER_DISCONNECTED_REQUEST, data: res.data })
                        break;    
                    }  
                }
                   
                case "CREATE_NEW_USER":
                dispatch({type:CREATE_NEW_USER_FOR_NOTIFICATION,data:res.data})
                break;

                // case "GET_OPENING_AUCTIONS":console.log("GET_OPENING_AUCTIONS------>",res);
                default:
                    break;
            }

        }
        socket.onclose = (err) => {
            let userId=localStorage.getItem('userId');
            userId && dispatch({type:CONNECT_TO_WEBSOCKET,id:userId})
        }
        socket.onerror = (err) => {
            console.log("socket err---->",err);
        }
        return socket
    }
};

// export socketMiddleware;
