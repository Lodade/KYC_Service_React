function FilterButtons(props) {
  let element = /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "PROD_TYPE"
  }, "Prod. Type: "), /*#__PURE__*/React.createElement("select", {
    id: "prodTypeChooser",
    name: props.filterNames[0],
    size: "1",
    onChange: async e => props.changeFilter(e.target.value, 0)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All"), /*#__PURE__*/React.createElement(FilterSet, {
    name: props.filterNames[0],
    hasEnum: true
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "LOAD_TYPE"
  }, " Load Type: "), /*#__PURE__*/React.createElement("select", {
    id: "loadTypeChooser",
    name: props.filterNames[1],
    size: "1",
    onChange: async e => props.changeFilter(e.target.value, 1)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All"), /*#__PURE__*/React.createElement(FilterSet, {
    name: props.filterNames[1],
    hasEnum: true
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "CLASSIFICATION"
  }, " Classification: "), /*#__PURE__*/React.createElement("select", {
    id: "classificationChooser",
    name: props.filterNames[2],
    size: "1",
    onChange: async e => props.changeFilter(e.target.value, 2)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All"), /*#__PURE__*/React.createElement(FilterSet, {
    name: props.filterNames[2],
    hasEnum: true
  })), /*#__PURE__*/React.createElement("label", {
    htmlFor: "RISK_CLASS"
  }, " Risk: "), /*#__PURE__*/React.createElement("select", {
    id: "riskChooser",
    name: props.filterNames[3],
    size: "1",
    onChange: async e => props.changeFilter(e.target.value, 3)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "All"), /*#__PURE__*/React.createElement(FilterSet, {
    name: props.filterNames[3],
    hasEnum: false
  })));
  return element;
}