/*
This function returns the DisplayRows react object which contains the 
row objects for the display table. Each row shows the basic information which
pertains to the mutual fund put on that row based on the chosen count table row
*/
function DisplayRows(props) {
    let piece;

    piece = (props.output).map((row, index) =>
        <tr key={index}>
            <RowContent input={objToArray(row)} type="content" />
        </tr>
    );
    return piece;
}