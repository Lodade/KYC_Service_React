function dashboardManager() {

    async function queryFilterAssembler(choices, filters, hasWhere) {
        let statement = " ";
        let noFiltering = true;
        let prior = false;

        for (let i = 0; i < choices.length; i++) {
            if (choices[i] != "") {
                noFiltering = false;
            }
        }

        for (let i = 0; i < choices.length; i++) {
            if (!hasWhere && i == 0 && noFiltering == false) {
                statement += "WHERE ";
            } else if (hasWhere && i == 0 && noFiltering == false) {
                statement += "AND ";
            }

            if (choices[i] != "" && prior == true) {
                statement += " AND " + "f." + filters[i] + "=('" + choices[i] + "')";
            } else if (choices[i] != "") {
                statement += "f." + filters[i] + "=('" + choices[i] + "')";
                prior = true;
            }
        }

        return statement;
    }
    return {
        filterListSetup: async function (name, hasEnum) {
            let query;
            let filterList = [];
            let keys;
            if (hasEnum) {
                query = "SELECT DISTINCT(fp." + name + "), f2.FULL_" + name + " FROM fsrv_prod fp, fsrv_" + name +
                    "_enum f2 WHERE fp." + name + "=f2." + name;
            } else {
                query = "SELECT DISTINCT(fp." + name + ") FROM fsrv_prod fp";
            }
            let result = await queryProcess(query);
            for (let i = 0; i < result.length; i++) {
                let filter = {};
                keys = Object.keys(result[i]);
                if (hasEnum) {
                    filter.htmlText = result[i][keys[0]] + " " + result[i][keys[1]];
                    filter.queryValue = result[i][keys[0]];
                } else {
                    filter.htmlText = result[i][keys[0]];
                    filter.queryValue = result[i][keys[0]];
                }
                filterList[i] = filter;
            }
            return filterList;
        },
        queryChooser: async function (buttonType, filters, choices) {
            let query;
            let headers;
            let filterPart = "";
            let copy = "";

            switch (buttonType) {
                case "mgmtCo":
                    filterPart = await queryFilterAssembler(choices, filters, false);

                    if (filterPart.substring(0, 6) == " WHERE") {
                        copy = " AND" + filterPart.substring(6, filterPart.length);
                    }

                    copy = copy.replace(/\sf\W/g, " f2.");
                    query = "SELECT DISTINCT(MGMT_CODE)," + " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.MGMT_CODE=f.MGMT_CODE" +
                        copy + ") FUND_COUNT," + " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.MGMT_CODE=f.MGMT_CODE" +
                        copy + ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f" + filterPart;
                    headers = ["Mgmt Code", "Fund Count", "Distinct Fund Count"];
                    break;

                case "prodType":
                    filterPart = await queryFilterAssembler(choices, filters, true);

                    copy = filterPart;
                    copy = copy.replace(/\sf\W/g, " f2.");
                    query = "SELECT DISTINCT(f.PROD_TYPE)," + " fe.FULL_PROD_TYPE," +
                        " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.PROD_TYPE=f.PROD_TYPE" + copy + ") FUND_COUNT," +
                        " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.PROD_TYPE=f.PROD_TYPE" + copy +
                        ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f, fsrv_prod_type_enum fe" + " WHERE fe.PROD_TYPE=f.PROD_TYPE"
                        + filterPart;
                    headers = ["Product Type", "Full Name", "Fund Count", "Distinct Fund Count"];
                    break;

                case "loadType":
                    filterPart = await queryFilterAssembler(choices, filters, true);

                    copy = filterPart;
                    copy = copy.replace(/\sf\W/g, " f2.");
                    query = "SELECT DISTINCT(f.LOAD_TYPE)," + " fe.FULL_LOAD_TYPE," +
                        " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.LOAD_TYPE=f.LOAD_TYPE" + copy + ") FUND_COUNT," +
                        " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.LOAD_TYPE=f.LOAD_TYPE" + copy +
                        ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f, fsrv_load_type_enum fe " + " WHERE fe.LOAD_TYPE=f.LOAD_TYPE"
                        + filterPart;
                    headers = ["Load Type", "Full Name", "Fund Count", "Distinct Fund Count"];
                    break;

                case "classification":
                    filterPart = await queryFilterAssembler(choices, filters, true);

                    copy = filterPart;
                    copy = copy.replace(/\sf\W/g, " f2.");
                    query = "SELECT DISTINCT(f.CLASSIFICATION)," + " fe.FULL_CLASSIFICATION," +
                        " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.CLASSIFICATION=f.CLASSIFICATION" + copy +
                        ") FUND_COUNT," + " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.CLASSIFICATION=f.CLASSIFICATION" +
                        copy + ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f, fsrv_classification_enum fe" +
                        " WHERE fe.CLASSIFICATION=f.CLASSIFICATION" + filterPart;
                    headers = ["Classification", "Full Name", "Fund Count", "Distinct Fund Count"];
                    break;

                case "risk":
                    filterPart = await queryFilterAssembler(choices, filters, false);

                    if (filterPart.substring(0, 6) == " WHERE") {
                        copy = " AND" + filterPart.substring(6, filterPart.length);
                    }

                    copy = copy.replace(/\sf\W/g, " f2.");
                    query = "SELECT DISTINCT(RISK_CLASS)," + " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.RISK_CLASS=f.RISK_CLASS" + copy + 
                    ") FUND_COUNT," + " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.RISK_CLASS=f.RISK_CLASS" + copy + 
                    ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f" + filterPart;
                    headers = ["Risk Class", "Fund Count", "Distinct Fund Count"];

                    break;
            }
            let result = await queryProcess(query);
            return result;
        }
    }
}