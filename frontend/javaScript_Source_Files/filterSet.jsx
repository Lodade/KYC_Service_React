/*
This function returns the FilterSet react object which contains the filter options of 
one of the four current filters, designated by the name passed through the props
*/
function FilterSet(props) {
    let piece;
    const [filterOptions, changeOptions] = React.useState([]);

    async function filterOptionsGather() {
        if (filterOptions[0] == null) {
            changeOptions(await props.dashManage.filterListSetup(props.name, props.hasEnum));
        }
    }

    React.useEffect(filterOptionsGather);

    piece = filterOptions.map((row, index) =>
        <option key={index} value={row.queryValue}>{row.htmlText}</option>
    );

    return piece;
}