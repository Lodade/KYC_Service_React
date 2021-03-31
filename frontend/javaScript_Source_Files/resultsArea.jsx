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

    React.useEffect(async () =>{
        await checkStatus();
    });

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