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
    const [showResults, changeShow] = React.useState(false);
    const [symbolText, changeSymbol] = React.useState("");
    const [result, changeResult] = React.useState();

    function resultCheck(){
        if(result != undefined){
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
        page = <ResultsArea queryResult={result[0]} />
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
    let rows = resultsManager.resultsHeaderPopulator(props.queryResult);
    let page = (
        <div id="resultsArea">
            <p><a>Product Search</a>{'>'}<a>Results</a></p>
            <p id="resultsFirstRow">{rows[0]}</p>
            <p id="resultsSecondRow">{rows[1]}</p>
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
                        <td id="MGMT_CODE"></td>
                    </tr>
                    <tr>
                        <td>Fund Identifier</td>
                        <td id="FUND_ID"></td>
                    </tr>
                    <tr>
                        <td>CUSIP</td>
                        <td id="CUSIP"></td>
                    </tr>
                    <tr>
                        <td>ISIN</td>
                        <td id="ISIN"></td>
                    </tr>
                    <tr>
                        <td>Fund Brand</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Management Company Brand Name</td>
                        <td id="MGMT_CO_BRAND_NM"></td>
                    </tr>
                    <tr>
                        <td>Series</td>
                        <td id="SERIES"></td>
                    </tr>
                    <tr>
                        <td>class</td>
                        <td id="CLASS"></td>
                    </tr>
                    <tr>
                        <td>Series-Class Sequence in Fund Name</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>English Short Name</td>
                        <td id="ENG_SHORT_NM"></td>
                    </tr>
                    <tr>
                        <td>English Long Name</td>
                        <td id="ENG_LONG_NM"></td>
                    </tr>
                    <tr>
                        <td>French Short Name</td>
                        <td id="FRE_SHORT_NM"></td>
                    </tr>
                    <tr>
                        <td>French Long Name</td>
                        <td id="FRE_LONG_NM"></td>
                    </tr>
                    <tr>
                        <td>Product Type</td>
                        <td id="FULL_PROD_TYPE"></td>
                    </tr>
                    <tr>
                        <td>Currency</td>
                        <td id="FULL_CURRENCY"></td>
                    </tr>
                    <tr>
                        <td>Load Type</td>
                        <td id="FULL_LOAD_TYPE"></td>
                    </tr>
                    <tr>
                        <td>Fund Classification (CIFSC)</td>
                        <td id=""></td>
                    </tr>
                    <tr>
                        <td>Fund Tax Structure</td>
                        <td id=""></td>
                    </tr>
                    <tr>
                        <td>Money Market Flag</td>
                        <td id="MM_FLAG"></td>
                    </tr>
                    <tr>
                        <td>Bare Trustee Flag</td>
                        <td id="BARE_TRUSTEE_FLAG"></td>
                    </tr>
                    <tr>
                        <td>Risk Classification</td>
                        <td id="RISK_CLASS"></td>
                    </tr>
                    <tr>
                        <td>Fees:</td>
                        <td id=""></td>
                    </tr>
                    <tr>
                        <td>Account Setup Fee</td>
                        <td id="ACCT_SETUP_FEE"></td>
                    </tr>
                    <tr>
                        <td>Service Fee Rate</td>
                        <td id="SERV_FEE_RATE"></td>
                    </tr>
                    <tr>
                        <td>Service Fee Frequency</td>
                        <td id="SERV_FEE_FREQ"></td>
                    </tr>
                    <tr>
                        <td>DSC%</td>
                        <td id="CURR"></td>
                    </tr>
                    <tr>
                        <td>DSC Fee Duration</td>
                        <td id="CURR"></td>
                    </tr>
                    <tr>
                        <td>Maximum Client Paid Commission %</td>
                        <td id="MAX_COMM"></td>
                    </tr>
                    <tr>
                        <td>Maximum Client Paid Switch Commission %</td>
                        <td id="MAX_SW_COMM"></td>
                    </tr>
                    <tr>
                        <td>Negotiated Fee</td>
                        <td id="NEGOT_FEE"></td>
                    </tr>
                    <tr>
                        <td>Negotiated Trailer</td>
                        <td id="NEGOT_TRAILER"></td>
                    </tr>
                    <tr>
                        <td>Fee Based Account Eligibility</td>
                        <td id=""></td>
                    </tr>
                    <tr>
                        <td>Discount Brokerage Only</td>
                        <td id="DISC_BROKER_ONLY"></td>
                    </tr>
                    <tr>
                        <td>Registration Document Type</td>
                        <td id="REG_DOC_TYPE"></td>
                    </tr>
                    <tr>
                        <td>Eligible US</td>
                        <td id="ELIG_US"></td>
                    </tr>
                    <tr>
                        <td>Eligible Offshore</td>
                        <td id="ELIG_OFFSHORE"></td>
                    </tr>
                    <tr>
                        <td>Eligible PAC</td>
                        <td id="ELIG_PAC"></td>
                    </tr>
                    <tr>
                        <td>Eligible SWP</td>
                        <td id="ELIG_SWP"></td>
                    </tr>
                    <tr>
                        <td>Effective Date</td>
                        <td id="EFF_DT"></td>
                    </tr>
                    <tr>
                        <td>Cut Off Time</td>
                        <td id="CUT_OFF_TIME"></td>
                    </tr>
                    <tr>
                        <td>Fund Link Identifier</td>
                        <td id="FUND_LINK_ID"></td>
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
                        <td id="MIN_FIRST"></td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum Subsequent Investment</td>
                        <td id="MIN_NXT"></td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum Sell</td>
                        <td id="MIN_SELL"></td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum Switch</td>
                        <td id="MIN_SW"></td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum Account Balance</td>
                        <td id="MIN_BAL"></td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum PAC Investment</td>
                        <td id="MIN_PAC"></td>
                    </tr>
                    <tr className="hiddenMinimums minimums">
                        <td>Minimum SWP</td>
                        <td id="MIN_SWP"></td>
                    </tr>
                    <tr>
                        <td><b>Eligible Provinces:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('provinces', 'hiddenProvinces'); }}>Toggle Section</button> <span id="provincesStatusButton" className="statusButton"></span></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Alberta</td>
                        <td id="AB_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>British Columbia</td>
                        <td id="BC_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Manitoba</td>
                        <td id="MB_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>New Brunswick</td>
                        <td id="NB_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>New Foundland</td>
                        <td id="NL_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Northwest Territories</td>
                        <td id="NT_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Nova Scotia</td>
                        <td id="NS_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Nunavut</td>
                        <td id="NU_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Ontario</td>
                        <td id="ON_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Prince Edward Island</td>
                        <td id="PE_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Quebec</td>
                        <td id="QC_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Saskatchewan</td>
                        <td id="SK_prov"></td>
                    </tr>
                    <tr className="hiddenProvinces provinces">
                        <td>Yukon Territories</td>
                        <td id="YT_prov"></td>
                    </tr>
                    <tr>
                        <td><b>Eligible Transactions:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('transactions', 'hiddenTransactions'); }}>Toggle Section</button> <span id="transactionsStatusButton" className="statusButton"></span></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Buy</td>
                        <td id="B_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Commission Rebate</td>
                        <td id="CR_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Switch-in</td>
                        <td id="SI_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Switch-out</td>
                        <td id="SO_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Sell</td>
                        <td id="S_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Internal Transfer-in</td>
                        <td id="II_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Internal Transfer-out</td>
                        <td id="IO_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>External Transfer-in</td>
                        <td id="EI_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>External Transfer-out</td>
                        <td id="EO_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>LSIF Rollover-in</td>
                        <td id="LI_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>LSIF Rollover-out</td>
                        <td id="LO_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Fee</td>
                        <td id="F_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Reset</td>
                        <td id="R_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>ICT-in</td>
                        <td id="CI_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>ICT-out</td>
                        <td id="CO_status"></td>
                    </tr>
                    <tr className="hiddenTransactions transactions">
                        <td>Seg. Maturity</td>
                        <td id="SM_status"></td>
                    </tr>
                    <tr>
                        <td><b>Accounts - Client Name:</b></td>
                        <td><button type="button" className="expandButton" onClick={async () => { await toggleDetails('cnaccounts', 'hiddenCnaccounts'); }}>Toggle Section</button> <span id="cnaccountsStatusButton" className="statusButton"></span></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>01</td>
                        <td id="01_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>02</td>
                        <td id="02_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>04</td>
                        <td id="04_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>05</td>
                        <td id="05_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>06</td>
                        <td id="06_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>07</td>
                        <td id="07_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>08</td>
                        <td id="08_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>10</td>
                        <td id="10_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>11</td>
                        <td id="11_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>12</td>
                        <td id="12_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>13</td>
                        <td id="13_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>14</td>
                        <td id="14_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>15</td>
                        <td id="15_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>16</td>
                        <td id="16_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>17</td>
                        <td id="17_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>18</td>
                        <td id="18_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>19</td>
                        <td id="19_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>20</td>
                        <td id="20_CNACC"></td>
                    </tr>
                    <tr className="hiddenCnaccounts cnaccounts">
                        <td>21</td>
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