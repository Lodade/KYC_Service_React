function Explore_Dashboard(props) {
    let page = (
        <div id="explore_dashboard">
            <button type="button" className="dashboardButton">Fundserv</button>
            <button type="button" className="dashboardButton">Fundata</button><br></br>
            <button type="button" className="dashboardButton" onClick={async () => { await dashboardController('mgmtCo', false); }}>Mgmt Co.</button>
            <button type="button" className="dashboardButton" onClick={async () => { await dashboardController('prodType', false); }}>Prod. Type</button>
            <button type="button" className="dashboardButton" onClick={async () => { await dashboardController('loadType', false); }}>Load Type</button>
            <button type="button" className="dashboardButton" onClick={async () => { await dashboardController('classification', false); }}>Classification</button>
            <button type="button" className="dashboardButton" onClick={async () => { await dashboardController('risk', false); }}>Risk</button><br></br>
            <p><b>Management Company Dashboard</b></p>
            <form>
                <label htmlFor="PROD_TYPE">Prod. Type:</label>
                <select id="prodTypeChooser" name="PROD_TYPE" size="1">
                    <option value="">All</option>
                </select>
                <label htmlFor="LOAD_TYPE">Load Type:</label>
                <select id="loadTypeChooser" name="LOAD_TYPE" size="1">
                    <option value="">All</option>
                </select>
                <label htmlFor="CLASSIFICATION">Classification</label>
                <select id="classificationChooser" name="CLASSIFICATION" size="1">
                    <option value="">All</option>
                </select>
                <label htmlFor="RISK_CLASS">Risk</label>
                <select id="riskChooser" name="RISK_CLASS" size="1">
                    <option value="">All</option>
                </select>
            </form><br></br>
            <div id="fundCountsArea">
                <table className="dashboardTable" id="fundCountsTable">

                </table>
            </div><br></br>
            <div id="fundDisplayArea">
                <table className="dashboardTable" id="fundDisplayTable">

                </table>
            </div>
        </div>
    );
    return page;
}

function Explore_ViewProduct(props) {
    let page;
    let resultsManager = resultsBuilder();
    const [showResults, changeShow] = React.useState(false);
    const [symbolText, changeSymbol] = React.useState("");
    const [result, changeResult] = React.useState();
    const [cnAccounts, changeCN] = React.useState({

    });
    const [niAccounts, changeNI] = React.useState();
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
                console.log("No product exists by that name");
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
            basicResults.then(async (values) => {
                changeResult(await resultsManager.resultsDetailsPopulator(values));
                changeCN(await resultsManager.cnAccountsPopulator(values));
                changeNI(await resultsManager.niAccountsPopulator(values));
                changeProvinces(await resultsManager.eligProvincesPopulator(values));
                changeTrxns(await resultsManager.eligibleTrxnsPopulator(values));
                changeProdModels(await resultsManager.eligibleProdModelsPopulator(values));
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

function ResultsArea(props) {
    let resultsManager = resultsBuilder();
    let topRows = resultsManager.resultsHeaderPopulator(props.fullResults);
    console.log(props.cnAccs);
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
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('provinces', 'hiddenProvinces'); }}>Toggle Section</button> <span id="provincesStatusButton" className="statusButton"></span></td>
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
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('transactions', 'hiddenTransactions'); }}>Toggle Section</button> <span id="transactionsStatusButton" className="statusButton"></span></td>
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
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('cnaccounts', 'hiddenCnaccounts'); }}>Toggle Section</button> <span id="cnaccountsStatusButton" className="statusButton"></span></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>Open</td>
                        <td id="01_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RRSP</td>
                        <td id="02_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RRIF</td>
                        <td id="04_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RESP - Individual Plan</td>
                        <td id="05_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RESP - Family Plan</td>
                        <td id="06_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>DPSP</td>
                        <td id="07_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RHOSP (Quebec Only)</td>
                        <td id="08_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>LIF</td>
                        <td id="10_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>LIRA</td>
                        <td id="11_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>LRIF (Alberta, Saskatchewan)</td>
                        <td id="12_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RRTF (Quebec Only)</td>
                        <td id="13_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>PRIF</td>
                        <td id="14_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RPP - Defined Benefit</td>
                        <td id="15_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RPP - Defined Contribution</td>
                        <td id="16_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>TFSA - Tax Free Savings Account</td>
                        <td id="17_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RDSP - Registered Disability Savings Plan</td>
                        <td id="18_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RLIF - Restricted Life Income Fund</td>
                        <td id="19_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>RLSP - Restricted Locked-In Savings Plan</td>
                        <td id="20_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>IPP - Individual Pension Plan</td>
                        <td id="21_CNACC"></td>
                    </tr>
                    <tr>
                        <td><b>Accounts - Nom/Inter:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('niaccounts', 'hiddenNiaccounts'); }}>Toggle Section</button> <span id="niaccountsStatusButton" className="statusButton"></span></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>01</td>
                        <td id="01_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>02</td>
                        <td id="02_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>04</td>
                        <td id="04_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>05</td>
                        <td id="05_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>06</td>
                        <td id="06_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>07</td>
                        <td id="07_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>08</td>
                        <td id="08_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>10</td>
                        <td id="10_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>11</td>
                        <td id="11_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>12</td>
                        <td id="12_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>13</td>
                        <td id="13_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>14</td>
                        <td id="14_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>15</td>
                        <td id="15_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>16</td>
                        <td id="16_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>17</td>
                        <td id="17_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>18</td>
                        <td id="18_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>19</td>
                        <td id="19_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>20</td>
                        <td id="20_NIACC"></td>
                    </tr>
                    <tr className="hiddenNiaccounts niaccounts">
                        <td>21</td>
                        <td id="21_NIACC"></td>
                    </tr>
                    <tr>
                        <td><b>Dividend Options:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('dividends', 'hiddenDividends') }}>Toggle Section</button></td>
                    </tr>
                    <tr className="hiddenDividends dividends">
                        <td>Dividend Frequency</td>
                        <td id="DIV_FREQ"></td>
                    </tr>
                    <tr className="hiddenDividends dividends">
                        <td>Distribution Offered - Reinvest</td>
                        <td id="DIV_OPT_1"></td>
                    </tr>
                    <tr className="hiddenDividends dividends">
                        <td>Distribution Offered - Cash</td>
                        <td id="DIV_OPT_4"></td>
                    </tr>
                    <tr className="hiddenDividends dividends">
                        <td>Distribution Offered - Redirection</td>
                        <td id="DIV_OPT_5"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
    return page;
}

function fileUpload() {
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
