import React, { Component } from "react";
import { Breadcrumb, Menu, Pagination, DatePicker, Modal, Row, Col } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import moment from "moment";
import "../../style/depositncredit/bank.css";
import { DataTable } from "primereact/components/datatable/DataTable";
import { connect } from "react-redux";
import { Column } from "primereact/components/column/Column";
import { InputText } from "primereact/components/inputtext/InputText";
import { DateFormat, TimeFormat, api, openNotificationWithIcon ,checkdisplay} from "../../utils/Method";
import { basepath, imagebasepath } from "../../utils/Constant";
import { SplitButton } from 'primereact/components/splitbutton/SplitButton';
import { GET_CARRIER_DATA_REQUEST } from "../../actions/types";

class Carrier extends Component {
  state = {
    carriermodal: false,
    carrierName: "",
    limit: 10,
    page: 1,
    createdAt: "",
    createdBy: ""
  }
  clearAll = () => {
    this.setState({
      carrierName: "",
      createdAt: "",
      createdBy: ""
    })
    this.props.onRequestCarrierData({
      limit: this.state.limit,
      page: this.state.page
    })
  }
  componentWillMount() {
    this.props.state  && checkdisplay("Delivery")?"":(this.props.history.push('/home/dash'))
    
    this.props.onRequestCarrierData({
      limit: this.state.limit,
      page: this.state.page
    })
  }
  createdAt = (rowData, column) => {
    return (
      <div>
        {DateFormat(rowData.createdAt)}&nbsp;
           {TimeFormat(rowData.createdAt)}&nbsp;
        </div>
    );
  };

  createdByTemplate(rowData, column) {

    if (rowData.createdBy) {
      let srce, ipAddr;
      let path2 = `${imagebasepath}/${rowData.createdBy.img}`;

      if (rowData.createdBy.ip == "" || rowData.createdBy.ip == undefined)
        ipAddr = "192.168.17.9";
      else ipAddr = rowData.createdBy.ip;
      return (
        <div style={{ display: "flex" }}>
          <div id="UserImageDiv">
          {" "}
            <img
              id="UserAvatarimg"
              src={path2}
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
    }
  }
  render() {
    let carrierList = [];
    if (this.props.state.data.data) {
      this.props.state.data.data.map((data, key) => {
        let obj;
        obj = {
          ...data,
          index: key + 1 + (this.state.page - 1) * this.state.limit
        };
        carrierList = carrierList.concat(obj);
      });
    }

    let createdByFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.createdBy}
        onChange={e => {
          this.setState({
            filterName: "createdBy",
            filterData: e.target.value,
            page: 1,
            createdBy: e.target.value
          });
          this.props.onRequestCarrierData({
            page: 1,
            limit: this.state.limit,
            createdBy: e.target.value
          });
        }}
      />
    );
    let createdDateFilter = (
      <DatePicker
        allowClear={false}
        value={this.state.created}
        className="ui-column-filter"
        onChange={(date, dateString) => {
          this.setState({
            filterName: "createdAt",
            filterData: dateString,
            page: 1,
            created: moment(dateString)
          });
          this.props.onRequestCarrierData({
            page: 1,
            limit: this.state.limit,
            createdAt: dateString
          });
        }}
      />
    );
    let carrierNameFilter = (
      <InputText
        className="ui-column-filter"
        style={{ width: "100%" }}
        value={this.state.carrierName}
        onChange={e => {
          this.setState({
            filterName: "carrierName",
            filterData: e.target.value,
            page: 1,
            carrierName: e.target.value
          });
          this.props.onRequestCarrierData({
            page: 1,
            limit: this.state.limit,
            carrierName: e.target.value
          });
        }}
      />
    );
    let blankFilter = <InputText readOnly />;
    return (
      <div>
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["5"]}
          style={{ lineHeight: "45px" }}
        >
          <Menu.Item key="1">
            <Link to="/home/delivery">Customer Orders & Processing</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/home/delivery/orderAssign">Order Assign & Ongoing</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/home/delivery/deliveryStatus">
              Delivery Status & Recieving
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/home/delivery/deliveryService">Delivery Service</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/home/delivery/carrier">Carrier</Link>
          </Menu.Item>
        </Menu>
        <br />
        <div className="depositncredit-table-operations">
          <span onClick={this.clearAll} id="resetText">
            Reset Filter
          </span>
          <span id="showText">Show</span>
          <span id="selecNos">
            <select
              id="NoDropDown"
              onChange={event => {
                this.setState({ limit: event.target.value });
                this.props.onRequestCarrierData({
                  page: this.state.page,
                  limit: event.target.value
                });
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
            </select>
          </span>

          <button id="btnAdd" onClick={() => {
            this.setState({
              carriermodal: true
            })
          }}>Add Carrier</button>
          <button id="buttonExportCsv" onClick={() => this.export()}>
            Export CSV
          </button>
        </div>
        <Modal
          width='35vw'
          title="Add Carrier"
          wrapClassName="vertical-center-modal"
          visible={this.state.carriermodal}
          okText={"Add"}
          onOk={() => {
            if (this.state.carrierName == "")
              openNotificationWithIcon("warning", "Carrier", "Enter Carrier Name")
            else {
              let data = {
                method: "post",
                url: `delivery/insertcarrier`,
                data: {
                  carrierName: this.state.carrierName,
                },
              }

              api(data).then((res) => {
                this.setState({
                  carrierName: "",
                  carriermodal: false
                })
                openNotificationWithIcon('success', 'Carrier', 'Carrier Added SuccessFully')
                this.props.history.push("/home/delivery/carrier")
                this.props.onRequestCarrierData({
                  limit: this.state.limit,
                  page: this.state.page
                })
              })
            }

          }
          }
          onCancel={() => this.setState({ carriermodal: false })}
        >
          <div>
            <Row>
              <Col md={{ span: 5, offset: 1 }} style={{ textAlign: "right" }}>
                {" "}
                <span id="BrandSpan" className="CreateUserText">
                  {" "}
                  Carrier Name <span style={{ color: "red" }}>*</span>
                </span>
              </Col>
              <Col md={{ span: 16, offset: 1 }}>
                <InputText

                  className="CreateUserField"
                  value={this.state.carrierName}
                  onChange={e => {
                    this.setState({ carrierName: e.target.value });
                  }}
                  maxLength="30"
                />
              </Col>
            </Row>


          </div>
        </Modal>
        <DataTable
          columnResizeMode="expand"
          value={carrierList}
          resizableColumns={true}
          loading={this.props.fetching}
          loadingIcon="fas fa-spinner"
          scrollHeight={"51vh"}
          ref={el => {
            this.dt = el;
          }}
          scrollable={true}
        >
          <Column
            field="index"
            header="S.No"
            filter={true}
            filterElement={blankFilter}
            style={{ width: "50px", textAlign: "right", textAlign: "left" }}
          />
          <Column
            field="carrierName"
            header="Carrier Name"
            filterElement={carrierNameFilter}
            filter={true}
            style={{ width: "400px" }}
            className="BankId"
          />


          <Column
            field="createdAt"
            header="Order Date"
            body={this.createdAt}
            filterElement={createdDateFilter}
            filter={true}
            style={{ width: "90px", textAlign: "center" }}
            className="CreatedDate"
          />
          <Column
            field="CreatedBy"
            header="Created By"
            body={this.createdByTemplate}
            // filter={true}
            filterElement={createdByFilter}
            filter={true}
            style={{ width: "120px", textAlign: "left" }}
            className="CreatedBy"
          />

        </DataTable>

        <Pagination
          defaultCurrent={0}
          pageSize={this.state.limit}
          total={
            this.props.fetching == true
              ? 1
              : (this.props.state.data.data &&
                this.props.state.data.totalPages) * this.state.limit
          }
          onChange={current => {
            this.onPageChange(current), this.setState({ page: current });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    fetching: state.fetching,
    banklist: state.banklist
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onRequestCarrierData: data =>
      dispatch({ type: GET_CARRIER_DATA_REQUEST, data }),
    // onRequestExportCSV: (data, value) =>
    //   dispatch({ type: USER_TABLE_CSV, data, value })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Carrier);
