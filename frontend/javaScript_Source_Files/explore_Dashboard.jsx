/*
This function returns the Explore_Dashboard object which
allows you to view all of the mutual funds broken down by management company,
product type, load type, classification type and risk class type. Each of these types
can also be filtered by their product type, load type, classification type and 
risk class type respectively.
*/
function Explore_Dashboard(props) {
    const dashManager = dashboardManager();
    const filterNames = ["PROD_TYPE", "LOAD_TYPE", "CLASSIFICATION", "RISK_CLASS"];
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

    React.useEffect(async () => {
        await dashboardUpdate(currentName, [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
    }, []);

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

    async function updateTableType(type) {
        changeName(type);
        await dashboardUpdate(type, [prodTypeChoice, loadTypeChoice, classificationChoice, riskClassChoice]);
    }

    let page = (
        <div id="explore_dashboard">
            <TableTypeButton type="mgmtCo" updateTableType={updateTableType} buttonText="Mgmt. Co"/>
            <TableTypeButton type="prodType" updateTableType={updateTableType} buttonText="Prod. Type"/>
            <TableTypeButton type="loadType" updateTableType={updateTableType} buttonText="Load Type"/>
            <TableTypeButton type="classification" updateTableType={updateTableType} buttonText="Classification"/>
            <TableTypeButton type="risk" updateTableType={updateTableType} buttonText="Risk" /><br></br>
            <p><b>Management Company Dashboard</b></p>
            <FilterButtons filterNames={filterNames} changeFilter={changeFilter}/><br></br>
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