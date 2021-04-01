function SideNavBar(props) {
  const {
    changeShow
  } = React.useContext(ResultsContext);
  let element = /*#__PURE__*/React.createElement("div", {
    className: "sideNavBar"
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => {
      props.changeSS(1);
    }
  }, "Dashboard"), /*#__PURE__*/React.createElement("a", {
    onClick: () => {
      props.changeSS(2);
      changeShow(false);
    }
  }, "View Product"), /*#__PURE__*/React.createElement("a", null, "View Related"), /*#__PURE__*/React.createElement("a", null, "View Similar"), /*#__PURE__*/React.createElement("a", null, "Find By Criteria"), /*#__PURE__*/React.createElement("a", {
    onClick: () => {
      props.changeSS(6);
    }
  }, "Page Integrator"));
  return element;
}