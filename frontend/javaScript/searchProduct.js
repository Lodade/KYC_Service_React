/*
This function returns the SearchProduct react object which contains the interface
for a user to search for mutual funds using the management code and fund id
*/
function SearchProduct(props) {
  let page = /*#__PURE__*/React.createElement("div", {
    id: "explore_viewProduct"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Product Search")), /*#__PURE__*/React.createElement("form", {
    id: "queryForm"
  }, /*#__PURE__*/React.createElement("label", null, "Enter a symbol:"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "symbolInput",
    onChange: props.symbolInput
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    defaultValue: "Search",
    onClick: props.onSearch
  })));
  return page;
}