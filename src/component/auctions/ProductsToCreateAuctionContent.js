import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import { Breadcrumb, DatePicker, notification, TimePicker } from "antd";
import { connect } from "react-redux";
import { DateFormat,TimeFormat ,api} from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import "../../style/auction/ProductsToCreateAuctionContent.css";
import {
  CREATE_AUCTION_REQUEST,
  UPDATE_AUCTION_REQUEST
} from "../../actions/types";
import { RadioButton } from "primereact/components/radiobutton/RadioButton";
import Sliderbutton from "../../component/Sliderbutton";
import { Column } from "primereact/components/column/Column";
import { DataTable } from "primereact/components/datatable/DataTable";
import { InputText } from "primereact/components/inputtext/InputText";
import { Calendar } from "primereact/components/calendar/Calendar";

const dateFormat = "YYYY/MM/DD";
const openNotificationWithIcon = (type, notimsg, notidesc) => {
  notification[type]({
    message: notimsg,
    description: notidesc
  });
};
class ProductsToCreateAuctionContent extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      type: "Beginner",
      perUser: "No",
      promotion: "None",
      biddingLimit: "0",
      retailPrice: "",
      Start_Price: "0",
      stop_price: "0",
      Price_Increment: "10",
      buy_now_limit: "No",
      from: "",
      to: "",
      bid_back: "No",
      custom: "",
      bidLimit: "0",
      stock: "0",
      fromVisibility: "hidden",
      toVisibility: "hidden",
      customVisibility: "hidden",
      custom_ksVisibility: "hidden",
      from_date: "",
      to_date: "",
      selectRow_count: "",
      selectTo_product: [],
      selectedCar: "",
      fromTime: "",
      toTime: "",
      TimeIncrement: 20,
      flag: true,
      flag1: true,
      start_price_ks: "Ks",
      stop_price_ks: "Ks",
      start: "",
      stop: "",
      id:"",
      isLoading:false
    };
  }

  statusYes = () => {
    this.setState({
      status: true
    });
  };

  statusNo = () => {
    this.setState({
      status: false
    });
  };

  fromDate = e => {
    // let isoDate = new Date(e.value).toISOString();
    // // let isoDate = new Date(e._d);
    // // let isoDate = e;
    console.log("iso", e);
    this.setState({
      from_date: e.value
    });
  };

  toDate = e => {
    let isoDate = new Date(e.value).toISOString();
    console.log("to_date------------->", isoDate);
    this.setState({
      to_date: e.value
    });
  };

  //start put post api------------------------*/

  onCreateAuction = () => {
    if (this.state.from_date === "")
      openNotificationWithIcon(
        "warning",
        "From Date",
        "Please select from  date!"
      );
    else if (this.state.to_date === "")
      openNotificationWithIcon("warning", "To Date", "Please select to date!");
    else if (this.state.type === "")
      openNotificationWithIcon("warning", "Type", "Please select a type!");
    else if (this.state.retailPrice === "")
      openNotificationWithIcon(
        "warning",
        "Retails Price",
        "Please enter retail price!"
      );
    else if (this.state.Price_Increment === "")
      openNotificationWithIcon(
        "warning",
        "Price Increment",
        "Please enter price increment!"
      );
    else if (this.state.bidLimit === "")
      openNotificationWithIcon(
        "warning",
        "AutoBid Limit",
        "Please enter autoBid limit!"
      );
    else {
      let productItem = this.state.selectTo_product;
      console.log("hell-->", productItem);
      let start_price=this.state.Start_Price,stop_price=this.state.stop_price;
      if (!this.state.flag){
      start_price=(parseInt(this.state.retailPrice) * parseInt(this.state.start)) / 100
      }
      if (!this.state.flag1){
        stop_price=(parseInt(this.state.retailPrice) * parseInt(this.state.stop)) / 100
        }
      let data = {
        startDate: new Date(this.state.from_date).toISOString(),
        endDate: new Date(this.state.to_date).toISOString(),
        type: this.state.type,
        perUser: this.state.perUser,
        promotion: this.state.promotion,
        biddingLimit: this.state.biddingLimit,
        retailPrice: this.state.retailPrice,
        startPrice: start_price,
        endPrice: stop_price,
        priceIncrement: this.state.Price_Increment,
        buyLimit: this.state.buy_now_limit,
        from: this.state.from,
        to: this.state.to,
        bidBack: this.state.bid_back,
        custom: this.state.custom,
        bidLimit: this.state.bidLimit,
        stock: this.state.stock,
        status: this.state.status,
        products: productItem.map((v, k) => {
          return {
            productId: v._id,
            productName: v.productNameEn,
            image: v.image[0]
          };
        }),
        _id:this.state.id,
        startPercent: this.state.flag,
        stopPercent: this.state.flag1
      };
      console.log("====>data", data);
      if (this.props.history.location.search) {
        this.props.onAuctionUpdation(data, this.props.history);
      } else {
        this.props.onAuctionCreation(data, this.props.history);
      }
    }
  };
  componentDidMount() {
    console.log("vicky---------", this.props.history.location.state);
    this.setState({ selectTo_product: this.props.history.location.state });
    if (this.props.history.location.search) {
      this.setState({isLoading:true});
        let _id=this.props.history.location.search.split("=")[1];
        console.log("===>", _id);
        let data = {
          method: "get",
          url: `auction/getAuctionByObjectId?id=${_id}`,
        };
        api(data).then(res => {
          console.log("helloin js", res);
          let value = res.data.auctionData;
          this.setState({selectTo_product:res.data.products,isLoading:false})
    let startPrice,endPrice;
    if (!value.startPercent){
      startPrice=(100*value.startPrice)/value.retailPrice;
    }
    else {
      startPrice=value.startPrice
    }
    if (!value.stopPercent){
      endPrice=(100*value.endPrice)/value.retailPrice;
    }
    else {
      endPrice=value.endPrice
    }
    this.setState({
      from_date: new Date(value.startDate),
      to_date: new Date(value.endDate),
      type: value.type,
      perUser: value.perUser,
      promotion: value.promotion,
      biddingLimit: value.biddingLimit,
      retailPrice: value.retailPrice,
      start: startPrice,
      stop: endPrice,
      Start_Price:value.startPrice,
      stop_price:value.endPrice, 
      priceIncrement: value.priceIncrement,
      fromVisibility:value.buyLimit.buyStatus=="Yes"?"visible":"hidden",
      toVisibility:value.buyLimit.buyStatus=="Yes"?"visible":"hidden",
      buyLimit: value.buyLimit,
      from: value.buyLimit.from,
      to: value.buyLimit.to,
      buy_now_limit:value.buyLimit.buyStatus=="Yes"?"Yes":"No",
      bidBack: value.bidBack,
      custom: value.bidBack.custom,
      customVisibility:value.bidBack.backStatus=="Yes"?"visible":"hidden",
      custom_ksVisibility: value.bidBack.backStatus=="Yes"?"visible":"hidden",
      bidLimit: value.bidLimit,
      bid_back:value.bidBack.backStatus=="Yes"?"Yes":"No",
      stock: value.stock,
      status: value.status,
      flag: value.startPercent,
      flag1: value.stopPercent,
      start_price_ks: value.startPercent ? "Ks" : "%",
      stop_price_ks: value.stopPercent ? "Ks" : "%",
      products: value.products,
      id:value._id
    });
        });
      }
  
  //   
  }
  startPriceHandler = e => {
    let num = e.target.value || 0;
    console.log("hey", this.state.retailPrice);
    if (parseInt(num) <= parseInt(this.state.retailPrice)) {
      console.log("hello");
      if (this.state.flag) {
        this.setState({
          Start_Price: num,
          start: num < 1 ? "" : num
        });
      } else {
        if (num <= 100) {
          this.setState({
            Start_Price:num,
              start: num < 1 ? "" : num
          });
        }
      }
    } else if (isNaN(parseInt(num))) {
      this.setState({ start: num });
    }
  };
  stopPriceHandler = e => {
    let num = e.target.value || 0;
    console.log("hey", this.state.retailPrice);
    if (parseInt(num) <= parseInt(this.state.retailPrice)) {
      console.log("hello");
      if (this.state.flag1) {
        this.setState({
          stop_price: num,
          stop: num < 1 ? "" : num
        });
      } else {
        if (num <= 100) {
          this.setState({
            stop_price:num,            
            stop: num < 1 ? "" : num
          });
        }
      }
    } else if (isNaN(parseInt(num))) {
      this.setState({ stop: num });
    }
  };

  delete = (rowData, key) => {
    console.log(typeof rowData.index, this.state.selectTo_product);
    this.state.selectTo_product.splice(rowData, 1);
    this.setState({ selectTo_product: this.state.selectTo_product });
    //  alert("calleddd")
    console.log(this.state.selectTo_product.splice(rowData.index, 0));
  };

  Action = (rowData, key) => {
    let srce = require("../../icons/delete.png");
    return (
      <img
        src={srce}
        onClick={() => this.delete(rowData, key)}
        style={{ height: 20, width: 20 }}
      />
    );
  };
  created = (rowData, column) => {
    return (
      <div>
        <div>{DateFormat(rowData.createdAt)}</div>
        {TimeFormat(rowData.createdAt)}
      </div>
    );
  };
  supplier = (rowData, column) => {
    // console.log("==>hello1",rowData.supplierName[0].name)
    return <div>{rowData.supplierName.name}</div>;
  };
  brand = (rowData, column) => {
    return <div>{rowData.brandName ? rowData.brandName.name : "hello"}</div>;
  };
  createdBy = (rowData, column) => {
    let srce, ipAddr;
    let path2 = `${imagebasepath}/${rowData.createdBy.img}`;
    // let path2=rowData.createdBy.img;
    if (rowData.createdBy.img == "" || rowData.createdBy.img == undefined) {
      srce = "User";
    } else srce = path2;
    if (rowData.createdBy.ip == "" || rowData.createdBy.ip == undefined)
      ipAddr = "192.168.17.9";
    else ipAddr = rowData.createdBy.ip;
    return (
      <div style={{ display: "flex" }}>
        <div id="UserImageDiv">
          <img
            id="UserAvatarimg"
            src={srce}
            alt="av"
            style={{ height: "30px", width: "30px", borderRadius: "50px" }}
          />
        </div>
        <div>
          <div>{rowData.createdBy.name}</div>
          <div>{ipAddr}</div>
        </div>
      </div>
    );
  };
  image = (rowData, column) => {
    console.log("image===", rowData);

    let srce;
    let path2 = `${imagebasepath}/${rowData.image["0"]}`;
    return (
      <div>
        <img
          id="UserAvatarimg"
          src={path2}
          alt="av"
          style={{
            height: "30px",
            width: "100px",
            marginRight: "10px",
            borderRadius: "10px"
          }}
        />
      </div>
    );
  };

  render() {
    console.log("hakka", this.state.fromVisibility);
    const {
      fetching,
      data,
      onAuctionCreation,
      onAuctionUpdation,
      error
    } = this.props;
    console.log("selectTo_product---------->",this.state.selectTo_product)
    let selectProductData=[];
      let arr=this.state.selectTo_product
        arr!==undefined&&arr.map((value,key)=>{
        let selectProduct={
          index:key+1,
          _id:value._id,
          productNameEn:value.productNameEn,
          createdAt:value.createdAt,
          quantity:value.quantity,
          retailPrice:value.retailPrice,
          category:value.category,
          brandName:value.brand,
          supplierName:value.supplierName,
          createdBy:value.createdBy,
          image:value.image
          }
          selectProductData.push(selectProduct)

    })
    console.log("stop", this.state.Start_Price, "stop", localStorage.getItem("bidPrice")
   );

    return (
      <div className="main_createAuction">
       {fetching||this.state.isLoading?
          <div style={{ display: 'block', width:'100%', height:'100%', textAlign:'center' , opacity:'0.5'}}>
          <div style={{height:"calc(100vh - 135px)"}}>
            <img style={{marginTop:"16%",height:"60px",width:"60px"}} src={require("../../images/loader1.gif")}/>
            </div>
          </div>
          :
        <div className="main_Container">
          <div className="header">create an auction</div>
          <div className="inputsfields_container">
            <table>
              <tbody>
                <tr>
                  <td>
                    From Date <font color="red">*</font>
                  </td>
                  <td>
                    <Calendar
                      className="dateInput"
                      showTime={true}
                      showIcon={true}
                      showSeconds={true}
                      value={this.state.from_date}
                      onChange={e => this.fromDate(e)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    To Date <font color="red">*</font>
                  </td>
                  <td style={{ paddingTop: 10 }}>
                    <Calendar
                      showTime={true}
                      showIcon={true}
                      showSeconds={true}
                      className="dateInput"
                      value={this.state.to_date}
                      onChange={e => this.toDate(e)}
                    />
                  </td>
                </tr>
                <br />
                <tr>
                  <td>
                    Type <font color="red">*</font>
                  </td>
                  <div className="typeDiv">
                    <tr>
                      <li>
                        <RadioButton
                          value="Beginner"
                          onChange={e => {
                            this.setState({ type: e.value });
                          }}
                          checked={this.state.type === "Beginner"}
                        />{" "}
                        Beginner
                      </li>
                      <li>
                        <RadioButton
                          value="Penny"
                          onChange={e => {
                            this.setState({ type: e.value });
                          }}
                          checked={this.state.type === "Penny"}
                        />{" "}
                        Penny
                      </li>
                    </tr>
                  </div>
                </tr>
                <tr>
                  <td>One Per User</td>
                  <div className="one_perUser">
                    <tr>
                      <li>
                        <RadioButton
                          value="Yes"
                          onChange={e => {
                            this.setState({ perUser: e.value });
                          }}
                          checked={this.state.perUser === "Yes"}
                        />{" "}
                        Yes
                      </li>
                      <li>
                        <RadioButton
                          value="No"
                          onChange={e => {
                            this.setState({ perUser: e.value });
                          }}
                          checked={this.state.perUser === "No"}
                        />{" "}
                        No
                      </li>
                    </tr>
                  </div>
                </tr>
                <tr>
                  <td>Permotion</td>
                  <div className="Permotion">
                    <tr>
                      <li>
                        <RadioButton
                          value="None"
                          onChange={e => {
                            this.setState({ promotion: e.value });
                          }}
                          checked={this.state.promotion === "None"}
                        />{" "}
                        None
                      </li>
                      <li>
                        <RadioButton
                          value="Free"
                          onChange={e => {
                            this.setState({ promotion: e.value });
                          }}
                          checked={this.state.promotion === "Free"}
                        />{" "}
                        Free
                      </li>
                      <li>
                        <RadioButton
                          value="Half Price"
                          onChange={e => {
                            this.setState({ promotion: e.value });
                          }}
                          checked={this.state.promotion === "Half Price"}
                        />{" "}
                        Half Price
                      </li>
                    </tr>
                  </div>
                </tr>
                <tr>
                  <td>Bidding Limit</td>
                  <div className="Bidding_limit">
                    <tr>
                      <li>
                        <InputText
                          name="bidding"
                          onChange={e => {
                            this.setState({ biddingLimit: e.target.value });
                          }}
                          onKeyPress={e => {
                            e.charCode >= 48 && e.charCode <= 57
                              ? true
                              : e.preventDefault();
                          }}
                          value={
                            this.state.biddingLimit == 0
                              ? ""
                              : this.state.biddingLimit
                          }
                          placeholder="0"
                        />
                      </li>
                      <li>Ks.</li>
                      <li style={{ color: "#3c8dbc" }}>
                        +{this.state.biddingLimit / 1000}K
                      </li>
                    </tr>
                  </div>
                </tr>
                <br />
                <tr>
                  <td>
                    Retail Price/Buy Now Price <font color="red">*</font>
                  </td>
                  <div className="retail_price">
                    <tr>
                      <li>
                        <InputText
                          keyfilter="num"
                          name="retail_price"
                          onChange={e => {
                            this.setState({ retailPrice: e.target.value,start:"",stop:"" });
                          }}
                          value={this.state.retailPrice}
                          placeholder="0"
                        />
                      </li>
                      <li>Ks.</li>
                    </tr>
                  </div>
                </tr>
                <tr>
                  <td>Start Price</td>
                  <div className="start_Price">
                    <tr>
                      <li>
                        <InputText
                          keyfilter="num"
                          className="start_price_input"
                          name="start_price"
                          onChange={e => this.startPriceHandler(e)}
                          value={this.state.start}
                          placeholder="0"
                        />
                      </li>
                      <li>
                        <RadioButton
                          value="Ks"
                          onChange={e => {
                            console.log(
                              "radioss",
                              this.state.start_price_ks,
                              e
                            );
                            this.setState({
                              start_price_ks: e.value,
                              flag: true,
                              start: ""
                            });
                          }}
                          checked={this.state.start_price_ks === "Ks"}
                        />{" "}
                        Ks.
                      </li>
                      <li>
                        <RadioButton
                          value="%"
                          onChange={e => {
                            console.log(
                              "radioss",
                              this.state.start_price_ks,
                              e
                            );
                            this.setState({
                              start_price_ks: e.value,
                              flag: false,
                              start: ""
                            });
                          }}
                          checked={this.state.start_price_ks === "%"}
                        />{" "}
                        %
                      </li>
                    </tr>
                  </div>
                </tr>
                <tr>
                  <td>Stop Price </td>
                  <div className="stop_price">
                    <tr>
                      <li>
                        <InputText
                          keyfilter="num"
                          className="stop_price_input"
                          onChange={e => this.stopPriceHandler(e)}
                          value={this.state.stop}
                          placeholder="0"
                        />
                      </li>
                      <li>
                        <RadioButton
                          value="Ks"
                          onChange={e => {
                            this.setState({
                              stop_price_ks: e.value,
                              flag1: true,
                              stop: ""
                            });
                          }}
                          checked={this.state.stop_price_ks === "Ks"}
                        />
                        Ks.
                      </li>
                      <li>
                        <RadioButton
                          value="%"
                          onChange={e => {
                            this.setState({
                              stop_price_ks: e.value,
                              flag1: false,
                              stop: ""
                            });
                          }}
                          checked={this.state.stop_price_ks === "%"}
                        />
                        %
                      </li>
                    </tr>
                  </div>
                </tr>
                <br />
                <tr>
                  <td>
                    Price Increment <font color="red">*</font>
                  </td>
                  <div className="Price_Increment">
                    <tr>
                      <li>
                        <InputText
                          keyfilter="num"
                          className="Price_Increment_input"
                          onChange={e => {
                            this.setState({ Price_Increment: e.target.value });
                          }}
                          value={this.state.Price_Increment}
                        />
                      </li>
                      <li>
                        <RadioButton
                          value="Ks"
                          onChange={e => {
                            this.setState({ Price_Increment_ks: e.value });
                          }}
                          checked={this.state.Price_Increment_ks === "Ks"}
                          style={{ display: "none" }}
                        />{" "}
                        Ks.
                      </li>
                      <li style={{ display: "none" }}>
                        <RadioButton
                          value="%"
                          onChange={e => {
                            this.setState({ Price_Increment_ks: e.value });
                          }}
                          checked={this.state.Price_Increment_ks === "%"}
                        />{" "}
                        %
                      </li>
                      <li style={{ color: "red" }}>
                        {this.state.Price_Increment / localStorage.getItem("bidPrice")} Bid placement
                      </li>
                    </tr>
                  </div>
                </tr>
                {/* <tr>
                  <td>
                    Time Increment <font color="red">*</font>
                  </td>
                  <div className="Price_Increment">
                    <tr>
                      <li>
                        <InputText
                          readOnly
                          className="Price_Increment_input"
                          value={this.state.TimeIncrement}
                        />
                      </li>
                      <li>
                        <RadioButton
                          value="sec"
                          onChange={e => {
                            this.setState({ Price_Increment_ks: e.value });
                          }}
                          checked={this.state.Price_Increment_ks === "Ks"}
                          style={{ display: "none" }}
                        />{" "}
                        Sec.
                      </li>
                    </tr>
                  </div>
                </tr> */}
                <br />
                <tr>
                  <td>Buy It Now Limit</td>
                  <div className="buy_now_limit">
                    <tr>
                      <li>
                        <RadioButton
                          value="Yes"
                          onChange={e => {
                            this.setState({
                              buy_now_limit: e.value,
                              fromVisibility: "visible",
                              toVisibility: "visible"
                            });
                          }}
                          checked={this.state.buy_now_limit === "Yes"}
                        />
                        Yes
                      </li>
                      <li>
                        <RadioButton
                          value="No"
                          onChange={e => {
                            this.setState({
                              buy_now_limit: e.value,
                              fromVisibility: "hidden",
                              toVisibility: "hidden",
                              from:"",
                              to:""
                            });
                          }}
                          checked={this.state.buy_now_limit === "No"}
                        />{" "}
                        No
                      </li>

                      <li style={{ visibility: this.state.fromVisibility }}>
                        From{" "}
                        <InputText
                          className="limitInput"
                          value={this.state.from}
                          onChange={e => {
                            this.setState({ from: e.target.value });
                          }}
                        />
                      </li>
                      <li style={{ visibility: this.state.toVisibility }}>
                        To
                        <InputText
                          className="limitInput"
                          value={this.state.to}
                          onChange={e => {
                            this.setState({ to: e.target.value });
                          }}
                        />
                      </li>
                    </tr>
                  </div>
                </tr>
                <tr>
                  <td>Bid back </td>
                  <div className="bid_back">
                    <tr>
                      <li>
                        <RadioButton
                          value="Yes"
                          onChange={e => {
                            this.setState({
                              bid_back: e.value,
                              customVisibility: "visible",
                              custom_ksVisibility: "visible"
                            });
                          }}
                          checked={this.state.bid_back === "Yes"}
                        />{" "}
                        Yes
                      </li>
                      <li>
                        <RadioButton
                          value="No"
                          onChange={e => {
                            this.setState({
                              bid_back: e.value,
                              customVisibility: "hidden",
                              custom_ksVisibility: "hidden",
                              custom:""
                            });
                          }}
                          checked={this.state.bid_back === "No"}
                        />{" "}
                        No
                      </li>

                      <li style={{ visibility: this.state.customVisibility }}>
                        Custom{" "}
                        <InputText
                          className="custom"
                          value={this.state.custom}
                          onChange={e => {
                            this.setState({ custom: e.target.value });
                          }}
                        />
                      </li>

                      <li
                        style={{ visibility: this.state.custom_ksVisibility }}
                      >
                        <RadioButton
                          value="Ks"
                          onChange={e => {
                            this.setState({ custom_ks: e.value });
                          }}
                          checked={this.state.custom_ks === "Ks"}
                          style={{ display: "none" }}
                        />{" "}
                        Ks.
                      </li>
                      <li style={{ display: "none" }}>
                        <RadioButton
                          value="%"
                          onChange={e => {
                            this.setState({ custom_ks: e.value });
                          }}
                          checked={this.state.custom_ks === "%"}
                        />{" "}
                        %
                      </li>
                    </tr>
                  </div>
                </tr>{" "}
                <br />
                {/* <tr>
                  <td>
                    AutoBid Limit <font color="red">*</font>
                  </td>
                  <div className="autoBid_limit">
                    <tr>
                      <li>
                        <InputText
                        keyfilter="num"
                          className="autoBid_limit_input"
                          onChange={e => {
                            this.setState({ bidLimit: e.target.value });
                          }}
                          value={
                            this.state.bidLimit == 0 ? "" : this.state.bidLimit
                          }
                          placeholder="0"
                        />
                      </li>

                      <li>
                        <RadioButton
                          value="Ks"
                          onChange={e => {
                            this.setState({ autoBid_ks: e.value });
                          }}
                          checked={this.state.autoBid_ks === "Ks"}
                          style={{ display: "none" }}
                        />{" "}
                        Ks.
                      </li>
                      <li style={{ display: "none" }}>
                        <RadioButton
                          value="%"
                          onChange={e => {
                            this.setState({ autoBid_ks: e.value });
                          }}
                          checked={this.state.autoBid_ks === "%"}
                        />{" "}
                        %
                      </li>
                    </tr>
                  </div>
                </tr> */}
                <tr>
                  <td>Stock for Auction </td>
                  <div className="stock_auction">
                    <tr>
                      <li>
                        <InputText
                          className="stock_auction_input"
                          onChange={e => {
                            this.setState({ stock: e.target.value });
                          }}
                          value={this.state.stock == 0 ? "" : this.state.stock}
                          placeholder="0"
                        />
                      </li>
                      <li>Pcs</li>
                    </tr>
                  </div>
                </tr>
                <tr>
                  <td>
                    Status <font color="red">*</font>
                  </td>
                  <div className="status">
                    <tr>
                      {/* <div id="button_outer_div">
                            <span className="status_span" style={{background:this.state.status?'#4ca65a':'#de4b38',left:this.state.status?'0px':'50%',fontSize:11.5}}>{this.state.status?'Yes':'No'}</span>
                            <li><button type="button" onClick={this.statusYes}>Yes</button></li>
                            <li><button type="button" onClick={this.statusNo}>No</button></li>
                            </div> */}
                      <Sliderbutton
                        clickForAllow={this.statusYes}
                        clickFordeny={this.statusNo}
                        background={this.state.status ? "#4ca65a" : "#de4b38"}
                        left={this.state.status ? "0px" : "50%"}
                        spaninner={this.state.status ? "Yes" : "No"}
                        buttonNameAllow="Yes"
                        buttonNameDeny="No"
                      />
                    </tr>
                  </div>
                </tr>
                <br />
                <tr>
                  <td />
                  <div className="create_cancel_button">
                    <tr>
                      <li>
                        <button type="button" onClick={this.onCreateAuction}>
                          {this.props.history.location.search
                            ? "Update"
                            : "Create"}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          style={{
                            background: "#f5f5f5",
                            color: "#333",
                            border: "1px solid lightgray"
                          }}
                          onClick={()=>this.props.history.push("/home/auction")}
                        >
                          Cancel
                        </button>
                      </li>
                    </tr>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
       }
        {/*----------------end of main_Container--------------*/}

        <div className="bottom_table_container">
          <div className="productTocreate_header">
            <div id="productTocreate_header_content">
              Products List To Create An Action
            </div>
          </div>
          {/*--------end of auction_header----------- */}
          <div id="productTocreate_header_content_filter_content">
            <ul>
              <li>Reset filter</li>
              <li>Show</li>
              <li>
                <select
                  onChange={event => {
                    console.log("select-show---------", event.target.value),
                      this.setState({ selectRow_count: event.target.value });
                  }}
                >
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                </select>
              </li>
              <li>
                <button
                  onClick={() =>
                    this.props.history.push("/home/auction/createauction")
                  }
                >
                  Add Auction
                </button>
              </li>
            </ul>
          </div>
          <div className="create_auction_table_container">
            <DataTable
              scrollHeight={"200px"}
              scrollable={true}
               value={selectProductData}
              style={{ marginTop: "30px", width: "100%" }}
              rows={this.state.selectRow_count}
              //  selectionMode="single" selection={this.state.selectedCar} onSelectionChange={(e)=>{this.setState({selectedCar:e.data});}}
              //  onRowSelect={this.onCarSelect}>
            >
              <Column
                field="index"
                header="S.NO"
                style={{ width: "45px", textAlign: "center" }}
              />
              <Column
                field="Image"
                header="Image"
                body={this.image}
                style={{ width: "180px", textAlign: "center" }}
              />
              <Column
                field="productNameEn"
                header="Product Name"
                style={{ width: "200px", textAlign: "left" }}
              />
              <Column
                field="_id"
                header="Product ID"
                style={{ width: "220px", textAlign: "center" }}
              />
              <Column
                field="createdAt"
                header="Created Date"
                body={this.created}
                style={{ width: "150px", textAlign: "center" }}
              />
              <Column
                field="quantity"
                header="Quantity"
                style={{ width: "130px", textAlign: "center" }}
              />
              <Column
                field="retailPrice"
                header="Retail Price"
                style={{ width: "150px", textAlign: "right" }}
              />
              <Column
                field="category"
                header="Category"
                style={{ width: "180px", textAlign: "left" }}
              />
              <Column
                header="Brand Name"
                body={this.brand}
                style={{ width: "100px", textAlign: "left" }}
              />
              <Column
                header="Supplier Name"
                body={this.supplier}
                style={{ width: "150px", textAlign: "left" }}
              />
              <Column
                header="Created By"
                body={this.createdBy}
                style={{ width: "170px", textAlign: "left" }}
              />
              <Column
                field="action"
                header="Action"
                body={this.Action}
                style={{ width: "100px", textAlign: "center" }}
              />
            </DataTable>
          </div>{" "}
          {/*--------end of main_table_container----------- */}
        </div>
        {/*---------end of bottom_table_container---------------*/}
      </div> //*---------------------main_createAuction..........................*/
    );
  }
}

const mapStateToProps = state => {
  return {
    // fetching: state.fetching,
    // data: state.data,
    // error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuctionCreation: (data, history) =>
      dispatch({ type: CREATE_AUCTION_REQUEST, data, history }),
    onAuctionUpdation: (data, history) =>
      dispatch({ type: UPDATE_AUCTION_REQUEST, data, history })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsToCreateAuctionContent);
