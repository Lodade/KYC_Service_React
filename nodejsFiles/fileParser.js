let xml2js = require("xml2js");
let fs = require("fs");
const e = require("express");
let mariadb = require("mariadb");
const { EAFNOSUPPORT } = require("constants");
let parser = xml2js.Parser();
/*
This function opens a connection pool to perform bulk queries
to the MariaDB database and returns the reference to the pool.
*/
async function createMariadbConnectionPool() {
    let tempPool;
    try {
        tempPool = mariadb.createPool({
            host: "localhost",
            user: "root",
            password: "kyc_service",
            database: "kyc_test",
            connectionLimit: 20
        });
    } catch (err) {
        throw err;
    }
    return tempPool;
}
/*
This function opens a connection pool and calls the fundlistReader
function with the pool
*/
async function fundlistTest() {
    let pool = await createMariadbConnectionPool();
    await fundlistReader(pool);
}
/*
This statement looks for the "run" argument when calling the fileParser
file. This prevents errors when calling the file from the mainFile
as a required file.
*/
if (process.argv[2] == "run") {
    fundlistTest();
}
/*
This function takes in a MariaDB connection pool, an array with
the row content to be inserted into the database and an sql statement
describing how to insert the data. It then iterates through
the rowContent and bulkInserts the data in batches of 1000 into
the database using the sql statement.
*/
async function tableInserter(pool, rowContent, sql) {
    let bulkContent = [];
    let bulkContentSpot = 0;
    for (let i = 0; i < rowContent.length; i++) {
        bulkContent[bulkContentSpot] = rowContent[i];
        bulkContentSpot++;
        if (bulkContentSpot >= 1000) {
            await bulkInsert(pool, bulkContent, sql);
            bulkContent = [];
            bulkContentSpot = 0;
        }
    }
    if (bulkContent[0] != null) {
        await bulkInsert(pool, bulkContent, sql);
    }
}
/*
This function takes in the data from the file referenced in
the flatFileReader function, an array containing the columns
of the file which need to be parsed into numbers, the connection
pool for the MariaDB database and the sql statement to be used
for the tableInserter function. With these, it breaks down the 
file data into the subDividedRowsArray 2D array which contains
all of the content of the rows in the file. It then finishes
by sending the array to the tableInserter function.
*/
async function flatFileInterpreter(data, columnsToFormat, pool, sql) {
    let rowsArray = data.split("\r\n");
    let rowLength = (rowsArray[0].split("|")).length;
    let firstLine = rowsArray[0].split("|");
    let subdividedRowsArray = [];
    let longestInColumn = [];
    let longestItemInColumn = [];
    let easyView = [];
    for (let i = 0; i < rowLength; i++) {
        longestInColumn[i] = 0;
    }
    for (let k = 0; k < (rowsArray.length - 1); k++) {
        if (k != 0) {
            subdividedRowsArray[k - 1] = rowsArray[k].split("|");
            for (let i = 0; i < subdividedRowsArray[k - 1].length; i++) {
                if (subdividedRowsArray[k - 1][i] == "") {
                    subdividedRowsArray[k - 1][i] = null;
                }
                if (columnsToFormat.indexOf(i) > -1 && subdividedRowsArray[k - 1][i] != null) {
                    subdividedRowsArray[k - 1][i] = parseFloat(subdividedRowsArray[k - 1][i]);
                }
                if (subdividedRowsArray[k - 1][i] != null && subdividedRowsArray[k - 1][i].toString().length > longestInColumn[i]) {
                    longestInColumn[i] = subdividedRowsArray[k - 1][i].toString().length;
                    longestItemInColumn[i] = subdividedRowsArray[k - 1][i];
                }
            }
        }
    }
    for (let i = 0; i < rowLength; i++) {
        easyView[i] = firstLine[i] + " " + longestInColumn[i] + " " + longestItemInColumn[i];
    }
    console.log(easyView);
    await tableInserter(pool, subdividedRowsArray, sql);
    return true;
}
/*
This function takes in the filename for the flat file that is
being processed, the columns which will later be parsed into 
numbers, the connection pool for the MariaDB database and
the sql statement which will later be used for inserting the
data into the database. With these, it reads the referenced file
and sends the file contents to the flatFileInterpreter function.
*/
async function flatFileReader(filename, columnsToFormat, pool, sql) {
    fs.readFile(__dirname + "/uploads/" + filename, 'utf8', async function (err, data) {
        let lock = false;
        lock = await flatFileInterpreter(data, columnsToFormat, pool, sql);
        if (lock) {
            pool.end();
        }
    });
}
/*
This functions takes in the connection pool for the MariaDB database.
With this, it reads in the FUNDLIST file and sends the pool and file
contents to the multiple parsers to send to the database.
*/
async function fundlistReader(pool) {
    fs.readFile(__dirname + "/uploads/FUNDLIST_I110.xml", 'utf8', async function (err, data) {
        let lock = false;
        lock = await fsrv_prodParser(err, data, pool);
        if (lock) {
            lock = false;
            await fsrv_prod_modelParser(err, data, pool);
            await fsrv_minsParser(err, data, pool);
            await fsrv_elig_provParser(err, data, pool);
            await fsrv_elig_trxnParser(err, data, pool);
            await fsrv_elig_acct_typesParser(err, data, pool);
            lock = await fsrv_elig_div_optParser(err, data, pool);
        }
        if (lock) {
            pool.end();
        }
    });
}
/*
This functions takes in the FUNDLIST file contents and the
connection pool for the MariaDB database. With these, it 
iterates through each fund company's fund list, picks
out the data which goes into the fsrv_prod table and sends
the data for each row in batches of 1000 to the database.
*/
async function fsrv_prodParser(err, data, pool) {
    let result;
    parser.parseString(data, async function (err, output) {
        result = output;
    });
    let completedNum = 0;
    let bulkContent = [];
    let bulkContentSpot = 0;
    let curProdArray = [];
    let selectedProduct = "";
    let fundListNum = result.FundSetup.FundList.length;
    let currMgmtCode = "";
    let currCutOffTime = "";
    let effDate = result.FundSetup.Date[0];
    effDate = effDate.substring(0, 4) + "-" + effDate.substring(4, 6) + "-"
        + effDate.substring(6, 8);
    for (let a = 0; a < fundListNum; a++) {
        currMgmtCode = result.FundSetup.FundList[a].MgmtCode[0];
        let investProductNum = result.FundSetup.FundList[a].InvstProduct.length;
        for (let b = 0; b < investProductNum; b++) {
            selectedProduct = result.FundSetup.FundList[a].InvstProduct[b];
            curProdArray[0] = currMgmtCode;
            curProdArray[1] = effDate;
            curProdArray[2] = selectedProduct.FundID[0];
            curProdArray[3] = selectedProduct.FundLinkID[0];
            currCutOffTime = selectedProduct.CutoffTime[0];
            curProdArray[4] = currCutOffTime.substring(0, 2) +
                ":" + currCutOffTime.substring(2, 4) + ":" +
                currCutOffTime.substring(4, 6);
            curProdArray[5] = selectedProduct.MgmtCoBrandNm[0];
            curProdArray[6] = selectedProduct.FundName[0].EngName[0].ShortName[0];
            curProdArray[7] = selectedProduct.FundName[0].EngName[0].LongName[0];
            curProdArray[8] = selectedProduct.FundName[0].FreName[0].ShortName[0];
            curProdArray[9] = selectedProduct.FundName[0].FreName[0].LongName[0];
            curProdArray[10] = selectedProduct.Properties[0].ProductType[0];
            curProdArray[11] = selectedProduct.Properties[0].Currency[0];
            curProdArray[12] = selectedProduct.Properties[0].LoadType[0];
            if (selectedProduct.Properties[0].Classification) {
                curProdArray[13] = selectedProduct.Properties[0].Classification[0];
            } else {
                curProdArray[13] = null;
            }
            curProdArray[14] = selectedProduct.Properties[0].TaxStructure[0];
            curProdArray[15] = selectedProduct.Properties[0].MoneyMrktFlg[0];
            curProdArray[16] = selectedProduct.Properties[0].BareTrusteeFlg[0];
            curProdArray[17] = selectedProduct.Properties[0].RiskClass[0];
            curProdArray[18] = parseFloat(selectedProduct.Properties[0].FeeComm[0].AcctSetupFee[0]);
            curProdArray[19] = parseFloat(selectedProduct.Properties[0].FeeComm[0].ServFee[0].ServFeeRate[0]);
            curProdArray[20] = selectedProduct.Properties[0].FeeComm[0].ServFee[0].ServFeeFreq[0];
            curProdArray[21] = parseFloat(selectedProduct.Properties[0].FeeComm[0].MaxComm[0]);
            curProdArray[22] = parseFloat(selectedProduct.Properties[0].FeeComm[0].MaxSwitchComm[0]);
            if (selectedProduct.Properties[0].Series) {
                curProdArray[23] = selectedProduct.Properties[0].Series[0];
            } else {
                curProdArray[23] = null;
            }
            if (selectedProduct.Properties[0].Class) {
                curProdArray[24] = selectedProduct.Properties[0].Class[0];
            } else {
                curProdArray[24] = null;
            }
            curProdArray[25] = selectedProduct.Properties[0].RegDocType[0];
            curProdArray[26] = selectedProduct.Eligible[0].EligUS[0];
            curProdArray[27] = selectedProduct.Eligible[0].EligOffshore[0];
            curProdArray[28] = selectedProduct.Eligible[0].EligPAC[0];
            curProdArray[29] = selectedProduct.Eligible[0].EligSWP[0];
            if (selectedProduct.CUSIP) {
                curProdArray[30] = selectedProduct.CUSIP[0];
            } else {
                curProdArray[30] = null;
            }
            if (selectedProduct.Properties[0].DiscBrokerOnly) {
                curProdArray[31] = selectedProduct.Properties[0].DiscBrokerOnly[0];
            } else {
                curProdArray[31] = null;
            }
            if (selectedProduct.Properties[0].Brand) {
                curProdArray[32] = selectedProduct.Properties[0].Brand[0];
            } else {
                curProdArray[32] = null;
            }
            if (selectedProduct.Properties[0].FeeComm[0].DSCSchedule) {
                curProdArray[33] = selectedProduct.Properties[0].FeeComm[0].DSCSchedule[0].DSC[0];
                curProdArray[34] = selectedProduct.Properties[0].FeeComm[0].DSCSchedule[0].DSCDuration[0];
            } else {
                curProdArray[33] = null;
                curProdArray[34] = null;
            }
            if (selectedProduct.Properties[0].EligFeeAcct) {
                curProdArray[35] = selectedProduct.Properties[0].EligFeeAcct[0];
            } else {
                curProdArray[35] = null;
            }
            if (selectedProduct.ISIN) {
                curProdArray[36] = selectedProduct.ISIN[0];
            } else {
                curProdArray[36] = null;
            }
            if (selectedProduct.Properties[0].NegotiateFee) {
                curProdArray[37] = selectedProduct.Properties[0].NegotiateFee[0];
            } else {
                curProdArray[37] = null;
            }
            if (selectedProduct.Properties[0].NegotiateTrail) {
                curProdArray[38] = selectedProduct.Properties[0].NegotiateTrail[0];
            } else {
                curProdArray[38] = null;
            }
            if (selectedProduct.Properties[0].SerClassSeq) {
                curProdArray[39] = selectedProduct.Properties[0].SerClassSeq[0];
            } else {
                curProdArray[39] = null;
            }
            completedNum++;
            bulkContent[bulkContentSpot] = curProdArray;
            bulkContentSpot++;
            if (completedNum == 1000) {
                await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_prod(MGMT_CODE, EFF_DT, FUND_ID, FUND_LINK_ID," +
                    " CUT_OFF_TIME, MGMT_CO_BRAND_NM, ENG_SHORT_NM, ENG_LONG_NM, FRE_SHORT_NM, FRE_LONG_NM, PROD_TYPE," +
                    " CURR, LOAD_TYPE, CLASSIFICATION, TAX_STRUCT, MM_FLAG, BARE_TRUSTEE_FLAG, RISK_CLASS, ACCT_SETUP_FEE," +
                    " SERV_FEE_RATE, SERV_FEE_FREQ, MAX_COMM, MAX_SW_COMM, SERIES, CLASS, REG_DOC_TYPE, ELIG_US," +
                    " ELIG_OFFSHORE, ELIG_PAC, ELIG_SWP, CUSIP, DISC_BROKER_ONLY, BRAND, DSC, DSC_DURATION," +
                    " FEE_BASED_ELIG, ISIN, NEGOT_FEE, NEGOT_TRAILER, SER_CLASS_SEQ_IN_NAME)" +
                    " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
                bulkContentSpot = 0;
                bulkContent = [];
                completedNum = 0;
            }
            curProdArray = [];
        }
    }
    if (bulkContent[0] != null) {
        await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_prod(MGMT_CODE, EFF_DT, FUND_ID, FUND_LINK_ID," +
            " CUT_OFF_TIME, MGMT_CO_BRAND_NM, ENG_SHORT_NM, ENG_LONG_NM, FRE_SHORT_NM, FRE_LONG_NM, PROD_TYPE," +
            " CURR, LOAD_TYPE, CLASSIFICATION, TAX_STRUCT, MM_FLAG, BARE_TRUSTEE_FLAG, RISK_CLASS, ACCT_SETUP_FEE," +
            " SERV_FEE_RATE, SERV_FEE_FREQ, MAX_COMM, MAX_SW_COMM, SERIES, CLASS, REG_DOC_TYPE, ELIG_US," +
            " ELIG_OFFSHORE, ELIG_PAC, ELIG_SWP, CUSIP, DISC_BROKER_ONLY, BRAND, DSC, DSC_DURATION," +
            " FEE_BASED_ELIG, ISIN, NEGOT_FEE, NEGOT_TRAILER, SER_CLASS_SEQ_IN_NAME)" +
            " VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");
    }
    //console.log(bulkContent);
    return true;
}
/*
This functions takes in the FUNDLIST file contents and the
connection pool for the MariaDB database. With these, it 
iterates through each fund company's fund list, picks
out the product models which go into the fsrv_prod_model 
table and sends the data for each row in batches of 1000 to 
the database.
*/
async function fsrv_prod_modelParser(err, data, pool) {
    let result;
    parser.parseString(data, async function (err, output) {
        result = output;
    });
    let completedNum = 0;
    let bulkContent = [];
    let bulkContentSpot = 0;
    let curProdArray = [];
    let selectedProduct = "";
    let currentObject = "";
    let currentSEQ_ID = 0;
    let currentType = "";
    let currentFreq = "";
    let currentSettlPeriod = null;
    let sql = "";
    let fundListNum = result.FundSetup.FundList.length;
    for (let a = 0; a < fundListNum; a++) {
        let investProductNum = result.FundSetup.FundList[a].InvstProduct.length;
        for (let b = 0; b < investProductNum; b++) {
            selectedProduct = result.FundSetup.FundList[a].InvstProduct[b];
            sql = "SELECT FSRV_ID FROM fsrv_prod WHERE (MGMT_CODE='" +
                result.FundSetup.FundList[a].MgmtCode[0] + "') AND (FUND_ID='" +
                selectedProduct.FundID[0] + "')";
            currentSEQ_ID = await selectQuery(pool, sql);
            //Adding product models to the bulk content
            currentObject = selectedProduct.Model[0];
            if (currentObject.FundModel) {
                currentType = "FUND";
                currentSubObject = currentObject.FundModel[0];
                if (currentSubObject.Daily) {
                    currentFreq = "D";
                    currentSubObject = currentSubObject.Daily[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.Weekly) {
                    currentFreq = "W";
                    currentSubObject = currentSubObject.Weekly[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.Monthly) {
                    currentFreq = "M";
                    currentSubObject = currentSubObject.Monthly[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.SemiMonthly) {
                    currentFreq = "S";
                    currentSubObject = currentSubObject.SemiMonthly[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.Custom) {
                    currentFreq = "C";
                    currentSubObject = currentSubObject.Custom[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                }
                curProdArray = [];
                curProdArray[0] = currentSEQ_ID;
                curProdArray[1] = currentType;
                curProdArray[2] = currentFreq;
                curProdArray[3] = currentSettlPeriod;
                bulkContent[bulkContentSpot] = curProdArray;
                bulkContentSpot++;
                completedNum++;
            }
            if (currentObject.BuyModel) {
                currentType = "BUY";
                currentSubObject = currentObject.BuyModel[0];
                if (currentSubObject.Daily) {
                    currentFreq = "D";
                    currentSubObject = currentSubObject.Daily[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.Weekly) {
                    currentFreq = "W";
                    currentSubObject = currentSubObject.Weekly[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.Monthly) {
                    currentFreq = "M";
                    currentSubObject = currentSubObject.Monthly[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.SemiMonthly) {
                    currentFreq = "S";
                    currentSubObject = currentSubObject.SemiMonthly[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.Custom) {
                    currentFreq = "C";
                    currentSubObject = currentSubObject.Custom[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                }
                curProdArray = [];
                curProdArray[0] = currentSEQ_ID;
                curProdArray[1] = currentType;
                curProdArray[2] = currentFreq;
                curProdArray[3] = currentSettlPeriod;
                bulkContent[bulkContentSpot] = curProdArray;
                bulkContentSpot++;
                completedNum++;
            }
            if (currentObject.SellModel) {
                currentType = "SELL";
                currentSubObject = currentObject.SellModel[0];
                if (currentSubObject.Daily) {
                    currentFreq = "D";
                    currentSubObject = currentSubObject.Daily[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.Weekly) {
                    currentFreq = "W";
                    currentSubObject = currentSubObject.Weekly[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.Monthly) {
                    currentFreq = "M";
                    currentSubObject = currentSubObject.Monthly[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.SemiMonthly) {
                    currentFreq = "S";
                    currentSubObject = currentSubObject.SemiMonthly[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                } else if (currentSubObject.Custom) {
                    currentFreq = "C";
                    currentSubObject = currentSubObject.Custom[0];
                    if (currentSubObject.SettlPeriod) {
                        currentSettlPeriod = currentSubObject.SettlPeriod[0];
                    }
                }
                curProdArray = [];
                curProdArray[0] = currentSEQ_ID;
                curProdArray[1] = currentType;
                curProdArray[2] = currentFreq;
                curProdArray[3] = currentSettlPeriod;
                bulkContent[bulkContentSpot] = curProdArray;
                bulkContentSpot++;
                completedNum++;
            }
            if (completedNum >= 1000) {
                await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_prod_model" +
                    "(SEQ_ID, TYPE, FREQ, SETTLE_PERIOD) values (?,?,?,?)");
                bulkContentSpot = 0;
                bulkContent = [];
                completedNum = 0;
            }
        }
    }
    if (bulkContent[0] != null) {
        await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_prod_model(SEQ_ID, TYPE," +
            " FREQ, SETTLE_PERIOD) values (?,?,?,?)");
    }
    //console.log(bulkContent);
    return true;
}
/*
This functions takes in the FUNDLIST file contents and the
connection pool for the MariaDB database. With these, it 
iterates through each fund company's fund list, picks
out the product minimums which go into the fsrv_mins table and sends
the data for each row in batches of 1000 to the database.
*/
async function fsrv_minsParser(err, data, pool) {
    let result;
    parser.parseString(data, async function (err, output) {
        result = output;
    });
    let completedNum = 0;
    let bulkContent = [];
    let bulkContentSpot = 0;
    let curProdArray = [];
    let selectedProduct = "";
    let curProdSpot = 0;
    let sql = "";
    let fundListNum = result.FundSetup.FundList.length;
    for (let a = 0; a < fundListNum; a++) {
        let investProductNum = result.FundSetup.FundList[a].InvstProduct.length;
        for (let b = 0; b < investProductNum; b++) {
            selectedProduct = result.FundSetup.FundList[a].InvstProduct[b];
            sql = "SELECT FSRV_ID FROM fsrv_prod WHERE (MGMT_CODE='" +
                result.FundSetup.FundList[a].MgmtCode[0] + "') AND (FUND_ID='" +
                selectedProduct.FundID[0] + "')";
            curProdArray[0] = await selectQuery(pool, sql);
            curProdSpot++;
            //Adding minimums to the bulk content
            currentObject = selectedProduct.Minimums[0];
            currentKeys = Object.keys(currentObject);
            for (let i = 0; i < currentKeys.length; i++) {
                currentSubObject = currentObject[currentKeys[i]];
                curProdArray[curProdSpot] = parseFloat(currentSubObject[0]);
                curProdSpot++;
            }
            completedNum++;
            bulkContent[bulkContentSpot] = curProdArray;
            bulkContentSpot++;
            if (completedNum == 1000) {
                await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_mins(SEQ_ID, MIN_FIRST, MIN_NXT," +
                    " MIN_SELL, MIN_SW, MIN_TRSF, MIN_BAL, MIN_PAC, MIN_SWP) values (?,?,?,?,?,?,?,?,?)");
                bulkContentSpot = 0;
                bulkContent = [];
                completedNum = 0;
            }
            curProdSpot = 0;
            curProdArray = [];
        }
    }
    if (bulkContent[0] != null) {
        await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_mins(SEQ_ID, MIN_FIRST, MIN_NXT, MIN_SELL, MIN_SW," +
            " MIN_TRSF, MIN_BAL, MIN_PAC, MIN_SWP) values (?,?,?,?,?,?,?,?,?)");
    }
    //console.log(bulkContent);
    return true;
}
/*
This functions takes in the FUNDLIST file contents and the
connection pool for the MariaDB database. With these, it 
iterates through each fund company's fund list, picks
out the provinces the product is available in, which goes 
into the fsrv_elig_prov table and sends the data for each row
in batches of 1000 to the database.
*/
async function fsrv_elig_provParser(err, data, pool) {
    let result;
    parser.parseString(data, async function (err, output) {
        result = output;
    });
    let provinceList = ["AB", "BC", "MB", "NB", "NL", "NT",
        "NS", "NU", "ON", "PE", "QC", "SK", "YT"];
    let completedNum = 0;
    let bulkContent = [];
    let bulkContentSpot = 0;
    let currentSEQ_ID = 0;
    let curProdArray = [];
    let selectedProduct = "";
    let sql = "";
    let fundListNum = result.FundSetup.FundList.length;
    for (let a = 0; a < fundListNum; a++) {
        let investProductNum = result.FundSetup.FundList[a].InvstProduct.length;
        for (let b = 0; b < investProductNum; b++) {
            selectedProduct = result.FundSetup.FundList[a].InvstProduct[b];
            sql = "SELECT FSRV_ID FROM fsrv_prod WHERE (MGMT_CODE='" +
                result.FundSetup.FundList[a].MgmtCode[0] + "') AND (FUND_ID='" +
                selectedProduct.FundID[0] + "')";
            currentSEQ_ID = await selectQuery(pool, sql);
            //Adding eligible provinces to the bulk content
            if (selectedProduct.Eligible[0].EligProv) {
                currentObject = selectedProduct.Eligible[0].EligProv[0].ProvState;
                for (let i = 0; i < provinceList.length; i++) {
                    if (currentObject.indexOf(provinceList[i]) > -1) {
                        curProdArray = [];
                        curProdArray[0] = currentSEQ_ID;
                        curProdArray[1] = provinceList[i];
                        bulkContent[bulkContentSpot] = curProdArray;
                        bulkContentSpot++;
                        completedNum++;
                    }
                }
            }
            if (completedNum >= 1000) {
                await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_elig_prov(SEQ_ID, PROV_STATE) values (?,?)");
                bulkContentSpot = 0;
                bulkContent = [];
                completedNum = 0;
            }
        }
    }
    if (bulkContent[0] != null) {
        await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_elig_prov(SEQ_ID, PROV_STATE) values (?,?)");
    }
    //console.log(bulkContent);
    return true;
}
/*
This functions takes in the FUNDLIST file contents and the
connection pool for the MariaDB database. With these, it 
iterates through each fund company's fund list, picks
out the data about which transactions the product is eligible
for, which goes into the fsrv_elig_trxn table and sends
the data for each row in batches of 1000 to the database.
*/
async function fsrv_elig_trxnParser(err, data, pool) {
    let result;
    parser.parseString(data, async function (err, output) {
        result = output;
    });
    let completedNum = 0;
    let bulkContent = [];
    let bulkContentSpot = 0;
    let currentSEQ_ID = 0;
    let curProdArray = [];
    let selectedProduct = "";
    let sql = "";
    let fundListNum = result.FundSetup.FundList.length;
    for (let a = 0; a < fundListNum; a++) {
        let investProductNum = result.FundSetup.FundList[a].InvstProduct.length;
        for (let b = 0; b < investProductNum; b++) {
            selectedProduct = result.FundSetup.FundList[a].InvstProduct[b];
            sql = "SELECT FSRV_ID FROM fsrv_prod WHERE (MGMT_CODE='" +
                result.FundSetup.FundList[a].MgmtCode[0] + "') AND (FUND_ID='" +
                selectedProduct.FundID[0] + "')";
            currentSEQ_ID = await selectQuery(pool, sql);
            //Adding eligible transactions to the bulk content
            currentObject = selectedProduct.Eligible[0].EligTrxn[0];
            currentKeys = Object.keys(currentObject);
            for (let i = 0; i < currentKeys.length; i++) {
                currentSubObject = currentObject[currentKeys[i]];
                curProdArray = [];
                curProdArray[0] = currentSEQ_ID;
                switch (i) {
                    case (0):
                        curProdArray[1] = "B";
                        break;
                    case (1):
                        curProdArray[1] = "CR";
                        break;
                    case (2):
                        curProdArray[1] = "SI";
                        break;
                    case (3):
                        curProdArray[1] = "SO";
                        break;
                    case (4):
                        curProdArray[1] = "S";
                        break;
                    case (5):
                        curProdArray[1] = "II";
                        break;
                    case (6):
                        curProdArray[1] = "IO";
                        break;
                    case (7):
                        curProdArray[1] = "EI";
                        break;
                    case (8):
                        curProdArray[1] = "EO";
                        break;
                    case (9):
                        curProdArray[1] = "LI";
                        break;
                    case (10):
                        curProdArray[1] = "LO";
                        break;
                    case (11):
                        curProdArray[1] = "F";
                        break;
                    case (12):
                        curProdArray[1] = "R";
                        break;
                    case (13):
                        curProdArray[1] = "CI";
                        break;
                    case (14):
                        curProdArray[1] = "CO";
                        break;
                    case (15):
                        curProdArray[1] = "SM";
                        break;
                }
                curProdArray[2] = currentSubObject[0];
                bulkContent[bulkContentSpot] = curProdArray;
                bulkContentSpot++;
                completedNum++;
            }
            if (completedNum >= 1000) {
                await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_elig_trxn(SEQ_ID, TRXN_TYPE, TRXN_STATUS) values (?,?,?)");
                bulkContentSpot = 0;
                bulkContent = [];
                completedNum = 0;
            }
        }
    }
    if (bulkContent[0] != null) {
        await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_elig_trxn(SEQ_ID, TRXN_TYPE, TRXN_STATUS) values (?,?,?)");
    }
    //console.log(bulkContent);
    return true;
}
/*
This functions takes in the FUNDLIST file contents and the
connection pool for the MariaDB database. With these, it 
iterates through each fund company's fund list, picks
out the data on which accounts the product is allowed to be in, 
which goes into the fsrv_elig_acct_types table and sends
the data for each row in batches of 1000 to the database.
*/
async function fsrv_elig_acct_typesParser(err, data, pool) {
    let result;
    parser.parseString(data, async function (err, output) {
        result = output;
    });
    let accountTypeList = ["01", "02", "04", "05", "06", "07", "08", "10", "11", "12", "13", "14",
        "15", "16", "17", "18", "19", "20", "21"];
    let completedNum = 0;
    let bulkContent = [];
    let bulkContentSpot = 0;
    let currentSEQ_ID = 0;
    let curProdArray = [];
    let selectedProduct = "";
    let sql = "";
    let fundListNum = result.FundSetup.FundList.length;
    for (let a = 0; a < fundListNum; a++) {
        let investProductNum = result.FundSetup.FundList[a].InvstProduct.length;
        for (let b = 0; b < investProductNum; b++) {
            selectedProduct = result.FundSetup.FundList[a].InvstProduct[b];
            sql = "SELECT FSRV_ID FROM fsrv_prod WHERE (MGMT_CODE='" +
                result.FundSetup.FundList[a].MgmtCode[0] + "') AND (FUND_ID='" +
                selectedProduct.FundID[0] + "')";
            currentSEQ_ID = await selectQuery(pool, sql);
            //Adding eligible account types to the bulk content
            if (selectedProduct.Eligible[0].CNAcctTypes && selectedProduct.Eligible[0].CNAcctTypes[0].ALL) {
                for (let i = 0; i < accountTypeList.length; i++) {
                    curProdArray = [];
                    curProdArray[0] = currentSEQ_ID;
                    curProdArray[1] = "1";
                    curProdArray[2] = accountTypeList[i];
                    bulkContent[bulkContentSpot] = curProdArray;
                    bulkContentSpot++;
                    completedNum++;
                }
            } else if (selectedProduct.Eligible[0].CNAcctTypes) {
                currentObject = selectedProduct.Eligible[0].CNAcctTypes[0].AcctTypes[0].AcctType;
                for (let i = 0; i < accountTypeList.length; i++) {
                    if (currentObject.indexOf(accountTypeList[i]) > -1) {
                        curProdArray = [];
                        curProdArray[0] = currentSEQ_ID;
                        curProdArray[1] = "1";
                        curProdArray[2] = accountTypeList[i];
                        bulkContent[bulkContentSpot] = curProdArray;
                        bulkContentSpot++;
                        completedNum++;
                    }
                }
            }

            if (selectedProduct.Eligible[0].NomAcctTypes && selectedProduct.Eligible[0].NomAcctTypes[0].ALL) {
                for (let i = 0; i < accountTypeList.length; i++) {
                    curProdArray = [];
                    curProdArray[0] = currentSEQ_ID;
                    curProdArray[1] = "2";
                    curProdArray[2] = accountTypeList[i];
                    bulkContent[bulkContentSpot] = curProdArray;
                    bulkContentSpot++;
                    completedNum++;
                }
            } else if (selectedProduct.Eligible[0].NomAcctTypes) {
                currentObject = selectedProduct.Eligible[0].NomAcctTypes[0].AcctTypes[0].AcctType;
                for (let i = 0; i < accountTypeList.length; i++) {
                    if (currentObject.indexOf(accountTypeList[i]) > -1) {
                        curProdArray = [];
                        curProdArray[0] = currentSEQ_ID;
                        curProdArray[1] = "2";
                        curProdArray[2] = accountTypeList[i];
                        bulkContent[bulkContentSpot] = curProdArray;
                        bulkContentSpot++;
                        completedNum++;
                    }
                }
            }
            if (completedNum >= 1000) {
                await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_elig_acct_types(SEQ_ID, DESIGNATION, ACCT_TYPE) values (?,?,?)");
                bulkContentSpot = 0;
                bulkContent = [];
                completedNum = 0;
            }
        }
    }
    if (bulkContent[0] != null) {
        await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_elig_acct_types(SEQ_ID, DESIGNATION, ACCT_TYPE) values (?,?,?)");
    }
    //console.log(bulkContent);
    return true;
}
/*
This functions takes in the FUNDLIST file contents and the
connection pool for the MariaDB database. With these, it 
iterates through each fund company's fund list, picks
out the data about what dividends the product is eligible for, 
which goes into the fsrv_elig_div_opt table and sends
the data for each row in batches of 1000 to the database.
*/
async function fsrv_elig_div_optParser(err, data, pool) {
    let result;
    parser.parseString(data, async function (err, output) {
        result = output;
    });
    let completedNum = 0;
    let bulkContent = [];
    let bulkContentSpot = 0;
    let curProdArray = [];
    let selectedProduct = "";
    let sql = "";
    let fundListNum = result.FundSetup.FundList.length;
    for (let a = 0; a < fundListNum; a++) {
        let investProductNum = result.FundSetup.FundList[a].InvstProduct.length;
        for (let b = 0; b < investProductNum; b++) {
            selectedProduct = result.FundSetup.FundList[a].InvstProduct[b];
            sql = "SELECT FSRV_ID FROM fsrv_prod WHERE (MGMT_CODE='" +
                result.FundSetup.FundList[a].MgmtCode[0] + "') AND (FUND_ID='" +
                selectedProduct.FundID[0] + "')";
            curProdArray[0] = await selectQuery(pool, sql);
            //Adding eligible dividend options to the bulk content
            curProdArray[1] = selectedProduct.Eligible[0].EligDivOpt[0].DivFrequency[0];
            curProdArray[2] = selectedProduct.Eligible[0].EligDivOpt[0].DivOpt1[0];
            curProdArray[3] = selectedProduct.Eligible[0].EligDivOpt[0].DivOpt4[0];
            curProdArray[4] = selectedProduct.Eligible[0].EligDivOpt[0].DivOpt5[0];
            bulkContent[bulkContentSpot] = curProdArray;
            bulkContentSpot++;
            completedNum++;
            if (completedNum >= 1000) {
                await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_elig_div_opt(SEQ_ID, DIV_FREQ, DIV_OPT_1, DIV_OPT_4, DIV_OPT_5) values (?,?,?,?,?)");
                bulkContentSpot = 0;
                bulkContent = [];
                completedNum = 0;
            }
            curProdArray = [];
        }
    }
    if (bulkContent[0] != null) {
        await bulkInsert(pool, bulkContent, "INSERT INTO fsrv_elig_div_opt(SEQ_ID, DIV_FREQ, DIV_OPT_1, DIV_OPT_4, DIV_OPT_5) values (?,?,?,?,?)");
    }
    //console.log(bulkContent);
    return true;
}
/*
This function takes in a connection pool for the MariaDB database and
an sql statement to select a specific product in the database. With these,
it performs a database query and returns the internal database
FSRV_ID which corresponds to the specified product.
*/
async function selectQuery(pool, sql) {
    let con;
    let result;
    try {
        con = await pool.getConnection();
        result = await con.query(sql);
        result = result[0].FSRV_ID;
    } catch (queryError) {
        throw queryError;
    } finally {
        if (con) {
            con.release();
        }
    }
    return result;
}
/*
This function takes in an sql select query of any type and
a connection pool for the MariaDB database. With these, it
sends a query to the database and returns the results of
that query.
*/
async function query(sql, pool) {
    let con;
    let result;
    try {
        con = await pool.getConnection();
        result = await con.query(sql);
    } catch (queryError) {
        throw queryError;
    } finally {
        if (con) {
            con.release();
        }
    }
    return result;
}
/*
This functions takes in a connection pool for the MariaDB database,
an array containing the data for each row to be inserted into the database
and the sql statement specifying where and how to insert the data
from the array. With these, it begins a transaction with the database
and sends the contents of the array in bulk. If the batch insert fails,
the transaction is rolled back. If it succeeds, the connection
is released at the end.
*/
async function bulkInsert(pool, bulkContent, sql) {
    let con;
    try {
        con = await pool.getConnection();
        if (con) {
            con.beginTransaction();
            await con.batch(sql, bulkContent);
            con.commit();
        }
    } catch (batchError) {
        if (con) {
            con.rollback();
        }
        throw batchError;
    } finally {
        if (con) {
            con.release();
        }
    }
}
/*
These statements allowed the specified functions to be called
by any Node.js file which requires the fileParser.js file.
*/
exports.createMariadbConnectionPool = createMariadbConnectionPool;
exports.query = query;
exports.fundlistReader = fundlistReader;
