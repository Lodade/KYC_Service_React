function resultsBuilder() {
    let query;
    let condensedResult;
    let accountResults;
    return {
        /*
        This function takes in an object which contains most of the details
        about the mutual fund result. With this, it outputs an array which contains
        the two strings which identify what the resulting mutual fund from the
        search was.  
        */
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
        /*
        This function takes in an object which contains minimal details
        about the mutual fund result. With this, it returns an array 
        containing one object which has most of the details
        about the mutual fund excluding cnAccounts status,
        niAccounts status, eligible Transactions, eligible 
        provinces and eligible product models. 
        */
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
        /*
        This function takes in an object which contains minimal details
        about the mutual fund result. With this, it returns an object 
        with 21 properties, each describing if the selected mutual fund
        can reside in that number's account type.
        */
        cnAccountsPopulator: async function (resultObject) {
            condensedResult = {
                "01": "No", "02": "No", "04": "No", "05": "No",
                "06": "No", "07": "No", "08": "No", "10": "No",
                "11": "No", "12": "No", "13": "No", "14": "No",
                "15": "No", "16": "No", "17": "No", "18": "No",
                "19": "No", "20": "No", "21": "No"
            };
            query = "SELECT * FROM fsrv_elig_acct_types acct WHERE acct.SEQ_ID=('" + resultObject[0].FSRV_ID + "') AND acct.DESIGNATION=('1')";
            accountResults = await queryProcess(query);
            for (let i = 0; i < accountResults.length; i++) {
                condensedResult[accountResults[i].ACCT_TYPE] = "Yes";
            }
            return condensedResult;
        },
        /*
        This function takes in an object which contains minimal details
        about the mutual fund result. With this, it returns an object 
        with 21 properties, each describing if the selected mutual fund
        can reside in that number's account type.
        */
        niAccountsPopulator: async function (resultObject) {
            condensedResult = {
                "01": "No", "02": "No", "04": "No", "05": "No",
                "06": "No", "07": "No", "08": "No", "10": "No",
                "11": "No", "12": "No", "13": "No", "14": "No",
                "15": "No", "16": "No", "17": "No", "18": "No",
                "19": "No", "20": "No", "21": "No"
            };
            query = "SELECT * FROM fsrv_elig_acct_types acct WHERE acct.SEQ_ID=('" + resultObject[0].FSRV_ID + "') AND acct.DESIGNATION=('2')";
            accountResults = await queryProcess(query);
            for (let i = 0; i < accountResults.length; i++) {
                condensedResult[accountResults[i].ACCT_TYPE] = "Yes";
            }
            return condensedResult;
        },
        /*
        This function takes in an object which contains minimal details
        about the mutual fund result. With this, it returns an object 
        with 13 properties, each describing if the selected mutual fund
        is available in the corresponding province.
        */
        eligProvincesPopulator: async function (resultObject) {
            condensedResult = {
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
        /*
        This function takes in an object which contains minimal details
        about the mutual fund result. With this, it returns an object 
        with 16 properties, each describing if the selected mutual fund
        is allowed to undergo the designated transaction.
        */
        eligibleTrxnsPopulator: async function (resultObject) {
            condensedResult = {
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
        /*
        This function takes in an object which contains minimal details
        about the mutual fund result. With this, it returns an array 
        containing potentially multiples objects, one for each model
        the mutual fund has.
        */
        eligibleProdModelsPopulator: async function (resultObject) {
            query = "SELECT * FROM fsrv_prod_model model WHERE model.SEQ_ID=('" + resultObject[0].FSRV_ID + "')";
            let productModels = await queryProcess(query);
            console.log(productModels);
            return productModels;
        },
        /*
        This function takes in an object containing the states of
        different possible properties about a mutual fund and a string
        which describes what the "yes" or "ok" state is. With these,
        it outputs what status colour should be assigned to that set
        of properties.
        */
        statusUpdate: async function(objectToCheck, statement){
            let result = "redStatusBackground";
            let foundOne = false;
            let foundAll = true;
            let keys = Object.keys(objectToCheck);
            for(let i = 0;i < keys.length;i++){
                if(objectToCheck[keys[i]] == statement){
                    foundOne = true;
                }else if(objectToCheck[keys[i]] != statement){
                    foundAll = false;
                }
            }
            if (foundOne && foundAll) {
                result = "greenStatusBackground";
            } else if (foundOne && !foundAll) {
                result = "yellowStatusBackground";
            } else if (!foundOne && !foundAll) {
                result = "redStatusBackground";
            }
            return result;
        }
    };
}