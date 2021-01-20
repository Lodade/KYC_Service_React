function dashboardManager() {
  /*
  This function takes in the current choices of each of the filters,
  the names of each filter and if the sql statement it will attach to
  already has a where statement or not. With those, it assembles an
  sql statement which narrows the query's results to only those 
  included in the combination of filters.
  */
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
    /*
    This function returns the results of the queryFilterAssembler function. It's
    purpose is to expose the queryFilterAssembler function to any scope which can see
    an instance of dashboardManager while still keeping queryFilterAssembler
    encapsulated in the dashboardManager function so that it can be used
    by any of the functions being returned
    */
    filterGrab: async function (choices, filters, hasWhere) {
      let result = await queryFilterAssembler(choices, filters, hasWhere);
      return result;
    },

    /*
    This function takes in the name of the particular filter and if the 
    filter's options have any enumeration. With those, it outputs an array
    of all of the options available for that filter for initial setup
    purposes.
    */
    filterListSetup: async function (name, hasEnum) {
      let query;
      let filterList = [];
      let keys;

      if (hasEnum) {
        query = "SELECT DISTINCT(fp." + name + "), f2.FULL_" + name + " FROM fsrv_prod fp, fsrv_" + name + "_enum f2 WHERE fp." + name + "=f2." + name;
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

    /*
    This function takes in the currently designated button type and
    returns an array of strings which correspond to the headers for 
    each column of the count table and change depending on if the table
    is currently breaking down the mutual funds by managment company,
    product type, load type, classification or risk class 
    */
    headerChooser: async function (buttonType) {
      let headers = [];

      switch (buttonType) {
        case "mgmtCo":
          headers = ["Mgmt Code", "Fund Count", "Distinct Fund Count"];
          break;

        case "prodType":
          headers = ["Product Type", "Full Name", "Fund Count", "Distinct Fund Count"];
          break;

        case "loadType":
          headers = ["Load Type", "Full Name", "Fund Count", "Distinct Fund Count"];
          break;

        case "classification":
          headers = ["Classification", "Full Name", "Fund Count", "Distinct Fund Count"];
          break;

        case "risk":
          headers = ["Risk Class", "Fund Count", "Distinct Fund Count"];
          break;
      }

      return headers;
    },

    /*
    This function takes in the currently designated button type, the names of
    the available filters and current choice of each of the filters. With these,
    it returns an array of objects, with each object containing the information
    pertaining to one row in the counts table. 
    */
    queryChooser: async function (buttonType, filters, choices) {
      let query;
      let filterPart = "";
      let copy = "";

      switch (buttonType) {
        case "mgmtCo":
          filterPart = await queryFilterAssembler(choices, filters, false);

          if (filterPart.substring(0, 6) == " WHERE") {
            copy = " AND" + filterPart.substring(6, filterPart.length);
          }

          copy = copy.replace(/\sf\W/g, " f2.");
          query = "SELECT DISTINCT(MGMT_CODE)," + " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.MGMT_CODE=f.MGMT_CODE" + copy + ") FUND_COUNT," + " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.MGMT_CODE=f.MGMT_CODE" + copy + ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f" + filterPart;
          break;

        case "prodType":
          filterPart = await queryFilterAssembler(choices, filters, true);
          copy = filterPart;
          copy = copy.replace(/\sf\W/g, " f2.");
          query = "SELECT DISTINCT(f.PROD_TYPE)," + " fe.FULL_PROD_TYPE," + " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.PROD_TYPE=f.PROD_TYPE" + copy + ") FUND_COUNT," + " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.PROD_TYPE=f.PROD_TYPE" + copy + ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f, fsrv_prod_type_enum fe" + " WHERE fe.PROD_TYPE=f.PROD_TYPE" + filterPart;
          break;

        case "loadType":
          filterPart = await queryFilterAssembler(choices, filters, true);
          copy = filterPart;
          copy = copy.replace(/\sf\W/g, " f2.");
          query = "SELECT DISTINCT(f.LOAD_TYPE)," + " fe.FULL_LOAD_TYPE," + " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.LOAD_TYPE=f.LOAD_TYPE" + copy + ") FUND_COUNT," + " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.LOAD_TYPE=f.LOAD_TYPE" + copy + ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f, fsrv_load_type_enum fe " + " WHERE fe.LOAD_TYPE=f.LOAD_TYPE" + filterPart;
          break;

        case "classification":
          filterPart = await queryFilterAssembler(choices, filters, true);
          copy = filterPart;
          copy = copy.replace(/\sf\W/g, " f2.");
          query = "SELECT DISTINCT(f.CLASSIFICATION)," + " fe.FULL_CLASSIFICATION," + " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.CLASSIFICATION=f.CLASSIFICATION" + copy + ") FUND_COUNT," + " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.CLASSIFICATION=f.CLASSIFICATION" + copy + ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f, fsrv_classification_enum fe" + " WHERE fe.CLASSIFICATION=f.CLASSIFICATION" + filterPart;
          break;

        case "risk":
          filterPart = await queryFilterAssembler(choices, filters, false);

          if (filterPart.substring(0, 6) == " WHERE") {
            copy = " AND" + filterPart.substring(6, filterPart.length);
          }

          copy = copy.replace(/\sf\W/g, " f2.");
          query = "SELECT DISTINCT(RISK_CLASS)," + " (SELECT COUNT(*) FROM fsrv_prod f2 WHERE f2.RISK_CLASS=f.RISK_CLASS" + copy + ") FUND_COUNT," + " (SELECT COUNT(DISTINCT(f2.FUND_LINK_ID)) from fsrv_prod f2 WHERE f2.RISK_CLASS=f.RISK_CLASS" + copy + ") DISTINCT_FUND_COUNT" + " FROM fsrv_prod f" + filterPart;
          break;
      }

      let result = await queryProcess(query);
      return result;
    }
  };
}