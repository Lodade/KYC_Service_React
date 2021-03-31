/*This functions returns the RowContent react object which contains the 
contents for a single table row. It can return the data it is given
in normal table cells with no linking, normal table header cells
or special table cells which when clicked on change the contents of the 
display table
*/
function RowContent(props) {
  let piece;

  if (props.type == "content") {
    piece = props.input.map((row, index) => /*#__PURE__*/React.createElement("td", {
      key: index
    }, row));
  } else if (props.type == "header") {
    piece = props.input.map((row, index) => /*#__PURE__*/React.createElement("th", {
      key: index
    }, row));
  } else if (props.type == "linkedContent") {
    piece = props.input.map((row, index) => /*#__PURE__*/React.createElement("td", {
      key: index
    }, /*#__PURE__*/React.createElement("a", {
      onClick: async () => props.displayFunction(props.queryType, props.input[0])
    }, row)));
  }

  return piece;
}