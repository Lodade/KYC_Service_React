let root = document.getElementById("root");
let element = /*#__PURE__*/React.createElement(EntirePage, null);
/*
This function returns the react object which holds the TopNavBar,
the SideNavBar and the DisplayArea, which are the three
main components of the application where all subsequent 
elements are added as subobjects
*/

function EntirePage() {
  const [mainSection, changeMS] = React.useState(2);
  const [subSection, changeSS] = React.useState(1);
  let page = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopNavBar, null), /*#__PURE__*/React.createElement("div", {
    className: "sideNavBar"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => changeSS(1)
  }, "Dashboard"), /*#__PURE__*/React.createElement("a", {
    onClick: () => changeSS(2)
  }, "View Product"), /*#__PURE__*/React.createElement("a", null, "View Related"), /*#__PURE__*/React.createElement("a", null, "View Similar"), /*#__PURE__*/React.createElement("a", null, "Find By Criteria"), /*#__PURE__*/React.createElement("a", {
    onClick: () => changeSS(6)
  }, "Page Integrator")), /*#__PURE__*/React.createElement(DisplayArea, {
    ms: mainSection,
    ss: subSection
  }));
  return page;
}
/*
This function returns the DisplayArea react object which
is where all the main interactive subobjects are added
excluding the navigation bars
*/


function DisplayArea(props) {
  let piece;

  if (props.ms == 3) {
    if (props.ss == 1) {}
  }

  if (props.ms == 2) {
    if (props.ss == 1) {
      piece = /*#__PURE__*/React.createElement(Explore_Dashboard, null);
    }

    if (props.ss == 2) {
      piece = /*#__PURE__*/React.createElement(Explore_ViewProduct, null);
    }

    if (props.ss == 6) {
      piece = /*#__PURE__*/React.createElement(PageIntegrator, null);
    }
  }

  let page = /*#__PURE__*/React.createElement("div", {
    id: "displayArea"
  }, piece);
  return page;
}
/*
This function returns the TopNavBar react object which
at this point is the only main element of the three which will
not have subobjects to swap out
*/


function TopNavBar() {
  let part = /*#__PURE__*/React.createElement("div", {
    className: "topNavBar"
  }, /*#__PURE__*/React.createElement("a", null, "Home"), /*#__PURE__*/React.createElement("a", null, "Explore"), /*#__PURE__*/React.createElement("a", null, "Analyze"), /*#__PURE__*/React.createElement("a", null, "Manage"));
  return part;
} //This is where the EntirePage react element is rendered


ReactDOM.render(element, root);