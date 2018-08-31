import { 
    USER_API_CALL_REQUEST,
    USER_API_CALL_SUCCESS ,
    USER_REGISTER_CALL_REQUEST, 
    User_Filter_Call_Request, 
    User_DATA_Call_Request, 
    User_DATA_Call_SUCCESS, 
    User_Filter_Call_SUCCESS, 
    USER_PROFILE_DETAILS_CALL_SUCCESS, 
    USER_API_CALL_FAILURE, 
    USER_TABLE_SUCCESS, 
    AUCTION_PRODUCT_LIST_REQUEST,
    AUCTION_PRODUCT_LIST_REQUEST_SUCCESS,
    AUCTION_PRODUCT_LIST_REQUEST_FAILURE,
    GET_BRANDS_CALL_REQUEST,
    GET_BRANDS_CALL_FAILURE,
    GET_BRANDS_CALL_SUCCESS,
    GET_CATEGORY_CALL_REQUEST,
    GET_CATEGORY_CALL_SUCCESS,
    GET_CATEGORY_CALL_FAILURE,
    GET_PRODUCTS_CALL_REQUEST,
    GET_PRODUCTS_CALL_SUCCESS,
    GET_PRODUCTS_CALL_FAILURE,
    GET_SUPPLIERS_CALL_REQUEST,
    GET_SUPPLIERS_CALL_SUCCESS,
    GET_SUPPLIERS_CALL_FAILURE,
    GET_LOCATION_DATA_SUCCESS,
    GET_LOCATION_DATA_FAILURE,
    ADD_PRODUCT_CONTENT_REQUEST,
    EDIT_PRODUCT_CONTENT_REQUEST,
    ADD_PRODUCT_SUPPLIER_REQUEST,
    ADD_PRODUCT_BRAND_REQUEST,
    ADD_PRODUCT_CATEGORY_REQUEST,
    EDIT_PRODUCT_SUPPLIER_REQUEST,
    EDIT_PRODUCT_BRAND_REQUEST,
    EDIT_PRODUCT_CATEGORY_REQUEST,
    REQUEST_SUCCESS,
    REQUEST_FAILURE,
    PRODUCT_LIST_REQUEST_SUCCESS,
    PRODUCT_LIST_REQUEST_FAILURE,
    PRODUCT_LIST_REQUEST,
    AUCTION_LIST_FILTER_REQUEST_SUCCESS,
    AUCTION_LIST_FILTER_REQUEST_FAILURE,
    AUCTION_LIST_FILTER_REQUEST,
    User_DATA_Call_FAILURE,
    BANK_DETAILS_FILTER_SUCCESS,
    BID_PACKAGE_DATA_SUCCESS,
    BANK_DETAILS_FILTER_REQUEST,
    BID_PACKAGE_DATA_REQUEST,
    UPDATE_AMOUNT_SUCCESS,
    UPDATE_AMOUNT_IN_STORE_SUCCESS,
    UPDATE_AMOUNT_IN_INPUT_SUCCESS,
    DATA_BIDS_BY_BANK_REQUEST,
    DATA_BIDS_BY_BANK_SUCCESS,
    DATA_BIDS_BY_BANK_FAILURE,
    CATEGORY_AUTOFILL_SUCCESS,
    PAYMENT_DETAILS_DATA_SUCCESS,
    UPDATE_SELECT_VALUE_SUCCESS,
    ADD_CATEGORY_REQUEST_SUCCESS,
    PAYMENT_DETAILS_DATA_REQUEST,
    GET_REVIEW_REQUEST,
    GET_REVIEW_SUCCESS,
    GET_REVIEW_FAILURE,
    GET_PACKAGE_REQUEST,
    GET_PACKAGE_SUCCESS,
    GET_PACKAGE_FAILURE,
    GET_REVIEW_PERMISSION_REQUEST,
    GET_REVIEW_PERMISSION_SUCCESS,
    GET_REVIEW_PERMISSION_FAILURE,
    GET_DEPOSIT_REPORT_REQUEST,
    GET_DEPOSIT_REPORT_SUCCESS,
    GET_DEPOSIT_REPORT_FAILURE,
    GET_TRADE_REPORT_REQUEST,
    GET_TRADE_REPORT_SUCCESS,
    GET_TRADE_REPORT_FAILURE,
    GET_COUPON_PERMISSION_REQUEST,
    GET_COUPON_PERMISSION_SUCCESS,
    GET_COUPON_PERMISSION_FAILURE,
    GET_COUPON_PACKAGE_REQUEST,
    GET_COUPON_PACKAGE_SUCCESS,
    GET_COUPON_PACKAGE_FAILURE,
    GET_ALL_COUPONS_SUCCESS,
    GET_PRIVILEGES_DATA_SUCCESS,
    SET_PREVILIGES_IN_STORE_SUCCESS,
    GET_DESIGNATION_DATA_SUCCESS,
    SET_DESIGNATION_IN_STORE_SUCCESS,
    GET_DEPARTMENT_DATA_SUCCESS,
    GET_DEPARTMENT_DATA_REQUEST,
    GET_PRIVILEGES_DATA_REQUEST,
    GET_DESIGNATION_DATA_REQUEST,
    GET_EMPLOYEES_DATA_SUCCESS,
    GET_EMPLOYEES_DATA_REQUEST,
    GET_NOTIFICATION_DATA_SUCCESS,
    GET_NOTIFICATION_DATA_REQUEST,
    GET_TRADE_OUT_CONTENT_REQUEST,
    GET_TRADE_OUT_CONTENT_SUCCESS,
    GET_TRADE_OUT_CONTENT_FAILURE,
    GET_PAYMENT_CONTENT_REQUEST,
    GET_PAYMENT_CONTENT_SUCCESS,
    GET_PAYMENT_CONTENT_FAILURE,
    GET_CARRIER_DATA_SUCCESS,
    GET_DELIVERY_SERVICE_DATA_SUCCESS,
    GET_CUSTOMER_SERVICE_DATA_SUCCESS,
    GET_CARRIER_DATA_REQUEST,
    GET_DELIVERY_SERVICE_DATA_REQUEST,
    GET_CUSTOMER_SERVICE_DATA_REQUEST,
    SET_PRIVILIGES_AT_LOGIN,
    SET_PRIVILIGES_AT_LOGIN_SUCCESS,
    CREATE_NEW_USER_FOR_NOTIFICATION_SUCCESS,
    NEW_USER_CONNECTED_SUCCESS,
    USER_DISCONNECTED_SUCCESS,
    EMPLOYEE_CONNECTED_SUCCESS,
    CHANGE_USER_STATUS_SUCCESS,
    GET_LOGS_CONTENT_REQUEST,
    GET_LOGS_CONTENT_SUCCESS,
    GET_LOGS_CONTENT_FAILURE,
    EMPLOYEE_DISCONNECTED_SUCCESS
} from '../actions/types';




let initialState={
    userTableCSV:'',
    fetching:false,
    data:{},
    error:{},
    userArrayList:"",
    loader:false,
    supplierList:"",
    categoryList:"",
    productsList:"",
    brandsList:"",
    userInfo:{},
    locationData:[],
    default:"",
    auctionProductList:"",
    selectedprivilegeslist:[],
    notificationList:[],
    fetching:false,
    privilegeAtLogin:[],
    notificationdata:[],
    noticount:0,
    online:true,
    // autofill:{}
 }
 
export function reducer(state=initialState,action){
    switch(action.type){
        case USER_API_CALL_REQUEST:
        {
            return {
                ...state,
                fetching:true,
                data: action.data 
            } 
            break; 
        };
        case USER_API_CALL_SUCCESS:
        {
            let obj={
                name:action.data.userName,
                email:action.data.email,
                picture:action.data.picture,
                userId:action.data.userId,
            }
            return {
                ...state,
                fetching:false,
                data: action.data ,
                userInfo:obj,
            } 
            
            break; 
        };
        case USER_REGISTER_CALL_REQUEST:
        {
            return {
                ...state,
                data: action.data,
            } 
            break; 
        };
        case User_Filter_Call_Request:
        {
            return {
                ...state,
               fetching:true
            } 
            break; 
        };
        case User_Filter_Call_SUCCESS:
        {
            let data=[]
            action.data && action.data.userList.map((row,count)=>{
                data=data.concat({...row,isSelected:false,actions:0})
            })
            return {
                ...state,
                data: {
                    ...action.data,
                    userList:data
                }, 
                fetching:false,
                userArrayList:{
                    ...action.data,
                    userList:data
                }, 
            } 
            break; 
        };
        case User_DATA_Call_Request:
        { 
            return {
                ...state,
               data:action.data,
               fetching:true,
            } 
            break; 
        };
        case User_DATA_Call_SUCCESS:
        { 
            let data=[]
            action.data && action.data.userList.map((row,count)=>{
                data=data.concat({...row,isSelected:false})
            })
            return {
                ...state,
               data:action.data,
               fetching:false,
               userArrayList:{...action.data,userList:data}
            } 
            break; 
        };
        case User_DATA_Call_FAILURE:
        { 
            return {
            //     ...state,
            //    data:action.data,
               fetching:false,
            //  userArrayList:action.data
            } 
            break; 
        };
        case USER_PROFILE_DETAILS_CALL_SUCCESS:
        {
            return{
            ...state,
            data:action.data,
          userArrayList:action.data.userList
        }
    }
    case USER_API_CALL_FAILURE:
    {
        return{
            ...state,
            error:action.error,
        }
    }
    case USER_TABLE_SUCCESS:
    {
        return{
            ...state,
            userTableCSV:action.data,
            default:action.value
        }
    }
    case AUCTION_PRODUCT_LIST_REQUEST:
    {
       return{
             ...state,
             fetching:true,
             }
    }
    case AUCTION_PRODUCT_LIST_REQUEST_SUCCESS:
    {
       return{
             ...state,
             fetching:false,
             auctionProductList:action.data
             }
    }
    case AUCTION_PRODUCT_LIST_REQUEST_FAILURE:
    {
        return{
            ...state,
            fetching:false,
            error:action.error,
        }
    }
  case CATEGORY_AUTOFILL_SUCCESS:{
    return{
        ...state,
        fetching:false,
        autofill:action.data
    }
  }
   case ADD_CATEGORY_REQUEST_SUCCESS:{
       let cat={
           _id:action.data._id,
           cateNameEn:action.data.cateNameEn
       }
    return{
        ...state,
        fetching:false,
        categoryAutoAdd:cat
    }
   }
    case GET_SUPPLIERS_CALL_REQUEST:
    {
        return{
            ...state,
            fetching:true,
            data:action.data,
        }
    }
    case GET_SUPPLIERS_CALL_SUCCESS:
    {
        return{
            ...state,
            fetching:false,
            data:action.data,
            supplierList:action.data,
        }
    }
    case GET_LOCATION_DATA_SUCCESS:
    {
        return{
            ...state,
            fetching:false,
            locationData:action.data,
        }
    } case GET_LOCATION_DATA_FAILURE:
    {
        return{
            ...state,
            fetching:false,
        }
    }
    case GET_SUPPLIERS_CALL_FAILURE:
    {
        return{
            ...state,
            fetching:false,
            error:action.error,
        }
    }
    case GET_BRANDS_CALL_REQUEST:
    {
        return{
            ...state,
            fetching:true,
            data:action.data,
        }
    }
    case GET_BRANDS_CALL_SUCCESS:
    {
        return{
            ...state,
            fetching:false,
            data:action.data,
            brandsList:action.data,
        }
    }
    case GET_BRANDS_CALL_FAILURE:
    {
        return{
            ...state,
            fetching:false,
            error:action.error,
        }
    }
    case GET_CATEGORY_CALL_REQUEST:
    {
        return{
            ...state,
            fetching:true,
            data:action.data,
        }
    }
    case GET_CATEGORY_CALL_SUCCESS:
    {
        return{
            ...state,
            fetching:false,
            categoryList:action.data,
        }
    }
    case GET_CATEGORY_CALL_FAILURE:
    {
        return{
            ...state,
            fetching:false,
            error:action.error,
        }
    }
    case GET_PRODUCTS_CALL_REQUEST:
    {
        return{
            ...state,
            fetching:true,
        }
    }
    case GET_PRODUCTS_CALL_SUCCESS:
    {
        return{
            ...state,
            fetching:false,
            productsList:action.data,
        }
    }
    case GET_PRODUCTS_CALL_FAILURE:
    {
        return{
            ...state,
            fetching:false,
            error:action.error,
        }
    }
    case PRODUCT_LIST_REQUEST:
    {
        return {
            ...state,
           fetching:true
        } 
        break; 
    };
    
    
    case PRODUCT_LIST_REQUEST_SUCCESS:
    {
       return{
             ...state,
             data:action.data,
             fetching:false,
             productList:action.data
             }
    }
    case PRODUCT_LIST_REQUEST_FAILURE:
    {
        return{
            ...state,
            fetching:false,
            error:action.error,
        }
    }

    case AUCTION_LIST_FILTER_REQUEST:
    {
        return {
            ...state,
           fetching:true
        } 
        break; 
    };
    
    case AUCTION_LIST_FILTER_REQUEST_SUCCESS:
    {
       return{
             ...state,
             data:action.data,
             fetching:false,
             auctionProductList:action.data
             }
    }
    case AUCTION_LIST_FILTER_REQUEST_FAILURE:
    {
        return{
            ...state,
            fetching:true,
            error:action.error,
        }
    }
    case ADD_PRODUCT_CATEGORY_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case EDIT_PRODUCT_CATEGORY_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case ADD_PRODUCT_CONTENT_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case EDIT_PRODUCT_CONTENT_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case ADD_PRODUCT_BRAND_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case EDIT_PRODUCT_BRAND_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case ADD_PRODUCT_SUPPLIER_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case EDIT_PRODUCT_SUPPLIER_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case REQUEST_SUCCESS:{
        return{
            ...state,
            fetching:false
        }
    }
    case REQUEST_FAILURE:{
        return{
            ...state,
            fetching:false
        }
    }
    case DATA_BIDS_BY_BANK_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case BANK_DETAILS_FILTER_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case BANK_DETAILS_FILTER_SUCCESS:{
       
        return{
            ...state,
            fetching:false,
            banklist:action.data,
            
        }
    }
    case BID_PACKAGE_DATA_REQUEST:{
        return{
            ...state,
            fetching:true
        }
    }
    case BID_PACKAGE_DATA_SUCCESS:{
        return{
            ...state,
            fetching:false,
            bidpackagelist:action.data,
        }
    }
    case UPDATE_AMOUNT_SUCCESS:
    { 
        return {
            ...state,
           data:action.data,
           fetching:false,
        } 
        break; 
    };
    case UPDATE_AMOUNT_IN_STORE_SUCCESS:{
        let myuserList=[];
        state.userArrayList.userList && state.userArrayList.userList.map((user,userCount)=>{
            if(user._id==action.data._id){
                myuserList=myuserList.concat({...user,[action.data._key]:action.data.val
                })
            }else{
                myuserList=myuserList.concat({...user})
            }
        })
        let obj={
            ...state.userArrayList,
            userList:myuserList,
        }
        return{
            ...state,
            userArrayList:obj
        }
    }
    case UPDATE_SELECT_VALUE_SUCCESS:{
        let myuserList=[];
        state.userArrayList.userList && state.userArrayList.userList.map((user,userCount)=>{
            if(user._id==action.data._id){
                myuserList=myuserList.concat({...user,isSelected:action.data.val
                })
            }else{
                myuserList=myuserList.concat({...user})
            }
        })
        let obj={
            ...state.userArrayList,
            userList:myuserList,
        }
        return{
            ...state,
            userArrayList:obj
        }
    }
    case UPDATE_AMOUNT_IN_INPUT_SUCCESS:{
        let myuserList=[];
        state.userArrayList.userList && state.userArrayList.userList.map((user,userCount)=>{
                myuserList=myuserList.concat({...user,amount:action.data.amount})
        })
        let obj={
            ...state.userArrayList,
            userList:myuserList,
        }
        return{
            ...state,
            userArrayList:obj
        }
    }
    case DATA_BIDS_BY_BANK_SUCCESS:{
        return {
            ...state,
           data:action.data,
           fetching:false,
        } 
        break; 
    };
    case DATA_BIDS_BY_BANK_FAILURE:{
        return {
            ...state,
           data:action.data,
           fetching:false,
        } 
        break; 
    };
    case PAYMENT_DETAILS_DATA_SUCCESS:{
        return {
            ...state,
           data:action.data,
           fetching:false,
        } 
        break;   
    }
   
    case PAYMENT_DETAILS_DATA_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    /*-----------------------------------------------COUPON Content--------------------------------*/
    case GET_COUPON_PACKAGE_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    case GET_COUPON_PACKAGE_SUCCESS:{
        return {
            ...state,
           fetching:false,
           couponPackageData:action.data
        } 
        break; 
    }case GET_COUPON_PACKAGE_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
        break; 
    }
    case GET_ALL_COUPONS_SUCCESS:{
       
        return {
            ...state,
           fetching:false,
            data:action.data
        } 

        break;  
    }
    case GET_COUPON_PERMISSION_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    case GET_COUPON_PERMISSION_SUCCESS:{
        return {
            ...state,
           fetching:false,
           permissionData:action.data
        } 
        break; 
    }
    case GET_COUPON_PERMISSION_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
        break; 
    }


    /*-----------------------------------------------TRADE EXCHANGE Content--------------------------------*/
    case GET_TRADE_OUT_CONTENT_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    case GET_TRADE_OUT_CONTENT_SUCCESS:{
        return {
            ...state,
           fetching:false,
           tradeOutData:action.data
        } 
        break; 
    }
    case GET_TRADE_OUT_CONTENT_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
        break; 
    }
    case GET_PAYMENT_CONTENT_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    case GET_PAYMENT_CONTENT_SUCCESS:{
        return {
            ...state,
           fetching:false,
           paymentData:action.data
        } 
        break; 
    }
    case GET_PAYMENT_CONTENT_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
        break; 
    }
    //----------------------------------------------Logs Content-----------------------------------//
    case GET_LOGS_CONTENT_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    case GET_LOGS_CONTENT_SUCCESS:{
        return {
            ...state,
           fetching:false,
           logsData:action.data
        } 
        break; 
    }
    case GET_LOGS_CONTENT_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
        break; 
    }


    /*-----------------------------------------------Reports Content--------------------------------*/
    case GET_DEPOSIT_REPORT_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    case GET_DEPOSIT_REPORT_SUCCESS:{
        return {
            ...state,
           fetching:false,
           depositReportsData:action.data
        } 
        break; 
    }
    case GET_DEPOSIT_REPORT_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
        break; 
    }

    case GET_TRADE_REPORT_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    case GET_TRADE_REPORT_SUCCESS:{
        return {
            ...state,
           fetching:false,
           tradeReportsData:action.data
        } 
        break; 
    }
    case GET_TRADE_REPORT_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
        break; 
    }






    /*-----------------------------------------------Review Content--------------------------------*/
    case GET_REVIEW_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
    }
    case GET_REVIEW_SUCCESS:{
        return {
            ...state,
           fetching:false,
           reviewData:action.data
        } 
    }
    case GET_REVIEW_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
    }
    case GET_PACKAGE_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    case GET_PACKAGE_SUCCESS:{
        return {
            ...state,
           fetching:false,
           packageData:action.data
        } 
        break; 
    }
    case GET_PACKAGE_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
        break; 
    }
    case GET_REVIEW_PERMISSION_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break; 
    }
    case GET_REVIEW_PERMISSION_SUCCESS:{
        return {
            ...state,
           fetching:false,
           reviewPermissionData:action.data
        } 
        break; 
    }
    case GET_REVIEW_PERMISSION_FAILURE:{
        return {
            ...state,
           fetching:false,
        } 
        break; 
    }
    case GET_PRIVILEGES_DATA_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break;
    }
    case GET_PRIVILEGES_DATA_SUCCESS:{
       
        return {
            ...state,
           fetching:false,
           data:action.data
        } 
        break; 
    }
    case SET_PREVILIGES_IN_STORE_SUCCESS:{
        return{
            ...state,
            selectedprivilegeslist:action.data
        }
    }
    case GET_DESIGNATION_DATA_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break;
    }
    case GET_DESIGNATION_DATA_SUCCESS:{
        return {
            ...state,
           fetching:false,
           data:action.data
        } 
        break; 
    }
    case SET_DESIGNATION_IN_STORE_SUCCESS:{
        return{
            ...state,
            selectedDesignationList:action.data
        }
    }
    case GET_DEPARTMENT_DATA_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break;
    }
    case GET_DEPARTMENT_DATA_SUCCESS:{
        return {
            ...state,
           fetching:false,
           data:action.data
        } 
        break; 
    }
    case GET_EMPLOYEES_DATA_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break;
    }
    case GET_EMPLOYEES_DATA_SUCCESS:{
        return {
            ...state,
           fetching:false,
           data:action.data
        } 
        break;
    }
    case GET_NOTIFICATION_DATA_SUCCESS:{
        return {
            ...state,
           fetching:false,
           notificationList:action.data
        } 
        break;
    }
    case GET_NOTIFICATION_DATA_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break;
    }
    case GET_CARRIER_DATA_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break;
    }
    case GET_CARRIER_DATA_SUCCESS:{
        return {
            ...state,
           fetching:false,
           data:action.data
        } 
        break;
    }
    case GET_CUSTOMER_SERVICE_DATA_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break;
    }
    case GET_CUSTOMER_SERVICE_DATA_SUCCESS:{
        return {
            ...state,
           fetching:false,
           data:action.data
        } 
        break;
    }
    case GET_DELIVERY_SERVICE_DATA_REQUEST:{
        return {
            ...state,
           fetching:true,
        } 
        break;
    }
    case GET_DELIVERY_SERVICE_DATA_SUCCESS:{
        return {
            ...state,
           fetching:false,
           data:action.data
        } 
        break;
    }
 
    case SET_PRIVILIGES_AT_LOGIN_SUCCESS:{
        return {
            ...state,
           fetching:false,
           privilegeAtLogin:action.data
        } 
        break; 
    }
    case CREATE_NEW_USER_FOR_NOTIFICATION_SUCCESS:{
        return {
            ...state,
           fetching:false,
           notificationdata:action.data,
           noticount:state.noticount+1,
        } 
        break; 

    }
    case CHANGE_USER_STATUS_SUCCESS:{
        console.log("CHANGE_USER_STATUS_SUCCESS----->",action.data);
        return{
            ...state,
            online:action.data
        }
    }
    case NEW_USER_CONNECTED_SUCCESS:{
        let myuserList=[];
        state.userArrayList.userList && state.userArrayList.userList.map((user,userCount)=>{
            if(user._id==action.data.id){
                myuserList=myuserList.concat({...user,online:true
                })
            }else{
                myuserList=myuserList.concat({...user})
            }
        })
        let obj={
            ...state.userArrayList,
            userList:myuserList,
        }
        return{
            ...state,
            userArrayList:obj
        }
    }
    case USER_DISCONNECTED_SUCCESS:{
        let myuserList=[];
        state.userArrayList.userList && state.userArrayList.userList.map((user,userCount)=>{
            if(user._id==action.data.userId){
                myuserList=myuserList.concat({...user,online:false
                })
            }else{
                myuserList=myuserList.concat({...user})
            }
        })
        let obj={
            ...state.userArrayList,
            userList:myuserList,
        }
        return{
            ...state,
            userArrayList:obj
        }
    } 
 case EMPLOYEE_CONNECTED_SUCCESS:{
     let employeelist=[];
     state.data.EmployeeData && state.data.EmployeeData.map((emp,key)=>{
        if(emp._id==action.data.userId){ 
            employeelist=employeelist.concat({...emp,online:true
            })
         }
         else{
            employeelist=employeelist.concat({...emp})
        }
    })
    let obj={
        ...state.data,
        EmployeeData:employeelist,
    }
    return{
        ...state,
        data:obj
    }
     }
     case EMPLOYEE_DISCONNECTED_SUCCESS:{
        let employeelist=[];
        state.data.EmployeeData && state.data.EmployeeData.map((emp,key)=>{
           if(emp._id==action.data.userId){ 
               employeelist=employeelist.concat({...emp,online:false
               })
            }
            else{
               employeelist=employeelist.concat({...emp})
           }
       })
       let obj={
           ...state.data,
           EmployeeData:employeelist,
       }
       return{
           ...state,
           data:obj
       }
        }
    default:
        return state;
    }
    


}

