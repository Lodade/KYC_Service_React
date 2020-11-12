function resultsBuilder() {
  async function modelsInterpreter(resultsHolder) {
    let holder;
    let freqID;
    let settleID;

    for (let i = 0; i < resultsHolder.length; i++) {
      holder = resultsHolder[i];
      freqID = holder["TYPE"] + "_freq";
      settleID = holder["TYPE"] + "_settle";
      document.getElementById(freqID).innerHTML = holder.FREQ;
      document.getElementById(settleID).innerHTML = holder.SETTLE_PERIOD;
    }
  }

  async function trxnsInterpreter(resultsHolder) {
    let holder;
    let trxnID;
    let allCount = 0;
    let statusButton = document.getElementById("transactionsStatusButton");

    for (let i = 0; i < resultsHolder.length; i++) {
      holder = resultsHolder[i];
      trxnID = holder["TRXN_TYPE"] + "_status";
      document.getElementById(trxnID).innerHTML = holder.TRXN_STATUS;

      if (holder.TRXN_STATUS == "A") {
        allCount++;
      }
    }

    await statusInterpreter(allCount, resultsHolder.length, statusButton);
  }

  async function listInterpreter(resultsHolder, list, type, check, statusButton) {
    let ID;
    let found;
    let yesCount = 0;

    for (let i = 0; i < list.length; i++) {
      found = false;
      ID = list[i] + type;

      for (let k = 0; k < resultsHolder.length; k++) {
        if (resultsHolder[k][check] == list[i]) {
          document.getElementById(ID).innerHTML = "Y";
          found = true;
          yesCount++;
        }
      }

      if (found == false) {
        document.getElementById(ID).innerHTML = "N";
      }
    }

    await statusInterpreter(yesCount, list.length, statusButton);
  }

  async function statusInterpreter(foundCount, maxCount, buttonElement) {
    if (foundCount == maxCount) {
      buttonElement.classList.add("greenStatusBackground");
    } else if (foundCount < maxCount && foundCount > 0) {
      buttonElement.classList.add("yellowStatusBackground");
    } else if (foundCount == 0) {
      buttonElement.classList.add("redStatusBackground");
    }
  }

  return {
    resultsHeaderPopulator: function (resultObject) {
      let classHolder;
      let seriesHolder;
      let result = ["", ""];

      if (resultObject.CLASS) {
        classHolder = resultObject.CLASS;
      } else {
        classHolder = "N/A";
      }

      if (resultObject.SERIES) {
        seriesHolder = resultObject.SERIES;
      } else {
        seriesHolder = "N/A";
      }

      result[0] = "Symbol: " + resultObject.MGMT_CODE + resultObject.FUND_ID + " Issuer: N/A";
      result[1] = "Name: " + resultObject.ENG_LONG_NM + " Class: " + classHolder + " Series: " + seriesHolder + " Load: " + resultObject.LOAD_TYPE;
      return result;
    },
    resultsDetailsPopulator: function () {
      let query = "SELECT prod.*, fpte.FULL_PROD_TYPE, flte.FULL_LOAD_TYPE, mins.*, elig.DIV_FREQ, elig.DIV_OPT_1," + " elig.DIV_OPT_4, elig.DIV_OPT_5, fce.FULL_CURRENCY" + " FROM fsrv_prod prod, fsrv_mins mins, fsrv_elig_div_opt elig, fsrv_prod_type_enum fpte, fsrv_load_type_enum flte," + " fsrv_currency_enum fce" + " WHERE prod.FSRV_ID=('" + resultObject.FSRV_ID + "') AND prod.FSRV_ID=mins.SEQ_ID AND prod.FSRV_ID=elig.SEQ_ID" + " AND prod.PROD_TYPE=fpte.PROD_TYPE AND prod.LOAD_TYPE=flte.LOAD_TYPE AND prod.CURR=fce.CURRENCY";
      let fullResults = queryProcess(query);
      fullResults = fullResults[0];
      console.log(fullResults);
      let objectKeys = Object.keys(fullResults);
      let holder;
      let elementHolder;

      for (let i = 0; i < objectKeys.length; i++) {
        holder = fullResults[objectKeys[i]];

        if (document.getElementById(objectKeys[i]) != null) {
          elementHolder = document.getElementById(objectKeys[i]);
          elementHolder.innerHTML = holder;
        }
      }

      query = "SELECT * FROM fsrv_elig_acct_types acct WHERE acct.SEQ_ID=('" + resultObject.FSRV_ID + "') AND acct.DESIGNATION=('1')";
      let accountResults = queryProcess(query);
      console.log(accountResults);
      let statusButton = document.getElementById("cnaccountsStatusButton");
      listInterpreter(accountResults, ["01", "02", "04", "05", "06", "07", "08", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"], "_CNACC", "ACCT_TYPE", statusButton);
      query = "SELECT * FROM fsrv_elig_acct_types acct WHERE acct.SEQ_ID=('" + resultObject.FSRV_ID + "') AND acct.DESIGNATION=('2')";
      accountResults = queryProcess(query);
      console.log(accountResults);
      statusButton = document.getElementById("niaccountsStatusButton");
      listInterpreter(accountResults, ["01", "02", "04", "05", "06", "07", "08", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21"], "_NIACC", "ACCT_TYPE", statusButton);
      query = "SELECT * FROM fsrv_elig_prov prov WHERE prov.SEQ_ID=('" + resultObject.FSRV_ID + "')";
      let eligibleProvs = queryProcess(query);
      console.log(eligibleProvs);
      statusButton = document.getElementById("provincesStatusButton");
      listInterpreter(eligibleProvs, ["AB", "BC", "MB", "NB", "NL", "NT", "NS", "NU", "ON", "PE", "QC", "SK", "YT"], "_prov", "PROV_STATE", statusButton);
      query = "SELECT * FROM fsrv_elig_trxn trxn WHERE trxn.SEQ_ID=('" + resultObject.FSRV_ID + "')";
      let eligibleTrxns = queryProcess(query);
      console.log(eligibleTrxns);
      trxnsInterpreter(eligibleTrxns);
      query = "SELECT * FROM fsrv_prod_model model WHERE model.SEQ_ID=('" + resultObject.FSRV_ID + "')";
      let productModels = queryProcess(query);
      console.log(productModels);
      modelsInterpreter(productModels);
    }
  };
}