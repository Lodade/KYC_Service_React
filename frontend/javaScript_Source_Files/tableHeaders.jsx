/*
This function returns the TableHeaders react object which contains the 
headers for any table object
*/
function TableHeaders(props) {
    let piece;
    piece = (
        <tr>
            <RowContent input={props.input} type="header" />
        </tr>
    );
    return piece;
}