/*
This function returns the TableHeaders react object which contains the 
headers for any table object
*/
function TableHeaders(props) {
  let piece;
  piece = /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement(RowContent, {
    input: props.input,
    type: "header"
  }));
  return piece;
}