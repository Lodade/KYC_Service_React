let root = document.getElementById("root");
let element = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "topNavBar"
}, /*#__PURE__*/React.createElement("a", null, "Home"), /*#__PURE__*/React.createElement("a", null, "Explore"), /*#__PURE__*/React.createElement("a", null, "Analyze"), /*#__PURE__*/React.createElement("a", null, "Manage")), /*#__PURE__*/React.createElement("div", {
  className: "sideNavBar"
}, /*#__PURE__*/React.createElement("a", null, "Dashboard"), /*#__PURE__*/React.createElement("a", {
  onClick: async () => {
    await pageManager.changePage(2, 2);
  }
}, "View Product"), /*#__PURE__*/React.createElement("a", null, "View Related"), /*#__PURE__*/React.createElement("a", null, "View Similar"), /*#__PURE__*/React.createElement("a", null, "Find By Criteria")));
ReactDOM.render(element, root);