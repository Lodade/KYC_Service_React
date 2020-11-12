function resultsBuilder() {
    let query;
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
            result[0] = "Symbol: " + resultObject.MGMT_CODE + resultObject.FUND_ID +
                " Issuer: N/A";
            result[1] = "Name: " + resultObject.ENG_LONG_NM + " Class: " + classHolder +
                " Series: " + seriesHolder + " Load: " + resultObject.LOAD_TYPE;
            return result;
        },
        resultsDetailsPopulator: async function (resultObject) {
            query = "SELECT prod.*, fpte.FULL_PROD_TYPE, flte.FULL_LOAD_TYPE, mins.*, elig.DIV_FREQ, elig.DIV_OPT_1," +
                " elig.DIV_OPT_4, elig.DIV_OPT_5, fce.FULL_CURRENCY" +
                " FROM fsrv_prod prod, fsrv_mins mins, fsrv_elig_div_opt elig, fsrv_prod_type_enum fpte, fsrv_load_type_enum flte," +
                " fsrv_currency_enum fce" +
                " WHERE prod.FSRV_ID=('" + resultObject[0].FSRV_ID + "') AND prod.FSRV_ID=mins.SEQ_ID AND prod.FSRV_ID=elig.SEQ_ID" +
                " AND prod.PROD_TYPE=fpte.PROD_TYPE AND prod.LOAD_TYPE=flte.LOAD_TYPE AND prod.CURR=fce.CURRENCY";
            let fullResults = await queryProcess(query);
            return fullResults;
        },
        cnAccountsPopulator: async function (resultObject) {
            query = "SELECT * FROM fsrv_elig_acct_types acct WHERE acct.SEQ_ID=('" + resultObject[0].FSRV_ID + "') AND acct.DESIGNATION=('1')";
            let accountResults = queryProcess(query);
            return accountResults;
        },
        niAccountsPopulator: async function (resultObject) {
            query = "SELECT * FROM fsrv_elig_acct_types acct WHERE acct.SEQ_ID=('" + resultObject[0].FSRV_ID + "') AND acct.DESIGNATION=('2')";
            accountResults = queryProcess(query);
            return accountResults;
        },
        eligProvincesPopulator: async function (resultObject) {
            let condensedResult = {
                AB: "No", BC: "No", MB: "No", NB: "No",
                NL: "No", NT: "No", NS: "No", NU: "No",
                ON: "No", PE: "No", QC: "No", SK: "No",
                YT: "No"
            };
            query = "SELECT * FROM fsrv_elig_prov prov WHERE prov.SEQ_ID=('" + resultObject[0].FSRV_ID + "')";
            let eligibleProvs = await queryProcess(query);
            for (let i = 0; i < eligibleProvs.length; i++) {
                condensedResult[eligibleProvs[i].PROV_STATE] = "Yes";
            }
            return condensedResult;
        },
        eligibleTrxnsPopulator: async function (resultObject) {
            let condensedResult = {
                B: "Not Allowed", CR: "Not Allowed", SI: "Not Allowed", SO: "Not Allowed",
                S: "Not Allowed", II: "Not Allowed", IO: "Not Allowed", EI: "Not Allowed",
                EO: "Not Allowed", LI: "Not Allowed", LO: "Not Allowed", F: "Not Allowed",
                R: "Not Allowed", CI: "Not Allowed", CO: "Not Allowed", SM: "Not Allowed"
            }
            query = "SELECT * FROM fsrv_elig_trxn trxn WHERE trxn.SEQ_ID=('" + resultObject[0].FSRV_ID + "')";
            let eligibleTrxns = await queryProcess(query);
            for(let i = 0;i < eligibleTrxns.length;i++){
                if(eligibleTrxns[i].TRXN_STATUS == "E"){
                    condensedResult[eligibleTrxns[i].TRXN_TYPE] = "Only Existing Holders Allowed";
                }else if(eligibleTrxns[i].TRXN_STATUS == "A"){
                    condensedResult[eligibleTrxns[i].TRXN_TYPE] = "Allowed";
                }
            }
            return condensedResult;
        },
        eligibleProdModelsPopulator: async function (resultObject) {
            query = "SELECT * FROM fsrv_prod_model model WHERE model.SEQ_ID=('" + resultObject[0].FSRV_ID + "')";
            let productModels = queryProcess(query);
            return productModels;
        }
    };
}