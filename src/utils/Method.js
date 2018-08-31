import {notification} from 'antd' 
import axios from 'axios';
import {basepath} from "../utils/Constant"

export async function api(data) {
  let token=localStorage.getItem("token");
  return axios({
    method: data.method,
    url: basepath+data.url,
    data:data.data,
    headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer '+token,
  }, 
  });
  
}
export function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}
// export async function autocomplete(data) {
//   let token=localStorage.getItem("token");
//   let headers={
//     'Authorization':'Bearer '+token,
//     'Accept': 'application/json',
//   }
//   return axios({
//     method: data.method,
//     url: basepath+data.url,
//     headers:headers,
//   });
  
// }


export const DateFormat =(date)=>{
  if(date==undefined)
  date="2018-05-07T09:54:38+00:00";
  
    var res = date.split("T");
    var dates=res[0].split("-");
    var date=dates[2]+"/"+dates[1]+"/"+dates[0];
  return date;
  }

 export const openNotificationWithIcon = (type,notimsg,notidesc) => {
    notification[type]({
      message: notimsg,
      description: notidesc,
    });
  };

  export const TimeFormat=(date)=>{
    let res = date.split("T");
    let time= res[1].split(".");
    console.log(time);
    let datee=new Date(date);
    return datee.toLocaleTimeString();
  }

  export const checkdisplay=(tab)=>{
    let check=false;
    console.log("emailatlogin",localStorage.getItem("email"))
    if(localStorage.getItem("email")=="admin@gmail.com")
    {
     return true;
    }
   
    else{
      JSON.parse( localStorage.getItem("privileges")).map((value,key)=> 
     
     {if(value.selectPrivilege==tab)
     {  check=true;}
    })
    return check;
    }
}

export const checkAddPrivileges=(tab)=>{
  let check=false
  if(localStorage.getItem("email")=="admin@gmail.com")
  {
   return true;
  }
  else{
    JSON.parse( localStorage.getItem("privileges")).map((value,key)=> 
   {if(value.selectPrivilege==tab)
   { 
     if(value.add==true)
    check=true
  }
  })
  return check;
  }
}

export const checkUpdatePrivileges=(tab)=>{
  let check=false
  if(localStorage.getItem("email")=="admin@gmail.com")
  {
   return true;
  }
  else{
    JSON.parse( localStorage.getItem("privileges")).map((value,key)=> 
   {if(value.selectPrivilege==tab)
   { 
     if(value.update==true)
    check=true
  }
  })
  return check;
  }
}
export const checkDeletePrivileges=(tab)=>{
  let check=false
  if(localStorage.getItem("email")=="admin@gmail.com")
  {
   return true;
  }
  else{
    JSON.parse( localStorage.getItem("privileges")).map((value,key)=> 
   {if(value.selectPrivilege==tab)
   { 
     if(value.delete==true)
    check=true
  }
  })
  return check;
  }
}