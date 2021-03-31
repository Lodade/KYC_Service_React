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
}