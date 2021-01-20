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
        let query = "SELECT CONCAT(MGMT_CODE, FUND_ID), ENG_LONG_NM FROM fsrv_prod f WHERE f." + queryType +
            "=('" + queryValue + "')" + filterPart;
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

    let page = (
        <div id="explore_dashboard">
            <button type="button" className="dashboardButton">Fundserv</button>
            <button type="button" className="dashboardButton">Fundata</button><br></br>
            <button type="button" className="dashboardButton" onClick={async () => {
                changeName("mgmtCo");
                await dashboardUpdate("mgmtCo", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
            }}>Mgmt Co.</button>
            <button type="button" className="dashboardButton" onClick={async () => {
                changeName("prodType");
                await dashboardUpdate("prodType", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
            }}>Prod. Type</button>
            <button type="button" className="dashboardButton" onClick={async () => {
                changeName("loadType");
                await dashboardUpdate("loadType", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
            }}>Load Type</button>
            <button type="button" className="dashboardButton" onClick={async () => {
                changeName("classification");
                await dashboardUpdate("classification", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
            }}>Classification</button>
            <button type="button" className="dashboardButton" onClick={async () => {
                changeName("risk");
                await dashboardUpdate("risk", [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
            }}>Risk</button><br></br>
            <p><b>Management Company Dashboard</b></p>
            <form>
                <label htmlFor="PROD_TYPE">Prod. Type: </label>
                <select id="prodTypeChooser" name={filterNames[0]} size="1" onChange={async (e) => changeFilter(e.target.value, 0)}>
                    <option value="">All</option>
                    <FilterSet name={filterNames[0]} hasEnum={true} dashManage={dashManager} />
                </select>
                <label htmlFor="LOAD_TYPE"> Load Type: </label>
                <select id="loadTypeChooser" name={filterNames[1]} size="1" onChange={async (e) => changeFilter(e.target.value, 1)}>
                    <option value="">All</option>
                    <FilterSet name={filterNames[1]} hasEnum={true} dashManage={dashManager} />
                </select>
                <label htmlFor="CLASSIFICATION"> Classification: </label>
                <select id="classificationChooser" name={filterNames[2]} size="1" onChange={async (e) => changeFilter(e.target.value, 2)}>
                    <option value="">All</option>
                    <FilterSet name={filterNames[2]} hasEnum={true} dashManage={dashManager} />
                </select>
                <label htmlFor="RISK_CLASS"> Risk: </label>
                <select id="riskChooser" name={filterNames[3]} size="1" onChange={async (e) => changeFilter(e.target.value, 3)}>
                    <option value="">All</option>
                    <FilterSet name={filterNames[3]} hasEnum={false} dashManage={dashManager} />
                </select>
            </form><br></br>
            <div id="fundCountsArea">
                <table className="dashboardTable" id="fundCountsTable">
                    <thead>
                        <TableHeaders input={countHeaders} />
                    </thead>
                    <tbody>
                        <CountRows output={countTableContents} displayChange={displayTableUpdate} />
                    </tbody>
                </table>
            </div><br></br>
            <div id="fundDisplayArea">
                <table className="dashboardTable" id="fundDisplayTable">
                    <thead>
                        <TableHeaders input={displayHeaders} />
                    </thead>
                    <tbody>
                        <DisplayRows output={displayTableContents} />
                    </tbody>
                </table>
            </div>
        </div>
    );

    return page;
}
/*
This function returns the FilterSet react object which contains the filter options of 
one of the four current filters, designated by the name passed through the props
*/
function FilterSet(props) {
    let piece;
    const [filterOptions, changeOptions] = React.useState([]);

    async function filterOptionsGather() {
        if (filterOptions[0] == null) {
            changeOptions(await props.dashManage.filterListSetup(props.name, props.hasEnum));
        }
    }

    React.useEffect(filterOptionsGather);

    piece = filterOptions.map((row, index) =>
        <option key={index} value={row.queryValue}>{row.htmlText}</option>
    );

    return piece;
}
/*
This function returns the TableHeaders react object which contains the 
headers for any table object
*/
function TableHeaders(props) {
    let piece;
    piece = (
        <tr>
            <RowContent input={props.input} type="header" />
        </tr>
    );
    return piece;
}
/*
This function returns the CountRows react object which contains the row objects
for the count table. Each row shows the count and distinct count of the mutual funds
which fall under the row's option, whether that be a product type, load type,
classification type or risk class type.
*/
function CountRows(props) {
    let piece;
    let currentKeys = Object.keys(props.output[0]);
    piece = (props.output).map((row, index) =>
        <tr key={index}>
            <RowContent input={objToArray(row)} type="linkedContent" displayFunction={props.displayChange} queryType={currentKeys[0]} />
        </tr>
    );
    return piece;
}
/*
This function returns the DisplayRows react object which contains the 
row objects for the display table. Each row shows the basic information which
pertains to the mutual fund put on that row based on the chosen count table row
*/
function DisplayRows(props) {
    let piece;

    piece = (props.output).map((row, index) =>
        <tr key={index}>
            <RowContent input={objToArray(row)} type="content" />
        </tr>
    );
    return piece;
}
/*
This function takes in an object and returns an array which contains the
contents of each property of the object in the order in which each 
property appears in the original object's keys.
*/
function objToArray(object) {
    let keys = Object.keys(object);
    let output = [];
    for (let i = 0; i < keys.length; i++) {
        output[i] = object[keys[i]];
    }
    return output;
}
/*This functions returns the RowContent react object which contains the 
contents for a single table row. It can return the data it is given
in normal table cells with no linking, normal table header cells
or special table cells which when clicked on change the contents of the 
display table
*/
function RowContent(props) {
    let piece;
    if (props.type == "content") {
        piece = (props.input).map((row, index) =>
            <td key={index}>{row}</td>
        );
    } else if (props.type == "header") {
        piece = (props.input).map((row, index) =>
            <th key={index}>{row}</th>
        );
    } else if (props.type == "linkedContent") {
        piece = (props.input).map((row, index) =>
            <td key={index}><a onClick={async () => props.displayFunction(props.queryType, props.input[0])}>{row}</a></td>
        );
    }
    return piece;
}
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
        "01": "No", "02": "No", "04": "No", "05": "No",
        "06": "No", "07": "No", "08": "No", "10": "No",
        "11": "No", "12": "No", "13": "No", "14": "No",
        "15": "No", "16": "No", "17": "No", "18": "No",
        "19": "No", "20": "No", "21": "No"
    });
    const [niAccounts, changeNI] = React.useState({
        "01": "No", "02": "No", "04": "No", "05": "No",
        "06": "No", "07": "No", "08": "No", "10": "No",
        "11": "No", "12": "No", "13": "No", "14": "No",
        "15": "No", "16": "No", "17": "No", "18": "No",
        "19": "No", "20": "No", "21": "No"
    });
    const [eligProvinces, changeProvinces] = React.useState({
        AB: "No", BC: "No", MB: "No", NB: "No",
        NL: "No", NT: "No", NS: "No", NU: "No",
        ON: "No", PE: "No", QC: "No", SK: "No",
        YT: "No"
    });
    const [eligTransactions, changeTrxns] = React.useState({
        B: "Not Allowed", CR: "Not Allowed", SI: "Not Allowed", SO: "Not Allowed",
        S: "Not Allowed", II: "Not Allowed", IO: "Not Allowed", EI: "Not Allowed",
        EO: "Not Allowed", LI: "Not Allowed", LO: "Not Allowed", F: "Not Allowed",
        R: "Not Allowed", CI: "Not Allowed", CO: "Not Allowed", SM: "Not Allowed"
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
            await basicResults.then(async (values) => {
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
        page = <ResultsArea fullResults={result[0]} cnAccs={cnAccounts} niAccs={niAccounts} eligModels={eligProdModels}
            eligProvs={eligProvinces} eligTrxns={eligTransactions} />
    } else {
        page = <SearchProduct onSearch={handleSubmit} symbolInput={handleInput} />
    }
    return page;
}
/*
This function returns the SearchProduct react object which contains the interface
for a user to search for mutual funds using the management code and fund id
*/
function SearchProduct(props) {
    let page = (
        <div id="explore_viewProduct">
            <p><b>Product Search</b></p>
            <form id="queryForm">
                <label>Enter a symbol:</label>
                <input type="text" id="symbolInput" onChange={props.symbolInput}></input><br></br><br></br>
                <input type="submit" defaultValue="Search" onClick={props.onSearch}></input>
            </form>
        </div>
    );
    return page;
}
/*
This function returns the ResultsArea react object which contains the table
for displaying all of the technical details about the particular mutual fund that
was searched for in the SearchProduct interface
*/
function ResultsArea(props) {
    let resultsManager = resultsBuilder();
    let topRows = resultsManager.resultsHeaderPopulator(props.fullResults);
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

    React.useEffect(checkStatus);

    let page = (
        <div id="resultsArea">
            <p><a>Product Search</a>{'>'}<a>Results</a></p>
            <p id="resultsFirstRow">{topRows[0]}</p>
            <p id="resultsSecondRow">{topRows[1]}</p>
            <table id="resultsTable">
                <thead>
                    <tr>
                        <th>Product Detail</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Management Company Code</td>
                        <td>{props.fullResults.MGMT_CODE}</td>
                    </tr>
                    <tr>
                        <td>Fund Identifier</td>
                        <td>{props.fullResults.FUND_ID}</td>
                    </tr>
                    <tr>
                        <td>CUSIP</td>
                        <td>{props.fullResults.CUSIP}</td>
                    </tr>
                    <tr>
                        <td>ISIN</td>
                        <td>{props.fullResults.ISIN}</td>
                    </tr>
                    <tr>
                        <td>Fund Brand</td>
                        <td>{props.fullResults.BRAND}</td>
                    </tr>
                    <tr>
                        <td>Management Company Brand Name</td>
                        <td>{props.fullResults.MGMT_CO_BRAND_NM}</td>
                    </tr>
                    <tr>
                        <td>Series</td>
                        <td>{props.fullResults.SERIES}</td>
                    </tr>
                    <tr>
                        <td>Class</td>
                        <td>{props.fullResults.CLASS}</td>
                    </tr>
                    <tr>
                        <td>Series-Class Sequence in Fund Name</td>
                        <td>{props.fullResults.SER_CLASS_SEQ_IN_NAME}</td>
                    </tr>
                    <tr>
                        <td>English Short Name</td>
                        <td>{props.fullResults.ENG_SHORT_NM}</td>
                    </tr>
                    <tr>
                        <td>English Long Name</td>
                        <td>{props.fullResults.ENG_LONG_NM}</td>
                    </tr>
                    <tr>
                        <td>French Short Name</td>
                        <td>{props.fullResults.FRE_SHORT_NM}</td>
                    </tr>
                    <tr>
                        <td>French Long Name</td>
                        <td>{props.fullResults.FRE_LONG_NM}</td>
                    </tr>
                    <tr>
                        <td>Product Type</td>
                        <td>{props.fullResults.FULL_PROD_TYPE}</td>
                    </tr>
                    <tr>
                        <td>Currency</td>
                        <td>{props.fullResults.FULL_CURRENCY}</td>
                    </tr>
                    <tr>
                        <td>Load Type</td>
                        <td>{props.fullResults.FULL_LOAD_TYPE}</td>
                    </tr>
                    <tr>
                        <td>Fund Classification (CIFSC)</td>
                        <td>{props.fullResults.CLASSIFICATION}</td>
                    </tr>
                    <tr>
                        <td>Fund Tax Structure</td>
                        <td>{props.fullResults.TAX_STRUCT}</td>
                    </tr>
                    <tr>
                        <td>Money Market Flag</td>
                        <td>{props.fullResults.MM_FLAG}</td>
                    </tr>
                    <tr>
                        <td>Bare Trustee Flag</td>
                        <td>{props.fullResults.BARE_TRUSTEE_FLAG}</td>
                    </tr>
                    <tr>
                        <td>Risk Classification</td>
                        <td>{props.fullResults.RISK_CLASS}</td>
                    </tr>
                    <tr>
                        <td>Fees:</td>
                        <td id=""></td>
                    </tr>
                    <tr>
                        <td>Account Setup Fee</td>
                        <td>{props.fullResults.ACCT_SETUP_FEE}</td>
                    </tr>
                    <tr>
                        <td>Service Fee Rate</td>
                        <td>{props.fullResults.SERV_FEE_RATE}</td>
                    </tr>
                    <tr>
                        <td>Service Fee Frequency</td>
                        <td>{props.fullResults.SERV_FEE_FREQ}</td>
                    </tr>
                    <tr>
                        <td>DSC%</td>
                        <td>{props.fullResults.DSC}</td>
                    </tr>
                    <tr>
                        <td>DSC Fee Duration</td>
                        <td>{props.fullResults.DSC_DURATION}</td>
                    </tr>
                    <tr>
                        <td>Maximum Client Paid Commission %</td>
                        <td>{props.fullResults.MAX_COMM}</td>
                    </tr>
                    <tr>
                        <td>Maximum Client Paid Switch Commission %</td>
                        <td>{props.fullResults.MAX_SW_COMM}</td>
                    </tr>
                    <tr>
                        <td>Negotiated Fee</td>
                        <td>{props.fullResults.NEGOT_FEE}</td>
                    </tr>
                    <tr>
                        <td>Negotiated Trailer</td>
                        <td>{props.fullResults.NEGOT_TRAILER}</td>
                    </tr>
                    <tr>
                        <td>Fee Based Account Eligibility</td>
                        <td id=""></td>
                    </tr>
                    <tr>
                        <td>Discount Brokerage Only</td>
                        <td>{props.fullResults.DISC_BROKER_ONLY}</td>
                    </tr>
                    <tr>
                        <td>Registration Document Type</td>
                        <td>{props.fullResults.REG_DOC_TYPE}</td>
                    </tr>
                    <tr>
                        <td>Eligible US</td>
                        <td>{props.fullResults.ELIG_US}</td>
                    </tr>
                    <tr>
                        <td>Eligible Offshore</td>
                        <td>{props.fullResults.ELIG_OFFSHORE}</td>
                    </tr>
                    <tr>
                        <td>Eligible PAC</td>
                        <td>{props.fullResults.ELIG_PAC}</td>
                    </tr>
                    <tr>
                        <td>Eligible SWP</td>
                        <td>{props.fullResults.ELIG_SWP}</td>
                    </tr>
                    <tr>
                        <td>Effective Date</td>
                        <td>{props.fullResults.EFF_DT}</td>
                    </tr>
                    <tr>
                        <td>Cut Off Time</td>
                        <td>{props.fullResults.CUT_OFF_TIME}</td>
                    </tr>
                    <tr>
                        <td>Fund Link Identifier</td>
                        <td>{props.fullResults.FUND_LINK_ID}</td>
                    </tr>
                    <tr>
                        <td>Fund Model:</td>
                        <td id=""></td>
                    </tr>
                    <tr>
                        <td>Frequency</td>
                        <td id="FUND_freq"></td>
                    </tr>
                    <tr>
                        <td>Settlement Period</td>
                        <td id="FUND_settle"></td>
                    </tr>
                    <tr>
                        <td>Buy Model:</td>
                        <td id=""></td>
                    </tr>
                    <tr>
                        <td>Frequency</td>
                        <td id="BUY_freq"></td>
                    </tr>
                    <tr>
                        <td>Settlement Period</td>
                        <td id="BUY_settle"></td>
                    </tr>
                    <tr>
                        <td>Sell Model:</td>
                        <td id=""></td>
                    </tr>
                    <tr>
                        <td>Frequency</td>
                        <td id="SELL_freq"></td>
                    </tr>
                    <tr>
                        <td>Settlement Period</td>
                        <td id="SELL_settle"></td>
                    </tr>
                    <tr>
                        <td><b>Minimums:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('minimums', 'hiddenMinimums'); }}>Toggle Section</button></td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum Initial Investment</td>
                        <td>{props.fullResults.MIN_FIRST}</td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum Subsequent Investment</td>
                        <td>{props.fullResults.MIN_NXT}</td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum Sell</td>
                        <td>{props.fullResults.MIN_SELL}</td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum Switch</td>
                        <td>{props.fullResults.MIN_SW}</td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum Account Balance</td>
                        <td>{props.fullResults.MIN_BAL}</td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum PAC Investment</td>
                        <td>{props.fullResults.MIN_PAC}</td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum SWP</td>
                        <td>{props.fullResults.MIN_SWP}</td>
                    </tr>
                    <tr>
                        <td><b>Eligible Provinces:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('provinces', 'hiddenProvinces'); }}>Toggle Section</button> <span id="provincesStatusButton" className={"statusButton " + provStatus}></span></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Alberta</td>
                        <td>{props.eligProvs.AB}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>British Columbia</td>
                        <td>{props.eligProvs.BC}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Manitoba</td>
                        <td>{props.eligProvs.MB}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>New Brunswick</td>
                        <td>{props.eligProvs.NB}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>New Foundland</td>
                        <td>{props.eligProvs.NL}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Northwest Territories</td>
                        <td>{props.eligProvs.NT}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Nova Scotia</td>
                        <td>{props.eligProvs.NS}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Nunavut</td>
                        <td>{props.eligProvs.NU}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Ontario</td>
                        <td>{props.eligProvs.ON}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Prince Edward Island</td>
                        <td>{props.eligProvs.PE}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Quebec</td>
                        <td>{props.eligProvs.QC}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Saskatchewan</td>
                        <td>{props.eligProvs.SK}</td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Yukon Territories</td>
                        <td>{props.eligProvs.YT}</td>
                    </tr>
                    <tr>
                        <td><b>Eligible Transactions:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('transactions', 'hiddenTransactions'); }}>Toggle Section</button> <span id="transactionsStatusButton" className={"statusButton " + transStatus}></span></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Buy</td>
                        <td>{props.eligTrxns.B}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Commission Rebate</td>
                        <td>{props.eligTrxns.CR}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Switch-in</td>
                        <td>{props.eligTrxns.SI}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Switch-out</td>
                        <td>{props.eligTrxns.SO}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Sell</td>
                        <td>{props.eligTrxns.S}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Internal Transfer-in</td>
                        <td>{props.eligTrxns.II}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Internal Transfer-out</td>
                        <td>{props.eligTrxns.IO}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>External Transfer-in</td>
                        <td>{props.eligTrxns.EI}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>External Transfer-out</td>
                        <td>{props.eligTrxns.EO}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>LSIF Rollover-in</td>
                        <td>{props.eligTrxns.LI}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>LSIF Rollover-out</td>
                        <td>{props.eligTrxns.LO}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Fee</td>
                        <td>{props.eligTrxns.F}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Reset</td>
                        <td>{props.eligTrxns.R}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>ICT-in</td>
                        <td>{props.eligTrxns.CI}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>ICT-out</td>
                        <td>{props.eligTrxns.CO}</td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Seg. Maturity</td>
                        <td>{props.eligTrxns.SM}</td>
                    </tr>
                    <tr>
                        <td><b>Accounts - Client Name:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('cnaccounts', 'hiddenCnaccounts'); }}>Toggle Section</button> <span id="cnaccountsStatusButton" className={"statusButton " + cnStatus}></span></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>Open</td>
                        <td>{props.cnAccs["01"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RRSP</td>
                        <td>{props.cnAccs["02"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RRIF</td>
                        <td>{props.cnAccs["04"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RESP - Individual Plan</td>
                        <td>{props.cnAccs["05"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RESP - Family Plan</td>
                        <td>{props.cnAccs["06"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>DPSP</td>
                        <td>{props.cnAccs["07"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RHOSP (Quebec Only)</td>
                        <td>{props.cnAccs["08"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>LIF</td>
                        <td>{props.cnAccs["10"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>LIRA</td>
                        <td>{props.cnAccs["11"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>LRIF (Alberta, Saskatchewan)</td>
                        <td>{props.cnAccs["12"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RRTF (Quebec Only)</td>
                        <td>{props.cnAccs["13"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>PRIF</td>
                        <td>{props.cnAccs["14"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RPP - Defined Benefit</td>
                        <td>{props.cnAccs["15"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RPP - Defined Contribution</td>
                        <td>{props.cnAccs["16"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>TFSA - Tax Free Savings Account</td>
                        <td>{props.cnAccs["17"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RDSP - Registered Disability Savings Plan</td>
                        <td>{props.cnAccs["18"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RLIF - Restricted Life Income Fund</td>
                        <td>{props.cnAccs["19"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RLSP - Restricted Locked-In Savings Plan</td>
                        <td>{props.cnAccs["20"]}</td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>IPP - Individual Pension Plan</td>
                        <td>{props.cnAccs["21"]}</td>
                    </tr>
                    <tr>
                        <td><b>Accounts - Nom/Inter:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('niaccounts', 'hiddenNiaccounts'); }}>Toggle Section</button> <span id="niaccountsStatusButton" className={"statusButton " + niStatus}></span></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>Open</td>
                        <td>{props.niAccs["01"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RRSP</td>
                        <td>{props.niAccs["02"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RRIF</td>
                        <td>{props.niAccs["04"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RESP - Individual Plan</td>
                        <td>{props.niAccs["05"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RESP - Family Plan</td>
                        <td>{props.niAccs["06"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>DPSP</td>
                        <td>{props.niAccs["07"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RHOSP (Quebec Only)</td>
                        <td>{props.niAccs["08"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>LIF</td>
                        <td>{props.niAccs["10"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>LIRA</td>
                        <td>{props.niAccs["11"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>LRIF (Alberta, Saskatchewan)</td>
                        <td>{props.niAccs["12"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RRTF (Quebec only)</td>
                        <td>{props.niAccs["13"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>PRIF</td>
                        <td>{props.niAccs["14"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RPP - Defined Benefit</td>
                        <td>{props.niAccs["15"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RPP - Defined Contribution</td>
                        <td>{props.niAccs["16"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>TFSA - Tax Free Savings Account</td>
                        <td>{props.niAccs["17"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RDSP - Registered Disability Savings Plan</td>
                        <td>{props.niAccs["18"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RLIF - Restricted Life Income Fund</td>
                        <td>{props.niAccs["19"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>RLSP - Restricted Locked-In Savings Plan</td>
                        <td>{props.niAccs["20"]}</td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>IPP - Individual Pension Plan</td>
                        <td>{props.niAccs["21"]}</td>
                    </tr>
                    <tr>
                        <td><b>Dividend Options:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('dividends', 'hiddenDividends') }}>Toggle Section</button></td>
                    </tr>
                    <tr className="hiddenDividends dividends">
                        <td>Dividend Frequency</td>
                        <td id="DIV_FREQ">{props.fullResults.DIV_FREQ}</td>
                    </tr>
                    <tr className="hiddenDividends dividends">
                        <td>Distribution Offered - Reinvest</td>
                        <td id="DIV_OPT_1">{props.fullResults.DIV_OPT_1}</td>
                    </tr>
                    <tr className="hiddenDividends dividends">
                        <td>Distribution Offered - Cash</td>
                        <td id="DIV_OPT_4">{props.fullResults.DIV_OPT_4}</td>
                    </tr>
                    <tr className="hiddenDividends dividends">
                        <td>Distribution Offered - Redirection</td>
                        <td id="DIV_OPT_5">{props.fullResults.DIV_OPT_5}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
    return page;
}

function PageIntegrator(props){
    let piece = (<p>"Test"</p>);
    return piece;
}
/*
This function returns the FileUpload react object that allows for
xml files to be uploaded to the Node.js middleware but is currently unused
*/
function FileUpload() {
    let page = (
        <div id="manage">
            <form id="uploadForm" method="post" enctype="multipart/form-data">
                <label for="xmlFileUpload">Please input an XML file</label><br></br>
                <input type="file" id="xmlFileUpload" name="xmlFileUpload" accept=".xml" multiple></input><br></br>
                <input type="submit" id="xmlSubmit" value="Submit"></input>
            </form>
        </div>
    );
    return page;
}
