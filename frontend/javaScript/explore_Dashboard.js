/*
This function returns the Explore_Dashboard object which
allows you to view all of the mutual funds broken down by management company,
product type, load type, classification type and risk class type. Each of these types
can also be filtered by their product type, load type, classification type and 
risk class type respectively.
*/
function Explore_Dashboard(props) {
  let dashManager = dashboardManager();
  let filterNames = ["PROD_TYPE", "LOAD_TYPE", "CLASSIFICATION", "RISK_CLASS"];
  const [firstRun, changeRun] = React.useState(true);
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
  React.useEffect(() => {
    if (firstRun == true) {
      dashboardUpdate(currentName, [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
      changeRun(false);
    }
  });

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

  let page = /*#__PURE__*/React.createElement("div", {
    id: "explore_dashboard"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton"
  }, "Fundserv"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton"
  }, "Fundata"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      changeName("mgmtCo");
      await dashboardUpdate("mgmtCo", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
    }
  }, "Mgmt Co."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      changeName("prodType");
      await dashboardUpdate("prodType", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
    }
  }, "Prod. Type"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      changeName("loadType");
      await dashboardUpdate("loadType", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
    }
  }, "Load Type"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      changeName("classification");
      await dashboardUpdate("classification", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
    }
  }, "Classification"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      changeName("risk");
      await dashboardUpdate("risk", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
    }
  }, "Risk"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Management Company Dashboard")), /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "PROD_TYPE"
  }, "Prod. Type: "), /*#__PURE__*/React.createElement("select", {
    id: "prodTypeChooser",
    name: filterNames[0],
    size: "1",
    onChange: async e => changeFilter(e.target.value, 0)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All"), /*#__PURE__*/React.createElement(FilterSet, {
    name: filterNames[0],
    hasEnum: true,
    dashManage: dashManager
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "LOAD_TYPE"
  }, " Load Type: "), /*#__PURE__*/React.createElement("select", {
    id: "loadTypeChooser",
    name: filterNames[1],
    size: "1",
    onChange: async e => changeFilter(e.target.value, 1)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All"), /*#__PURE__*/React.createElement(FilterSet, {
    name: filterNames[1],
    hasEnum: true,
    dashManage: dashManager
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "CLASSIFICATION"
  }, " Classification: "), /*#__PURE__*/React.createElement("select", {
    id: "classificationChooser",
    name: filterNames[2],
    size: "1",
    onChange: async e => changeFilter(e.target.value, 2)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All"), /*#__PURE__*/React.createElement(FilterSet, {
    name: filterNames[2],
    hasEnum: true,
    dashManage: dashManager
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "RISK_CLASS"
  }, " Risk: "), /*#__PURE__*/React.createElement("select", {
    id: "riskChooser",
    name: filterNames[3],
    size: "1",
    onChange: async e => changeFilter(e.target.value, 3)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All"), /*#__PURE__*/React.createElement(FilterSet, {
    name: filterNames[3],
    hasEnum: false,
    dashManage: dashManager
  }))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
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