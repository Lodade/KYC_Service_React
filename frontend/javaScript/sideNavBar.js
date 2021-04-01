function SideNavBar(props) {
  let element = /*#__PURE__*/React.createElement("div", {
    className: "sideNavBar"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => props.changePage(1, false)
  }, "Dashboard"), /*#__PURE__*/React.createElement("a", {
    onClick: () => props.changePage(2, false)
  }, "View Product"), /*#__PURE__*/React.createElement("a", null, "View Related"), /*#__PURE__*/React.createElement("a", null, "View Similar"), /*#__PURE__*/React.createElement("a", null, "Find By Criteria"), /*#__PURE__*/React.createElement("a", {
    onClick: () => props.changePage(6, false)
  }, "Page Integrator"));
  return element;
}