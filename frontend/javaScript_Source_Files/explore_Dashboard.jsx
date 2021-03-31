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