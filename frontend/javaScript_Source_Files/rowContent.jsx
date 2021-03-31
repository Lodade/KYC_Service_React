/*This functions returns the RowContent react object which contains the 
contents for a single table row. It can return the data it is given
in normal table cells with no linking, normal table header cells
or special table cells which when clicked on change the contents of the 
display table
*/
function RowContent(props) {
    let piece;
    if (props.type === "content") {
        piece = (props.input).map((row, index) =>
            <td key={index}>{row}</td>
        );
    } else if (props.type === "header") {
        piece = (props.input).map((row, index) =>
            <th key={index}>{row}</th>
        );
    } else if (props.type === "linkedContent") {
        piece = (props.input).map((row, index) =>
            <td key={index}><a onClick={async () => props.displayFunction(props.queryType, props.input[0])}>{row}</a></td>
        );
    }
    return piece;
}