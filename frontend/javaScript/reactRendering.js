let root = document.getElementById("root");
let element = /*#__PURE__*/React.createElement(EntirePage, null);

function EntirePage() {
  const [mainSection, changeMS] = React.useState(2);
  const [subSection, changeSS] = React.useState(1);
  let page = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopNavBar, null), /*#__PURE__*/React.createElement("div", {
    className: "sideNavBar"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => changeSS(1)
  }, "Dashboard"), /*#__PURE__*/React.createElement("a", {
    onClick: () => changeSS(2)
  }, "View Product"), /*#__PURE__*/React.createElement("a", null, "View Related"), /*#__PURE__*/React.createElement("a", null, "View Similar"), /*#__PURE__*/React.createElement("a", null, "Find By Criteria")), /*#__PURE__*/React.createElement(DisplayArea, {
    ms: mainSection,
    ss: subSection
  }));
  return page;
}

function DisplayArea(props) {
  let piece;

  if (props.ms == 2) {
    if (props.ss == 1) {
      piece = /*#__PURE__*/React.createElement(Explore_Dashboard, null);
    }

    if (props.ss == 2) {
      piece = /*#__PURE__*/React.createElement(Explore_ViewProduct, null);
    }
  }

  let page = /*#__PURE__*/React.createElement("div", {
    id: "displayArea"
  }, piece);
  return page;
}

function TopNavBar() {
  let part = /*#__PURE__*/React.createElement("div", {
    className: "topNavBar"
  }, /*#__PURE__*/React.createElement("a", null, "Home"), /*#__PURE__*/React.createElement("a", null, "Explore"), /*#__PURE__*/React.createElement("a", null, "Analyze"), /*#__PURE__*/React.createElement("a", null, "Manage"));
  return part;
}

ReactDOM.render(element, root);