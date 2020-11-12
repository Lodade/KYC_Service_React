function Explore_Dashboard(props) {
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
      await dashboardController('mgmtCo', false);
    }
  }, "Mgmt Co."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      await dashboardController('prodType', false);
    }
  }, "Prod. Type"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      await dashboardController('loadType', false);
    }
  }, "Load Type"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      await dashboardController('classification', false);
    }
  }, "Classification"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      await dashboardController('risk', false);
    }
  }, "Risk"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Management Company Dashboard")), /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "PROD_TYPE"
  }, "Prod. Type:"), /*#__PURE__*/React.createElement("select", {
    id: "prodTypeChooser",
    name: "PROD_TYPE",
    size: "1"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "LOAD_TYPE"
  }, "Load Type:"), /*#__PURE__*/React.createElement("select", {
    id: "loadTypeChooser",
    name: "LOAD_TYPE",
    size: "1"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "CLASSIFICATION"
  }, "Classification"), /*#__PURE__*/React.createElement("select", {
    id: "classificationChooser",
    name: "CLASSIFICATION",
    size: "1"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All")), /*#__PURE__*/React.createElement("label", {
    htmlFor: "RISK_CLASS"
  }, "Risk"), /*#__PURE__*/React.createElement("select", {
    id: "riskChooser",
    name: "RISK_CLASS",
    size: "1"
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All"))), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    id: "fundCountsArea"
  }, /*#__PURE__*/React.createElement("table", {
    className: "dashboardTable",
    id: "fundCountsTable"
  })), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("div", {
    id: "fundDisplayArea"
  }, /*#__PURE__*/React.createElement("table", {
    className: "dashboardTable",
    id: "fundDisplayTable"
  })));
  return page;
}

function Explore_ViewProduct(props) {
  let page;
  const [showResults, changeShow] = React.useState(false);
  const [symbolText, changeSymbol] = React.useState("");
  const [result, changeResult] = React.useState();

  function resultCheck() {
    if (result != undefined) {
      if (result[0] == null) {
        console.log("No product exists by that name");
      } else {
        changeShow(true);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (symbolText != "") {
      changeResult(await queryProcess("SELECT * FROM fsrv_prod WHERE concat(MGMT_CODE, FUND_ID) = '" + symbolText + "'"));
    } else {
      console.log("No product has been entered");
    }
  }

  React.useEffect(resultCheck);

  function handleInput(e) {
    changeSymbol(e.target.value);
  }

  if (showResults) {
    page = /*#__PURE__*/React.createElement(ResultsArea, {
      queryResult: result[0]
    });
  } else {
    page = /*#__PURE__*/React.createElement(SearchProduct, {
      onSearch: handleSubmit,
      symbolInput: handleInput
    });
  }

  return page;
}

function SearchProduct(props) {
  let page = /*#__PURE__*/React.createElement("div", {
    id: "explore_viewProduct"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Product Search")), /*#__PURE__*/React.createElement("form", {
    id: "queryForm"
  }, /*#__PURE__*/React.createElement("label", null, "Enter a symbol:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "symbolInput",
    onChange: props.symbolInput
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    defaultValue: "Search",
    onClick: props.onSearch
  })));
  return page;
}

function ResultsArea(props) {
  let resultsManager = resultsBuilder();
  let rows = resultsManager.resultsHeaderPopulator(props.queryResult);
  let page = /*#__PURE__*/React.createElement("div", {
    id: "resultsArea"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", null, "Product Search"), '>', /*#__PURE__*/React.createElement("a", null, "Results")), /*#__PURE__*/React.createElement("p", {
    id: "resultsFirstRow"
  }, rows[0]), /*#__PURE__*/React.createElement("p", {
    id: "resultsSecondRow"
  }, rows[1]), /*#__PURE__*/React.createElement("table", {
    id: "resultsTable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Detail"), /*#__PURE__*/React.createElement("th", null, "Value"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Management Company Code"), /*#__PURE__*/React.createElement("td", {
    id: "MGMT_CODE"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Identifier"), /*#__PURE__*/React.createElement("td", {
    id: "FUND_ID"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "CUSIP"), /*#__PURE__*/React.createElement("td", {
    id: "CUSIP"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "ISIN"), /*#__PURE__*/React.createElement("td", {
    id: "ISIN"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Brand"), /*#__PURE__*/React.createElement("td", null)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Management Company Brand Name"), /*#__PURE__*/React.createElement("td", {
    id: "MGMT_CO_BRAND_NM"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Series"), /*#__PURE__*/React.createElement("td", {
    id: "SERIES"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "class"), /*#__PURE__*/React.createElement("td", {
    id: "CLASS"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Series-Class Sequence in Fund Name"), /*#__PURE__*/React.createElement("td", null)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "English Short Name"), /*#__PURE__*/React.createElement("td", {
    id: "ENG_SHORT_NM"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "English Long Name"), /*#__PURE__*/React.createElement("td", {
    id: "ENG_LONG_NM"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "French Short Name"), /*#__PURE__*/React.createElement("td", {
    id: "FRE_SHORT_NM"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "French Long Name"), /*#__PURE__*/React.createElement("td", {
    id: "FRE_LONG_NM"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Product Type"), /*#__PURE__*/React.createElement("td", {
    id: "FULL_PROD_TYPE"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Currency"), /*#__PURE__*/React.createElement("td", {
    id: "FULL_CURRENCY"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Load Type"), /*#__PURE__*/React.createElement("td", {
    id: "FULL_LOAD_TYPE"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Classification (CIFSC)"), /*#__PURE__*/React.createElement("td", {
    id: ""
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Tax Structure"), /*#__PURE__*/React.createElement("td", {
    id: ""
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Money Market Flag"), /*#__PURE__*/React.createElement("td", {
    id: "MM_FLAG"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Bare Trustee Flag"), /*#__PURE__*/React.createElement("td", {
    id: "BARE_TRUSTEE_FLAG"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Risk Classification"), /*#__PURE__*/React.createElement("td", {
    id: "RISK_CLASS"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fees:"), /*#__PURE__*/React.createElement("td", {
    id: ""
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Account Setup Fee"), /*#__PURE__*/React.createElement("td", {
    id: "ACCT_SETUP_FEE"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Service Fee Rate"), /*#__PURE__*/React.createElement("td", {
    id: "SERV_FEE_RATE"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Service Fee Frequency"), /*#__PURE__*/React.createElement("td", {
    id: "SERV_FEE_FREQ"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "DSC%"), /*#__PURE__*/React.createElement("td", {
    id: "CURR"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "DSC Fee Duration"), /*#__PURE__*/React.createElement("td", {
    id: "CURR"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Maximum Client Paid Commission %"), /*#__PURE__*/React.createElement("td", {
    id: "MAX_COMM"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Maximum Client Paid Switch Commission %"), /*#__PURE__*/React.createElement("td", {
    id: "MAX_SW_COMM"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Negotiated Fee"), /*#__PURE__*/React.createElement("td", {
    id: "NEGOT_FEE"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Negotiated Trailer"), /*#__PURE__*/React.createElement("td", {
    id: "NEGOT_TRAILER"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fee Based Account Eligibility"), /*#__PURE__*/React.createElement("td", {
    id: ""
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Discount Brokerage Only"), /*#__PURE__*/React.createElement("td", {
    id: "DISC_BROKER_ONLY"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Registration Document Type"), /*#__PURE__*/React.createElement("td", {
    id: "REG_DOC_TYPE"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Eligible US"), /*#__PURE__*/React.createElement("td", {
    id: "ELIG_US"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Eligible Offshore"), /*#__PURE__*/React.createElement("td", {
    id: "ELIG_OFFSHORE"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Eligible PAC"), /*#__PURE__*/React.createElement("td", {
    id: "ELIG_PAC"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Eligible SWP"), /*#__PURE__*/React.createElement("td", {
    id: "ELIG_SWP"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Effective Date"), /*#__PURE__*/React.createElement("td", {
    id: "EFF_DT"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Cut Off Time"), /*#__PURE__*/React.createElement("td", {
    id: "CUT_OFF_TIME"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Link Identifier"), /*#__PURE__*/React.createElement("td", {
    id: "FUND_LINK_ID"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Model:"), /*#__PURE__*/React.createElement("td", {
    id: ""
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Frequency"), /*#__PURE__*/React.createElement("td", {
    id: "FUND_freq"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Settlement Period"), /*#__PURE__*/React.createElement("td", {
    id: "FUND_settle"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Buy Model:"), /*#__PURE__*/React.createElement("td", {
    id: ""
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Frequency"), /*#__PURE__*/React.createElement("td", {
    id: "BUY_freq"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Settlement Period"), /*#__PURE__*/React.createElement("td", {
    id: "BUY_settle"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Sell Model:"), /*#__PURE__*/React.createElement("td", {
    id: ""
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Frequency"), /*#__PURE__*/React.createElement("td", {
    id: "SELL_freq"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Settlement Period"), /*#__PURE__*/React.createElement("td", {
    id: "SELL_settle"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Minimums:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('minimums', 'hiddenMinimums');
    }
  }, "Toggle Section"))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Initial Investment"), /*#__PURE__*/React.createElement("td", {
    id: "MIN_FIRST"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Subsequent Investment"), /*#__PURE__*/React.createElement("td", {
    id: "MIN_NXT"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Sell"), /*#__PURE__*/React.createElement("td", {
    id: "MIN_SELL"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Switch"), /*#__PURE__*/React.createElement("td", {
    id: "MIN_SW"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Account Balance"), /*#__PURE__*/React.createElement("td", {
    id: "MIN_BAL"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum PAC Investment"), /*#__PURE__*/React.createElement("td", {
    id: "MIN_PAC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum SWP"), /*#__PURE__*/React.createElement("td", {
    id: "MIN_SWP"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Eligible Provinces:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('provinces', 'hiddenProvinces');
    }
  }, "Toggle Section"), " ", /*#__PURE__*/React.createElement("span", {
    id: "provincesStatusButton",
    className: "statusButton"
  }))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Alberta"), /*#__PURE__*/React.createElement("td", {
    id: "AB_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "British Columbia"), /*#__PURE__*/React.createElement("td", {
    id: "BC_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Manitoba"), /*#__PURE__*/React.createElement("td", {
    id: "MB_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "New Brunswick"), /*#__PURE__*/React.createElement("td", {
    id: "NB_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "New Foundland"), /*#__PURE__*/React.createElement("td", {
    id: "NL_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Northwest Territories"), /*#__PURE__*/React.createElement("td", {
    id: "NT_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Nova Scotia"), /*#__PURE__*/React.createElement("td", {
    id: "NS_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Nunavut"), /*#__PURE__*/React.createElement("td", {
    id: "NU_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Ontario"), /*#__PURE__*/React.createElement("td", {
    id: "ON_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Prince Edward Island"), /*#__PURE__*/React.createElement("td", {
    id: "PE_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Quebec"), /*#__PURE__*/React.createElement("td", {
    id: "QC_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Saskatchewan"), /*#__PURE__*/React.createElement("td", {
    id: "SK_prov"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Yukon Territories"), /*#__PURE__*/React.createElement("td", {
    id: "YT_prov"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Eligible Transactions:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('transactions', 'hiddenTransactions');
    }
  }, "Toggle Section"), " ", /*#__PURE__*/React.createElement("span", {
    id: "transactionsStatusButton",
    className: "statusButton"
  }))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Buy"), /*#__PURE__*/React.createElement("td", {
    id: "B_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Commission Rebate"), /*#__PURE__*/React.createElement("td", {
    id: "CR_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Switch-in"), /*#__PURE__*/React.createElement("td", {
    id: "SI_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Switch-out"), /*#__PURE__*/React.createElement("td", {
    id: "SO_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Sell"), /*#__PURE__*/React.createElement("td", {
    id: "S_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Internal Transfer-in"), /*#__PURE__*/React.createElement("td", {
    id: "II_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Internal Transfer-out"), /*#__PURE__*/React.createElement("td", {
    id: "IO_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "External Transfer-in"), /*#__PURE__*/React.createElement("td", {
    id: "EI_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "External Transfer-out"), /*#__PURE__*/React.createElement("td", {
    id: "EO_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "LSIF Rollover-in"), /*#__PURE__*/React.createElement("td", {
    id: "LI_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "LSIF Rollover-out"), /*#__PURE__*/React.createElement("td", {
    id: "LO_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Fee"), /*#__PURE__*/React.createElement("td", {
    id: "F_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Reset"), /*#__PURE__*/React.createElement("td", {
    id: "R_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "ICT-in"), /*#__PURE__*/React.createElement("td", {
    id: "CI_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "ICT-out"), /*#__PURE__*/React.createElement("td", {
    id: "CO_status"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Seg. Maturity"), /*#__PURE__*/React.createElement("td", {
    id: "SM_status"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Accounts - Client Name:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('cnaccounts', 'hiddenCnaccounts');
    }
  }, "Toggle Section"), " ", /*#__PURE__*/React.createElement("span", {
    id: "cnaccountsStatusButton",
    className: "statusButton"
  }))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "01"), /*#__PURE__*/React.createElement("td", {
    id: "01_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "02"), /*#__PURE__*/React.createElement("td", {
    id: "02_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "04"), /*#__PURE__*/React.createElement("td", {
    id: "04_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "05"), /*#__PURE__*/React.createElement("td", {
    id: "05_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "06"), /*#__PURE__*/React.createElement("td", {
    id: "06_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "07"), /*#__PURE__*/React.createElement("td", {
    id: "07_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "08"), /*#__PURE__*/React.createElement("td", {
    id: "08_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "10"), /*#__PURE__*/React.createElement("td", {
    id: "10_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "11"), /*#__PURE__*/React.createElement("td", {
    id: "11_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "12"), /*#__PURE__*/React.createElement("td", {
    id: "12_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "13"), /*#__PURE__*/React.createElement("td", {
    id: "13_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "14"), /*#__PURE__*/React.createElement("td", {
    id: "14_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "15"), /*#__PURE__*/React.createElement("td", {
    id: "15_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "16"), /*#__PURE__*/React.createElement("td", {
    id: "16_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "17"), /*#__PURE__*/React.createElement("td", {
    id: "17_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "18"), /*#__PURE__*/React.createElement("td", {
    id: "18_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "19"), /*#__PURE__*/React.createElement("td", {
    id: "19_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "20"), /*#__PURE__*/React.createElement("td", {
    id: "20_CNACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "21"), /*#__PURE__*/React.createElement("td", {
    id: "21_CNACC"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Accounts - Nom/Inter:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('niaccounts', 'hiddenNiaccounts');
    }
  }, "Toggle Section"), " ", /*#__PURE__*/React.createElement("span", {
    id: "niaccountsStatusButton",
    className: "statusButton"
  }))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "01"), /*#__PURE__*/React.createElement("td", {
    id: "01_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "02"), /*#__PURE__*/React.createElement("td", {
    id: "02_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "04"), /*#__PURE__*/React.createElement("td", {
    id: "04_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "05"), /*#__PURE__*/React.createElement("td", {
    id: "05_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "06"), /*#__PURE__*/React.createElement("td", {
    id: "06_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "07"), /*#__PURE__*/React.createElement("td", {
    id: "07_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "08"), /*#__PURE__*/React.createElement("td", {
    id: "08_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "10"), /*#__PURE__*/React.createElement("td", {
    id: "10_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "11"), /*#__PURE__*/React.createElement("td", {
    id: "11_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "12"), /*#__PURE__*/React.createElement("td", {
    id: "12_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "13"), /*#__PURE__*/React.createElement("td", {
    id: "13_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "14"), /*#__PURE__*/React.createElement("td", {
    id: "14_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "15"), /*#__PURE__*/React.createElement("td", {
    id: "15_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "16"), /*#__PURE__*/React.createElement("td", {
    id: "16_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "17"), /*#__PURE__*/React.createElement("td", {
    id: "17_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "18"), /*#__PURE__*/React.createElement("td", {
    id: "18_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "19"), /*#__PURE__*/React.createElement("td", {
    id: "19_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "20"), /*#__PURE__*/React.createElement("td", {
    id: "20_NIACC"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "21"), /*#__PURE__*/React.createElement("td", {
    id: "21_NIACC"
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Dividend Options:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('dividends', 'hiddenDividends');
    }
  }, "Toggle Section"))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenDividends dividends"
  }, /*#__PURE__*/React.createElement("td", null, "Dividend Frequency"), /*#__PURE__*/React.createElement("td", {
    id: "DIV_FREQ"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenDividends dividends"
  }, /*#__PURE__*/React.createElement("td", null, "Distribution Offered - Reinvest"), /*#__PURE__*/React.createElement("td", {
    id: "DIV_OPT_1"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenDividends dividends"
  }, /*#__PURE__*/React.createElement("td", null, "Distribution Offered - Cash"), /*#__PURE__*/React.createElement("td", {
    id: "DIV_OPT_4"
  })), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenDividends dividends"
  }, /*#__PURE__*/React.createElement("td", null, "Distribution Offered - Redirection"), /*#__PURE__*/React.createElement("td", {
    id: "DIV_OPT_5"
  })))));
  return page;
}

function fileUpload() {
  let page = /*#__PURE__*/React.createElement("div", {
    id: "manage"
  }, /*#__PURE__*/React.createElement("form", {
    id: "uploadForm",
    method: "post",
    enctype: "multipart/form-data"
  }, /*#__PURE__*/React.createElement("label", {
    for: "xmlFileUpload"
  }, "Please input an XML file"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "file",
    id: "xmlFileUpload",
    name: "xmlFileUpload",
    accept: ".xml",
    multiple: true
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    id: "xmlSubmit",
    value: "Submit"
  })));
  return page;
}