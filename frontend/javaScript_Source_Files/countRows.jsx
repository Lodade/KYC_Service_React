/*
This function returns the CountRows react object which contains the row objects
for the count table. Each row shows the count and distinct count of the mutual funds
which fall under the row's option, whether that be a product type, load type,
classification type or risk class type.
*/
function CountRows(props) {
    let piece;
    let currentKeys = Object.keys(props.output[0]);
    piece = (props.output).map((row, index) =>
        <tr key={index}>
            <RowContent input={objToArray(row)} type="linkedContent" displayFunction={props.displayChange} queryType={currentKeys[0]} />
        </tr>
    );
    return piece;
}