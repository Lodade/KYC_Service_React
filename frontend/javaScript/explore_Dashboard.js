/*
This function returns the Explore_Dashboard object which
allows you to view all of the mutual funds broken down by management company,
product type, load type, classification type and risk class type. Each of these types
can also be filtered by their product type, load type, classification type and 
risk class type respectively.
*/
function Explore_Dashboard(props) {
  const dashManager = dashboardManager();
  const filterNames = ["PROD_TYPE", "LOAD_TYPE", "CLASSIFICATION", "RISK_CLASS"];
  const [prodTypeChoice, changeProdType] = React.useState("");
  const [loadTypeChoice, changeLoadType] = React.useState("");
  const [classificationChoice, changeClassification] = React.useState("");
  const [riskClassChoice, changeRiskClass] = React.useState("");
  const [countTableContents, changeCountContents] = React.useState([{
    MGMT_CODE: "",
    FUND_COUNT: "",
    DISTINCT_FUND_COUNT: ""
  }]);
  const [displayTableContents, changeDisplayContents] = React.useState([]);
  const [currentName, changeName] = React.useState("mgmtCo");
  const [countHeaders, changeCountHeaders] = React.useState(["Mgmt Code", "Fund Count", "Distinct Fund Count"]);
  const [displayHeaders, changeDisplayHeaders] = React.useState(["Management Code + Fund ID", "English Long Name"]);
  React.useEffect(async () => {
    await dashboardUpdate(currentName, [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
  }, []);

  async function dashboardUpdate(name, filters) {
    changeCountContents(await dashManager.queryChooser(name, filterNames, filters));
    changeCountHeaders(await dashManager.headerChooser(name));
  }

  async function displayTableUpdate(queryType, queryValue) {
    let filterPart = await dashManager.filterGrab([prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice], filterNames, true);
    let query = "SELECT CONCAT(MGMT_CODE, FUND_ID), ENG_LONG_NM FROM fsrv_prod f WHERE f." + queryType + "=('" + queryValue + "')" + filterPart;
    changeDisplayContents(await queryProcess(query));
  }

  async function changeFilter(value, type) {
    switch (type) {
      case 0:
        changeProdType(value);
        await dashboardUpdate(currentName, [value, loadTypeChoice, classificationChoice, riskClassChoice]);
        break;

      case 1:
        changeLoadType(value);
        await dashboardUpdate(currentName, [prodTypeChoice, value, classificationChoice, riskClassChoice]);
        break;

      case 2:
        changeClassification(value);
        await dashboardUpdate(currentName, [prodTypeChoice, loadTypeChoice, value, riskClassChoice]);
        break;

      case 3:
        changeRiskClass(value);
        await dashboardUpdate(currentName, [prodTypeChoice, loadTypeChoice, classificationChoice, value]);
        break;
    }
  }

  async function updateTableType(type) {
    changeName(type);
    await dashboardUpdate(type, [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
  }

  let page = /*#__PURE__*/React.createElement("div", {
    id: "explore_dashboard"
  }, /*#__PURE__*/React.createElement(TableTypeButton, {
    type: "mgmtCo",
    updateTableType: updateTableType,
    buttonText: "Mgmt. Co"
  }), /*#__PURE__*/React.createElement(TableTypeButton, {
    type: "prodType",
    updateTableType: updateTableType,
    buttonText: "Prod. Type"
  }), /*#__PURE__*/React.createElement(TableTypeButton, {
    type: "loadType",
    updateTableType: updateTableType,
    buttonText: "Load Type"
  }), /*#__PURE__*/React.createElement(TableTypeButton, {
    type: "classification",
    updateTableType: updateTableType,
    buttonText: "Classification"
  }), /*#__PURE__*/React.createElement(TableTypeButton, {
    type: "risk",
    updateTableType: updateTableType,
    buttonText: "Risk"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Management Company Dashboard")), /*#__PURE__*/React.createElement(FilterButtons, {
    filterNames: filterNames,
    changeFilter: changeFilter
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    id: "fundCountsArea"
  }, /*#__PURE__*/React.createElement("table", {
    className: "dashboardTable",
    id: "fundCountsTable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement(TableHeaders, {
    input: countHeaders
  })), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement(CountRows, {
    output: countTableContents,
    displayChange: displayTableUpdate
  })))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    id: "fundDisplayArea"
  }, /*#__PURE__*/React.createElement("table", {
    className: "dashboardTable",
    id: "fundDisplayTable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement(TableHeaders, {
    input: displayHeaders
  })), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement(DisplayRows, {
    output: displayTableContents
  })))));
  return page;
}