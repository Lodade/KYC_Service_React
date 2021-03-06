/*
This function returns the ResultsArea react object which contains the table
for displaying all of the technical details about the particular mutual fund that
was searched for in the SearchProduct interface
*/
function ResultsArea(props) {
  let resultsManager = resultsBuilder();
  let topRows = resultsManager.resultsHeaderPopulator(props.fullResults);
  const {
    showResults,
    changeShow
  } = React.useContext(ResultsContext);
  const [cnStatus, changeCNStatus] = React.useState("redStatusBackground");
  const [niStatus, changeNIStatus] = React.useState("redStatusBackground");
  const [provStatus, changeProvStatus] = React.useState("redStatusBackground");
  const [transStatus, changeTransStatus] = React.useState("redStatusBackground");

  async function checkStatus() {
    changeCNStatus(await resultsManager.statusUpdate(props.cnAccs, "Yes"));
    changeNIStatus(await resultsManager.statusUpdate(props.niAccs, "Yes"));
    changeProvStatus(await resultsManager.statusUpdate(props.eligProvs, "Yes"));
    changeTransStatus(await resultsManager.statusUpdate(props.eligTrxns, "Allowed"));
  }

  React.useEffect(async () => {
    await checkStatus();
  });
  let page = /*#__PURE__*/React.createElement("div", {
    id: "resultsArea"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("a", {
    onClick: async () => {
      changeShow(false);
    }
  }, "Product Search"), '>', /*#__PURE__*/React.createElement("a", null, "Results")), /*#__PURE__*/React.createElement("p", {
    id: "resultsFirstRow"
  }, topRows[0]), /*#__PURE__*/React.createElement("p", {
    id: "resultsSecondRow"
  }, topRows[1]), /*#__PURE__*/React.createElement("table", {
    id: "resultsTable"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Product Detail"), /*#__PURE__*/React.createElement("th", null, "Value"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Management Company Code"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MGMT_CODE)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Identifier"), /*#__PURE__*/React.createElement("td", null, props.fullResults.FUND_ID)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "CUSIP"), /*#__PURE__*/React.createElement("td", null, props.fullResults.CUSIP)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "ISIN"), /*#__PURE__*/React.createElement("td", null, props.fullResults.ISIN)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Brand"), /*#__PURE__*/React.createElement("td", null, props.fullResults.BRAND)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Management Company Brand Name"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MGMT_CO_BRAND_NM)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Series"), /*#__PURE__*/React.createElement("td", null, props.fullResults.SERIES)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Class"), /*#__PURE__*/React.createElement("td", null, props.fullResults.CLASS)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Series-Class Sequence in Fund Name"), /*#__PURE__*/React.createElement("td", null, props.fullResults.SER_CLASS_SEQ_IN_NAME)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "English Short Name"), /*#__PURE__*/React.createElement("td", null, props.fullResults.ENG_SHORT_NM)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "English Long Name"), /*#__PURE__*/React.createElement("td", null, props.fullResults.ENG_LONG_NM)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "French Short Name"), /*#__PURE__*/React.createElement("td", null, props.fullResults.FRE_SHORT_NM)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "French Long Name"), /*#__PURE__*/React.createElement("td", null, props.fullResults.FRE_LONG_NM)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Product Type"), /*#__PURE__*/React.createElement("td", null, props.fullResults.FULL_PROD_TYPE)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Currency"), /*#__PURE__*/React.createElement("td", null, props.fullResults.FULL_CURRENCY)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Load Type"), /*#__PURE__*/React.createElement("td", null, props.fullResults.FULL_LOAD_TYPE)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Classification (CIFSC)"), /*#__PURE__*/React.createElement("td", null, props.fullResults.CLASSIFICATION)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Tax Structure"), /*#__PURE__*/React.createElement("td", null, props.fullResults.TAX_STRUCT)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Money Market Flag"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MM_FLAG)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Bare Trustee Flag"), /*#__PURE__*/React.createElement("td", null, props.fullResults.BARE_TRUSTEE_FLAG)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Risk Classification"), /*#__PURE__*/React.createElement("td", null, props.fullResults.RISK_CLASS)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fees:"), /*#__PURE__*/React.createElement("td", {
    id: ""
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Account Setup Fee"), /*#__PURE__*/React.createElement("td", null, props.fullResults.ACCT_SETUP_FEE)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Service Fee Rate"), /*#__PURE__*/React.createElement("td", null, props.fullResults.SERV_FEE_RATE)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Service Fee Frequency"), /*#__PURE__*/React.createElement("td", null, props.fullResults.SERV_FEE_FREQ)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "DSC%"), /*#__PURE__*/React.createElement("td", null, props.fullResults.DSC)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "DSC Fee Duration"), /*#__PURE__*/React.createElement("td", null, props.fullResults.DSC_DURATION)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Maximum Client Paid Commission %"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MAX_COMM)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Maximum Client Paid Switch Commission %"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MAX_SW_COMM)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Negotiated Fee"), /*#__PURE__*/React.createElement("td", null, props.fullResults.NEGOT_FEE)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Negotiated Trailer"), /*#__PURE__*/React.createElement("td", null, props.fullResults.NEGOT_TRAILER)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fee Based Account Eligibility"), /*#__PURE__*/React.createElement("td", {
    id: ""
  })), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Discount Brokerage Only"), /*#__PURE__*/React.createElement("td", null, props.fullResults.DISC_BROKER_ONLY)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Registration Document Type"), /*#__PURE__*/React.createElement("td", null, props.fullResults.REG_DOC_TYPE)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Eligible US"), /*#__PURE__*/React.createElement("td", null, props.fullResults.ELIG_US)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Eligible Offshore"), /*#__PURE__*/React.createElement("td", null, props.fullResults.ELIG_OFFSHORE)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Eligible PAC"), /*#__PURE__*/React.createElement("td", null, props.fullResults.ELIG_PAC)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Eligible SWP"), /*#__PURE__*/React.createElement("td", null, props.fullResults.ELIG_SWP)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Effective Date"), /*#__PURE__*/React.createElement("td", null, props.fullResults.EFF_DT)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Cut Off Time"), /*#__PURE__*/React.createElement("td", null, props.fullResults.CUT_OFF_TIME)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Link Identifier"), /*#__PURE__*/React.createElement("td", null, props.fullResults.FUND_LINK_ID)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Fund Model:"), /*#__PURE__*/React.createElement("td", {
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
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Initial Investment"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MIN_FIRST)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Subsequent Investment"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MIN_NXT)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Sell"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MIN_SELL)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Switch"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MIN_SW)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum Account Balance"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MIN_BAL)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum PAC Investment"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MIN_PAC)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenMinimums minimums"
  }, /*#__PURE__*/React.createElement("td", null, "Minimum SWP"), /*#__PURE__*/React.createElement("td", null, props.fullResults.MIN_SWP)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Eligible Provinces:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('provinces', 'hiddenProvinces');
    }
  }, "Toggle Section"), " ", /*#__PURE__*/React.createElement("span", {
    id: "provincesStatusButton",
    className: "statusButton " + provStatus
  }))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Alberta"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.AB)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "British Columbia"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.BC)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Manitoba"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.MB)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "New Brunswick"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.NB)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "New Foundland"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.NL)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Northwest Territories"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.NT)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Nova Scotia"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.NS)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Nunavut"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.NU)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Ontario"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.ON)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Prince Edward Island"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.PE)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Quebec"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.QC)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Saskatchewan"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.SK)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenProvinces provinces"
  }, /*#__PURE__*/React.createElement("td", null, "Yukon Territories"), /*#__PURE__*/React.createElement("td", null, props.eligProvs.YT)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Eligible Transactions:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('transactions', 'hiddenTransactions');
    }
  }, "Toggle Section"), " ", /*#__PURE__*/React.createElement("span", {
    id: "transactionsStatusButton",
    className: "statusButton " + transStatus
  }))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Buy"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.B)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Commission Rebate"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.CR)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Switch-in"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.SI)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Switch-out"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.SO)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Sell"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.S)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Internal Transfer-in"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.II)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Internal Transfer-out"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.IO)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "External Transfer-in"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.EI)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "External Transfer-out"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.EO)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "LSIF Rollover-in"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.LI)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "LSIF Rollover-out"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.LO)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Fee"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.F)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Reset"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.R)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "ICT-in"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.CI)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "ICT-out"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.CO)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenTransactions transactions"
  }, /*#__PURE__*/React.createElement("td", null, "Seg. Maturity"), /*#__PURE__*/React.createElement("td", null, props.eligTrxns.SM)), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Accounts - Client Name:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('cnaccounts', 'hiddenCnaccounts');
    }
  }, "Toggle Section"), " ", /*#__PURE__*/React.createElement("span", {
    id: "cnaccountsStatusButton",
    className: "statusButton " + cnStatus
  }))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "Open"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["01"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RRSP"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["02"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RRIF"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["04"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RESP - Individual Plan"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["05"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RESP - Family Plan"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["06"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "DPSP"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["07"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RHOSP (Quebec Only)"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["08"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "LIF"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["10"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "LIRA"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["11"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "LRIF (Alberta, Saskatchewan)"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["12"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RRTF (Quebec Only)"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["13"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "PRIF"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["14"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RPP - Defined Benefit"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["15"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RPP - Defined Contribution"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["16"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "TFSA - Tax Free Savings Account"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["17"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RDSP - Registered Disability Savings Plan"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["18"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RLIF - Restricted Life Income Fund"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["19"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RLSP - Restricted Locked-In Savings Plan"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["20"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenCnaccounts cnaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "IPP - Individual Pension Plan"), /*#__PURE__*/React.createElement("td", null, props.cnAccs["21"])), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Accounts - Nom/Inter:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('niaccounts', 'hiddenNiaccounts');
    }
  }, "Toggle Section"), " ", /*#__PURE__*/React.createElement("span", {
    id: "niaccountsStatusButton",
    className: "statusButton " + niStatus
  }))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "Open"), /*#__PURE__*/React.createElement("td", null, props.niAccs["01"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RRSP"), /*#__PURE__*/React.createElement("td", null, props.niAccs["02"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RRIF"), /*#__PURE__*/React.createElement("td", null, props.niAccs["04"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RESP - Individual Plan"), /*#__PURE__*/React.createElement("td", null, props.niAccs["05"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RESP - Family Plan"), /*#__PURE__*/React.createElement("td", null, props.niAccs["06"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "DPSP"), /*#__PURE__*/React.createElement("td", null, props.niAccs["07"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RHOSP (Quebec Only)"), /*#__PURE__*/React.createElement("td", null, props.niAccs["08"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "LIF"), /*#__PURE__*/React.createElement("td", null, props.niAccs["10"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "LIRA"), /*#__PURE__*/React.createElement("td", null, props.niAccs["11"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "LRIF (Alberta, Saskatchewan)"), /*#__PURE__*/React.createElement("td", null, props.niAccs["12"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RRTF (Quebec only)"), /*#__PURE__*/React.createElement("td", null, props.niAccs["13"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "PRIF"), /*#__PURE__*/React.createElement("td", null, props.niAccs["14"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RPP - Defined Benefit"), /*#__PURE__*/React.createElement("td", null, props.niAccs["15"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RPP - Defined Contribution"), /*#__PURE__*/React.createElement("td", null, props.niAccs["16"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "TFSA - Tax Free Savings Account"), /*#__PURE__*/React.createElement("td", null, props.niAccs["17"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RDSP - Registered Disability Savings Plan"), /*#__PURE__*/React.createElement("td", null, props.niAccs["18"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RLIF - Restricted Life Income Fund"), /*#__PURE__*/React.createElement("td", null, props.niAccs["19"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "RLSP - Restricted Locked-In Savings Plan"), /*#__PURE__*/React.createElement("td", null, props.niAccs["20"])), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenNiaccounts niaccounts"
  }, /*#__PURE__*/React.createElement("td", null, "IPP - Individual Pension Plan"), /*#__PURE__*/React.createElement("td", null, props.niAccs["21"])), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("b", null, "Dividend Options:")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "expandButton",
    onClick: async () => {
      await toggleDetails('dividends', 'hiddenDividends');
    }
  }, "Toggle Section"))), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenDividends dividends"
  }, /*#__PURE__*/React.createElement("td", null, "Dividend Frequency"), /*#__PURE__*/React.createElement("td", {
    id: "DIV_FREQ"
  }, props.fullResults.DIV_FREQ)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenDividends dividends"
  }, /*#__PURE__*/React.createElement("td", null, "Distribution Offered - Reinvest"), /*#__PURE__*/React.createElement("td", {
    id: "DIV_OPT_1"
  }, props.fullResults.DIV_OPT_1)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenDividends dividends"
  }, /*#__PURE__*/React.createElement("td", null, "Distribution Offered - Cash"), /*#__PURE__*/React.createElement("td", {
    id: "DIV_OPT_4"
  }, props.fullResults.DIV_OPT_4)), /*#__PURE__*/React.createElement("tr", {
    className: "hiddenDividends dividends"
  }, /*#__PURE__*/React.createElement("td", null, "Distribution Offered - Redirection"), /*#__PURE__*/React.createElement("td", {
    id: "DIV_OPT_5"
  }, props.fullResults.DIV_OPT_5)))));
  return page;
}