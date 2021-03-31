/*
This functions returns the Explore_ViewProduct react object which contains
and swaps the SearchProduct and ResultsArea objects which allows for the 
user to search for a mutual fund by it's management code and fund id using the
SearchProduct interface and to view the fund's details using the Results Area
assuming that they put in a valid fund. 
*/
function Explore_ViewProduct(props) {
  let page;
  let resultsManager = resultsBuilder();
  const [showResults, changeShow] = React.useState(false);
  const [symbolText, changeSymbol] = React.useState("");
  const [result, changeResult] = React.useState();
  const [cnAccounts, changeCN] = React.useState({
    "01": "No",
    "02": "No",
    "04": "No",
    "05": "No",
    "06": "No",
    "07": "No",
    "08": "No",
    "10": "No",
    "11": "No",
    "12": "No",
    "13": "No",
    "14": "No",
    "15": "No",
    "16": "No",
    "17": "No",
    "18": "No",
    "19": "No",
    "20": "No",
    "21": "No"
  });
  const [niAccounts, changeNI] = React.useState({
    "01": "No",
    "02": "No",
    "04": "No",
    "05": "No",
    "06": "No",
    "07": "No",
    "08": "No",
    "10": "No",
    "11": "No",
    "12": "No",
    "13": "No",
    "14": "No",
    "15": "No",
    "16": "No",
    "17": "No",
    "18": "No",
    "19": "No",
    "20": "No",
    "21": "No"
  });
  const [eligProvinces, changeProvinces] = React.useState({
    AB: "No",
    BC: "No",
    MB: "No",
    NB: "No",
    NL: "No",
    NT: "No",
    NS: "No",
    NU: "No",
    ON: "No",
    PE: "No",
    QC: "No",
    SK: "No",
    YT: "No"
  });
  const [eligTransactions, changeTrxns] = React.useState({
    B: "Not Allowed",
    CR: "Not Allowed",
    SI: "Not Allowed",
    SO: "Not Allowed",
    S: "Not Allowed",
    II: "Not Allowed",
    IO: "Not Allowed",
    EI: "Not Allowed",
    EO: "Not Allowed",
    LI: "Not Allowed",
    LO: "Not Allowed",
    F: "Not Allowed",
    R: "Not Allowed",
    CI: "Not Allowed",
    CO: "Not Allowed",
    SM: "Not Allowed"
  });
  const [eligProdModels, changeProdModels] = React.useState();

  function resultCheck() {
    if (result != undefined) {
      if (result[0] == null) {
        changeResult();
      } else {
        changeShow(true);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let basicResults = queryProcess("SELECT * FROM fsrv_prod WHERE concat(MGMT_CODE, FUND_ID) = '" + symbolText + "'");

    if (symbolText != "") {
      await basicResults.then(async values => {
        if (values.length != 0) {
          changeResult(await resultsManager.resultsDetailsPopulator(values));
          changeCN(await resultsManager.cnAccountsPopulator(values));
          changeNI(await resultsManager.niAccountsPopulator(values));
          changeProvinces(await resultsManager.eligProvincesPopulator(values));
          changeTrxns(await resultsManager.eligibleTrxnsPopulator(values));
          changeProdModels(await resultsManager.eligibleProdModelsPopulator(values));
        } else {
          console.log("No product exists by that name");
        }
      });
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
      fullResults: result[0],
      cnAccs: cnAccounts,
      niAccs: niAccounts,
      eligModels: eligProdModels,
      eligProvs: eligProvinces,
      eligTrxns: eligTransactions
    });
  } else {
    page = /*#__PURE__*/React.createElement(SearchProduct, {
      onSearch: handleSubmit,
      symbolInput: handleInput
    });
  }

  return page;
}