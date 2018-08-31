import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AuctionContent from "../component/AuctionContent";
import { Breadcrumb } from "antd";
import Format from "../component/format";
import axios from "axios";
import {checkdisplay, checkAddPrivileges, checkDeletePrivileges} from "../utils/Method"
import { basepath, imagebasepath } from "../utils/Constant";
import CreateAuctionListContent from "../component/auctions/CreateAuctionListContent";
import ProductsToCreateAuctionContent from "../component/auctions/ProductsToCreateAuctionContent";
import AuctionProduct from "../component/auctions/AuctionProduct";
import { AUCTION_PRODUCT_LIST_REQUEST } from "../actions/types";
import { connect } from "react-redux";

class Auction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteItem: [],
      selectedproduct: []
    };
  }
componentWillMount(){
  this.props.state  && checkdisplay("Auctions")?"":(this.props.history.push('/home/dash'))
}
  deleteAuctionProductList = item => {
    console.log("rohan----->", item);
    let list = [];
    item.map((v, k) => {
      list = list.concat(v._id);
    });
    this.setState({
      deleteItem: list
    });
  };

  // panding for now---------------------------*/

  OnDeletemultiProduct = () => {
    console.log("deleteItem-------------->", this.state.deleteItem);
    let token = localStorage.getItem("token");
    axios({
      method: "delete",
      url: basepath + "auction/removeMultiple",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token
      },
      data: { auctionId: this.state.deleteItem }
    })
      .then(response => {
        console.log("remove-multiple------->", response);
        this.props.onAuctionProductList("data");
      })
      .catch(error => {
        console.log("remove-multiple---------->", error);
      });
  };

  //multipleSelect---------------------------*/

  multipleSelectProductList = productItem => {
    let productlist = [];
    productItem.map((value, key) => {
      productlist = productlist.concat(value);
    });
    this.setState({
      selectedproduct: productlist
    });
  };

  onSelectProduct = () => {
    this.props.history.push({
      pathname: "/home/auction/createauction/producttocreateauction",
      state: this.state.selectedproduct
    });
    console.log("selected_product-------->", this.state.selectedproduct);
  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/home/auction"
          render={() => {
            return (
              <Format
                style={{borderTop:"3px solid #3c8dbc"}}
                history={this.props.history}
                breadcrumb={
                  <span id="BreadCrumbspan">
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>
                        <img src={require("../images/home icon.png")} />&nbsp;Home
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="">Auctions</Breadcrumb.Item>
                    </Breadcrumb>
                  </span>
                }
                //onClick={()=>{this.props.deleteItem(this.state.deleteItem)}}

                headername={<span id="Usertxt">Auction Product List</span>}
                buttonspan={
                  <span id="ButtonSpans" style={{display:'flex'}}>
                    <button 
                  style={{display:this.props.state  && checkAddPrivileges('Auctions')?'flex':'none'}}                                                                                            
                    id="add-auction-button"
                     onClick={()=>{
                       
                       this.props.history.push({pathname:"/home/auction/createauction",state:""}),this.setState({deleteItem:[]})}}>Add Auction</button>
                    <button
                      id="delete-button"
                  style={{display:this.props.state  && checkDeletePrivileges('Auctions')?'flex':'none'}}                                                                                            
                  
                      onClick={this.OnDeletemultiProduct}
                      disabled={
                        this.state.deleteItem.length == 0 ? true : false
                      }
                      style={{
                        opacity: this.state.deleteItem.length == 0 ? "0.5" : "1"
                      }}
                    >
                      Delete
                    </button>
                  </span>
                }
              >
                
                <AuctionContent
                  deleteAuctionProductList={item => {
                    this.deleteAuctionProductList(item);
                  }}
                  history={this.props.history}
                  ref={this.myref}
                />
              </Format>
            );
          }}
        />
        <Route
          path="/home/auction/createauction"
          render={() => {
            console.log("length",this.state.selectedproduct);
            // this.setState({selectedproduct:[]})
            return (
              <Format
                style={{borderTop:"3px solid #3c8dbc"}}
                history={this.props.history}
                breadcrumb={
                  <span id="BreadCrumbspan">
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>
                        <img src={require("../images/home icon.png")} />&nbsp;Home
                      </Breadcrumb.Item>
                      <Breadcrumb.Item>Auction</Breadcrumb.Item>
                      <Breadcrumb.Item>Create Auction</Breadcrumb.Item>
                    </Breadcrumb>
                  </span>
                }
                headername={<span id="Usertxt">Products List</span>}
                buttonspan={
                  <span id="ButtonSpans">
                    {/* <Link to="/home/auction/createauction/producttocreateauction" >  */}
                    <button
                      id="add-auction-button"
                      onClick={this.onSelectProduct}
                      disabled={this.state.selectedproduct.length == 0}
                      style={{
                        opacity:
                          this.state.selectedproduct.length == 0 ? "0.5" : "1"
                      }}
                    >
                      Add Auction
                    </button>
                    {/* </Link> */}
                    <Link to="/home/product/createproduct">
                      
                      <button id="skip-button">Skip > ></button>
                    </Link>
                    <Link to="/home/auction">
                      <button id="back-button">Back</button>
                    </Link>
                  </span>
                }
              >
                <CreateAuctionListContent
                  history={this.props.history}
                  multipleSelectProductList={productItem => {
                    this.multipleSelectProductList(productItem);
                  }}
                  ref={this.myref}
                />
              </Format>
            );
          }}
        />
        <Route
          exact
          path="/home/auction/createauction/producttocreateauction"
          style={{}}
          render={() => {
            return (
              <Format
                style={{background:"#ecf0f5",border:"none"}}
                history={this.props.history}
                breadcrumb={
                  <span id="BreadCrumbspan">
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>
                        <img src={require("../images/home icon.png")} />&nbsp;Home
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/auction">
                        Auction
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/auction/createauction">
                        Create Auction
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/auction/createauction/producttocreateauction">
                        Products To Create Auction
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </span>
                }
                headername={<span id="Usertxt">Create Auction</span>}
                buttonspan={
                  <span id="ButtonSpans">
                    <Link to="/home/auction/createauction">
                      <button id="back-button">Back</button>
                    </Link>
                  </span>
                }
              >
                <ProductsToCreateAuctionContent history={this.props.history} />
              </Format>
            );
          }}
        />
        <Route
          path="/home/auction/auctionproduct"
          render={() => {
            return (
              <Format
                 style={{background:"#ecf0f5",border:"none"}}
                 breadcrumb={
                  <span id="BreadCrumbspan">
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>
                        <img src={require("../images/home icon.png")} />&nbsp;Home
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/auction">
                        Auction
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/auction/createauction/createproduct">
                        Auction Product
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </span>
                }
                headername={<span id="Usertxt">Auction Product</span>}
                buttonspan={
                  <span id="ButtonSpans">
                    <Link to="/home/auction">
                      <button id="btnExportCsv">Back</button>
                    </Link>
                  </span>
                }
              >
                <AuctionProduct history={this.props.history} />
              </Format>
            );
          }}
        />
         {/* <Route
          path="/home/auction/auctionlive"
          render={() => {
            return (
              <Format
                breadcrumb={
                  <span id="BreadCrumbspan">
                    <Breadcrumb separator=">">
                      <Breadcrumb.Item>
                        <img src={require("../images/home icon.png")} />&nbsp;Home
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/auction">
                        Auction
                      </Breadcrumb.Item>
                      <Breadcrumb.Item href="/home/auction/createauction/createproduct">
                        Auction Product
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </span>
                }
                headername={<span id="Usertxt">Auction Product</span>}
                buttonspan={
                  <span id="ButtonSpans">
                    <Link to="/home/auction">
                      <button id="btnExportCsv">Back</button>
                    </Link>
                  </span>
                }
              >
                <AuctionProduct history={this.props.history} />
              </Format>
            );
          }}
        /> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    state: state,
    fetching: state.fetching,
    AuctionArrayList: state.auctionProductList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuctionProductList: data => dispatch({ type: AUCTION_PRODUCT_LIST_REQUEST, data })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auction);
