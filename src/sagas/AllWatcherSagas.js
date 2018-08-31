import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {basepath} from "../utils/Constant"
import {
   USER_API_CALL_REQUEST, 
   USER_API_CALL_SUCCESS,
   USER_API_CALL_FAILURE,
   USER_REGISTER_CALL_REQUEST, 
   User_Filter_Call_Request, 
   User_DATA_Call_Request,
   USER_PROFILE_DETAILS_CALL_REQUEST,
   USER_TABLE_CSV, 
   ADD_PRODUCT_CONTENT_REQUEST,
   ADD_PRODUCT_CATEGORY_REQUEST,
   ADD_PRODUCT_BRAND_REQUEST,
   ADD_PRODUCT_SUPPLIER_REQUEST,
   CREATE_AUCTION_REQUEST,
   UPDATE_AUCTION_REQUEST,
   AUCTION_PRODUCT_LIST_REQUEST,
   GET_SUPPLIERS_CALL_REQUEST,
   GET_BRANDS_CALL_REQUEST,
   GET_CATEGORY_CALL_REQUEST,
   GET_PRODUCTS_CALL_REQUEST,
   EDIT_PRODUCT_CATEGORY_REQUEST,
   HANDLE_CATEGORY_AUTOFILL_REQUEST,
   EDIT_PRODUCT_BRAND_REQUEST,
   EDIT_PRODUCT_SUPPLIER_REQUEST,
   EDIT_PRODUCT_CONTENT_REQUEST,
   BANK_DETAILS_FILTER_REQUEST,
   BID_PACKAGE_DATA_REQUEST,
   PRODUCT_LIST_REQUEST,
   AUCTION_LIST_FILTER_REQUEST,
   ADD_BANK_REQUEST,
   GET_LOCATION_DATA,
   UPDATE_AMOUNT_REQUEST,
   UPDATE_AMOUNT_IN_STORE,
   UPDATE_AMOUNT_IN_INPUT,
   DATA_BIDS_BY_BANK_REQUEST,
   PAYMENT_DETAILS_DATA_REQUEST,
   UPDATE_SELECT_VALUE,
   GET_REVIEW_REQUEST,
   GET_PACKAGE_REQUEST,
   GET_COUPON_PACKAGE_REQUEST,
   ADD_COUPON_PACKAGE_REQUEST,
   EDIT_BANK_REQUEST,
   ADD_REVIEW_REQUEST,
   GET_REVIEW_PERMISSION_REQUEST,
   GET_ALL_COUPONS_REQUEST,
   ADD_REVIEW_PERMISSION_REQUEST,
   ADD_COUPON_PERMISSION_REQUEST,
   GET_COUPON_PERMISSION_REQUEST,
   GET_PRIVILEGES_DATA_REQUEST,
   SET_PREVILIGES_IN_STORE_REQUEST,
   GET_DESIGNATION_DATA_REQUEST,
   SET_DESIGNATION_IN_STORE_REQUEST,
   GET_DEPARTMENT_DATA_REQUEST,
   GET_EMPLOYEES_DATA_REQUEST,
   GET_NOTIFICATION_DATA_REQUEST,
   GET_TRADE_OUT_CONTENT_REQUEST,
   GET_PAYMENT_CONTENT_REQUEST,
   GET_TRADE_STATUS_CONTENT_REQUEST,
   GET_CARRIER_DATA_REQUEST,
   GET_DELIVERY_SERVICE_DATA_REQUEST,
   GET_CUSTOMER_SERVICE_DATA_REQUEST,
   GET_DEPOSIT_REPORT_REQUEST,
   GET_TRADE_REPORT_REQUEST,
   GET_LOGS_CONTENT_REQUEST,
   SET_PRIVILIGES_AT_LOGIN,
   CONNECT_TO_WEBSOCKET,
   CREATE_NEW_USER_FOR_NOTIFICATION,
   NEW_USER_CONNECTED_REQUEST,
   NEW_USER_CONNECTED_SUCCESS,
   USER_DISCONNECTED_REQUEST,
   USER_DISCONNECTED_SUCCESS,
   EMPLOYEE_CONNECTED_REQUEST,
   EMPLOYEE_CONNECTED_SUCCESS,
   EMPLOYEE_DISCONNECTED_REQUEST,
   EMPLOYEE_DISCONNECTED_SUCCESS,
   CHANGE_USER_STATUS
  } from "../actions/types";
import { CreateUserWorkerSaga } from "./CreateUserSagas";
import { FilterSaga } from "./FilterSaga";
import { UserListWorkerSaga } from "./UserListWorkerSaga";
import { UserProfileDetailsSaga } from "./UserProfileDetailsSaga";
import {UsertablecsvSaga} from "./UsertablecsvSaga";
import {CreateAuctionSaga} from './CreateAuctionSaga';
import {UpdateAuctionSaga} from './CreateAuctionSaga';
import {AuctionProductListSaga, AuctionProductListFilterSaga} from './AuctionProductListSaga';
import {ProductListSaga} from './ProductListSaga';
//import {AuctionProductListFilterSaga} from './AuctionProductListFilterSaga';
import {notification,message} from 'antd'
import {BankListSaga} from './BankListSaga';
import {BidPackageListSaga} from './BidPackageListSaga';
import {AddBankSaga,EditBankSaga} from './AddBankSaga'
import {BidsByBankSaga} from './BidsByBankSaga'
import {PaymentDetailsSaga} from './PaymentDetailsSaga'
import {UpdateAmountSaga,updateAmountInStore,updateAmountInInput,updateSelectInInput} from "./UpdateAmountSaga"
import {webConnection } from '../websocket';

//------------------------------->Product Management<-----------------------------------//
import { GetProductsListSaga } from "../sagas/Product Management/GetProductsListSaga";
import { GetCategoryListSaga } from "../sagas/Product Management/GetCategoryListSaga";
import { GetBrandsListSaga } from "../sagas/Product Management/GetBrandsListSaga";
import { GetSuppliersListSaga,GetLocationDataSaga } from "../sagas/Product Management/GetSuppliersListSaga";
import {AddProductContentSaga,EditProductContentSaga,HandleCategoryAutofillSaga} from "../sagas/Product Management/AddProductContentSaga"
import {AddProductCategoryWorkerSaga,EditProductCategoryWorkerSaga} from "../sagas/Product Management/AddProductCategorySaga"
import {AddProductBrandSaga,EditProductBrandSaga} from "../sagas/Product Management/AddProductBrandSaga"
import {AddProductSupplierSaga,EditProductSupplierSaga} from "../sagas/Product Management/AddProductSupplierSaga"

//------------------------------->Coupon Management<-----------------------------------//
import { GetCouponPackageSaga} from '../sagas/Coupon Management/GetCouponPackageSaga';
import { AddCouponPackageSaga} from '../sagas/Coupon Management/AddCouponPackageSaga'
import { GetCouponsSaga } from '../sagas/Coupon Management/GetCouponsSaga'
import { AddCouponPermissionSaga} from '../sagas/Coupon Management/AddCouponPermissionSaga'
import { GetCouponPermissionSaga} from '../sagas/Coupon Management/GetCouponPermissionSaga'

//-------------------------------->Trade Exchange Management<----------------------------------//
import {GetTradeOutSaga} from "../sagas/Trade Exchange/GetTradeOutSaga"
import {GetPaymentContentSaga} from "../sagas/Trade Exchange/GetPaymentContentSaga"
import {GetTradeStatusSaga} from "../sagas/Trade Exchange/GetTradeStatusSaga"


//-------------------------------->Logs Management<----------------------------------//
import {GetLogsContentSaga} from "../sagas/Logs Management/GetLogsContentSaga"

//-------------------------------->Reports Management<----------------------------------//
import {GetDepositReportSaga} from "../sagas/Reports Management/GetDepositReportSaga";
import {GetTradeReportSaga} from "../sagas/Reports Management/GetTradeReportSaga"



//-------------------------------->Review Management<----------------------------------//
import { GetReviewSaga} from '../sagas/Review Management/GetReviewSaga'
import { AddReviewSaga} from '../sagas/Review Management/AddReviewSaga'
import { GetPackageSaga} from '../sagas/Review Management/GetPackageSaga'
import { AddReviewPermissionSaga} from '../sagas/Review Management/AddReviewPermissionSaga'
import { GetReviewPermissionSaga} from '../sagas/Review Management/GetReviewPermissionSaga'

import {PrivilegesContentSaga, SetPreviliges} from "./Employee Management/PrivilegesContentSaga"
import {DesignationContentSaga, SetDesignation} from "./Employee Management/DesignationContentSaga"
import {DepartmentContentSaga} from "./Employee Management/DepartmentContentSaga"
import {EmployeeContentSaga} from "./Employee Management/EmployeeContentSaga"

import {NotificationSaga} from "./NotificationSaga"
import {WebSocketNotificationSaga} from "./WebSocketNotificationSaga"
import {CarrierSaga} from "./Delivery Management/CarrierSaga"
import {DeliverySaga} from "./Delivery Management/DeliverySaga"
import {CustomerServiceSaga} from "./Delivery Management/CustomerServiceSaga"
import {setPrivilegeAtLoginSaga} from "./setPrivilegeAtLoginSaga"

import {OnlineUserSaga,EmployeeConnectSaga,UserDisSaga,EmployeeDisSaga,changeUserStatus} from "./OnlineUserSaga"

var base64 = require('base-64');
const openNotificationWithIcon = (type,notimsg,notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc,
  });
};

// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSaga() {
  yield takeLatest(USER_API_CALL_REQUEST, LoginWorkerSaga);
  yield takeLatest(User_DATA_Call_Request,UserListWorkerSaga);
  yield takeLatest(USER_REGISTER_CALL_REQUEST, CreateUserWorkerSaga);
  yield takeLatest(User_Filter_Call_Request, FilterSaga);
  yield takeLatest(USER_PROFILE_DETAILS_CALL_REQUEST,UserProfileDetailsSaga)
  yield takeLatest(USER_TABLE_CSV,UsertablecsvSaga)
  //////////////////

  yield takeLatest(ADD_PRODUCT_CONTENT_REQUEST,AddProductContentSaga)
  yield takeLatest(HANDLE_CATEGORY_AUTOFILL_REQUEST,HandleCategoryAutofillSaga)
  yield takeLatest(EDIT_PRODUCT_CONTENT_REQUEST,EditProductContentSaga)
  yield takeLatest(ADD_PRODUCT_CATEGORY_REQUEST,AddProductCategoryWorkerSaga)
  yield takeLatest(EDIT_PRODUCT_CATEGORY_REQUEST,EditProductCategoryWorkerSaga)
  yield takeLatest(GET_PRODUCTS_CALL_REQUEST,GetProductsListSaga)
  yield takeLatest(GET_CATEGORY_CALL_REQUEST,GetCategoryListSaga)
  yield takeLatest(GET_BRANDS_CALL_REQUEST,GetBrandsListSaga)
  yield takeLatest(GET_SUPPLIERS_CALL_REQUEST,GetSuppliersListSaga)
  yield takeLatest(ADD_PRODUCT_BRAND_REQUEST,AddProductBrandSaga)
  yield takeLatest(EDIT_PRODUCT_BRAND_REQUEST,EditProductBrandSaga)
  yield takeLatest(ADD_PRODUCT_SUPPLIER_REQUEST,AddProductSupplierSaga)
  yield takeLatest(EDIT_PRODUCT_SUPPLIER_REQUEST,EditProductSupplierSaga)
  yield takeLatest(GET_LOCATION_DATA,GetLocationDataSaga)

  //---------------------------AUCTION MANAGEMENT--------------------------------------//////////
  
  
  yield takeLatest(CREATE_AUCTION_REQUEST,CreateAuctionSaga)
  yield takeLatest(UPDATE_AUCTION_REQUEST,UpdateAuctionSaga)
  yield takeLatest(AUCTION_PRODUCT_LIST_REQUEST,AuctionProductListSaga)


  //--------------------------------DEPOSIT AND CREDIT--------------------------------//////////
  yield takeLatest(BANK_DETAILS_FILTER_REQUEST,BankListSaga)
  yield takeLatest(BID_PACKAGE_DATA_REQUEST,BidPackageListSaga)
  yield takeLatest(PRODUCT_LIST_REQUEST,ProductListSaga)
  yield takeLatest(AUCTION_LIST_FILTER_REQUEST,AuctionProductListFilterSaga)
  yield takeLatest(ADD_BANK_REQUEST,AddBankSaga);
  yield takeLatest(UPDATE_AMOUNT_REQUEST,UpdateAmountSaga)
  yield takeLatest(UPDATE_AMOUNT_IN_STORE,updateAmountInStore)
  yield takeLatest(UPDATE_AMOUNT_IN_INPUT,updateAmountInInput);
  yield takeLatest(DATA_BIDS_BY_BANK_REQUEST,BidsByBankSaga);
  yield takeLatest(PAYMENT_DETAILS_DATA_REQUEST,PaymentDetailsSaga);
  yield takeLatest(UPDATE_SELECT_VALUE,updateSelectInInput)
  yield takeLatest(EDIT_BANK_REQUEST,EditBankSaga)
 
 
 
  //---------------------------------COUPON MANAGEMENT-------------------------------//////////
  yield takeLatest(GET_COUPON_PACKAGE_REQUEST,GetCouponPackageSaga)
  yield takeLatest(ADD_COUPON_PACKAGE_REQUEST,AddCouponPackageSaga)
  yield takeLatest(ADD_COUPON_PERMISSION_REQUEST,AddCouponPermissionSaga)
  yield takeLatest(GET_COUPON_PERMISSION_REQUEST,GetCouponPermissionSaga)
  yield takeLatest(GET_ALL_COUPONS_REQUEST,GetCouponsSaga)
  


  //------------------------------TRADE EXCHANGE MANAGEMENT---------------------//////////
  yield takeLatest(GET_TRADE_OUT_CONTENT_REQUEST,GetTradeOutSaga)
  yield takeLatest(GET_PAYMENT_CONTENT_REQUEST,GetPaymentContentSaga)
  yield takeLatest(GET_TRADE_STATUS_CONTENT_REQUEST,GetTradeStatusSaga)
  
  
  //-------------------------------------LOGS MANAGEMENT------------------------------//////////
  yield takeLatest(GET_LOGS_CONTENT_REQUEST,GetLogsContentSaga)


  //-------------------------------------REPORTS MANAGEMENT------------------------------//////////
  yield takeLatest(GET_DEPOSIT_REPORT_REQUEST,GetDepositReportSaga)
  yield takeLatest(GET_TRADE_REPORT_REQUEST,GetTradeReportSaga)


  
  //-------------------------------------REVIEWS MANAGEMENT------------------------------//////////
  yield takeLatest(GET_REVIEW_REQUEST,GetReviewSaga)
  yield takeLatest(ADD_REVIEW_REQUEST,AddReviewSaga)
  yield takeLatest(GET_PACKAGE_REQUEST,GetPackageSaga)
  yield takeLatest(GET_REVIEW_PERMISSION_REQUEST,GetReviewPermissionSaga)
  yield takeLatest(ADD_REVIEW_PERMISSION_REQUEST,AddReviewPermissionSaga)

  
  //-------------------------------------Employee MANAGEMENT------------------------------//////////
  yield takeLatest(GET_PRIVILEGES_DATA_REQUEST,PrivilegesContentSaga)
  yield takeLatest(SET_PREVILIGES_IN_STORE_REQUEST,SetPreviliges)
  yield takeLatest(GET_DESIGNATION_DATA_REQUEST,DesignationContentSaga)
  yield takeLatest(SET_DESIGNATION_IN_STORE_REQUEST,SetDesignation)
  yield takeLatest(GET_DEPARTMENT_DATA_REQUEST,DepartmentContentSaga)
  yield takeLatest(GET_EMPLOYEES_DATA_REQUEST,EmployeeContentSaga)


  yield takeLatest(GET_NOTIFICATION_DATA_REQUEST,NotificationSaga)

  //-------------------------------------Delivery MANAGEMENT------------------------------//////////
  yield takeLatest(GET_CARRIER_DATA_REQUEST,CarrierSaga)
  yield takeLatest(GET_DELIVERY_SERVICE_DATA_REQUEST,DeliverySaga)
  yield takeLatest(GET_CUSTOMER_SERVICE_DATA_REQUEST,CustomerServiceSaga)

  yield takeLatest(SET_PRIVILIGES_AT_LOGIN,setPrivilegeAtLoginSaga)

  //-------------------------------------Web Socket------------------------------//////////
  yield takeLatest(CONNECT_TO_WEBSOCKET,webConnection)
  yield takeLatest(CHANGE_USER_STATUS,changeUserStatus)
  yield takeLatest(CREATE_NEW_USER_FOR_NOTIFICATION,WebSocketNotificationSaga)
  yield takeLatest(NEW_USER_CONNECTED_REQUEST,OnlineUserSaga)
  yield takeLatest(EMPLOYEE_CONNECTED_REQUEST,EmployeeConnectSaga)
  yield takeLatest(USER_DISCONNECTED_REQUEST,UserDisSaga)
  yield takeLatest(EMPLOYEE_DISCONNECTED_REQUEST,EmployeeDisSaga)


  
}
  
  
  // function that makes the api request and returns a Promise for response
export function fetchData(data) {
var encodedString=base64.encode(data.email.toLowerCase() + ':' + data.password);
  return axios({
    method: "get",
    url: basepath+"admin/login",
     data,
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic'+ encodedString
    }
 
  });
 
}
  
// worker saga: makes the api call when watcher saga sees the action
function* LoginWorkerSaga(action) {
  try {
    const response = yield call(fetchData,action.data);
    const data = response.data;
    localStorage.setItem("token", data.token);
    localStorage.setItem("name",data.userName);
    localStorage.setItem("email",data.email);
    if(data.picture)
    localStorage.setItem("picture",data.picture);
    else
    localStorage.setItem("picture",data.img);
    data.employeeId?localStorage.setItem("userId",data.employeeId):localStorage.setItem("userId",data.userId)
    localStorage.setItem("bidPrice",data.bidSellingPrice);
    // dispatch a success action to the store with the new data
    yield put({ type: USER_API_CALL_SUCCESS, data });
   
    if(data.Privileges)
    {
      localStorage.setItem("privileges",JSON.stringify(data.Privileges.privilege))
      action.data.history.replace("/home/dash");
     
    }
   
    else  
     action.data.history.replace("/home/user");
    //openNotificationWithIcon('sucess','Login Success','Welcome Admin!');
  } catch (error) {
    // dispatch a failure action to the store with the error
    if(error.response.status==500)
    {message.error("Internal Server Error", 2);}
    else if(error.response.status==404||401)
    message.error(error.response.data.msg, 2);
    
    yield put({ type: USER_API_CALL_FAILURE, error })
    
  }
}