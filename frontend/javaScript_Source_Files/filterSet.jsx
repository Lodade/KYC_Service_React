/*
This function returns the FilterSet react object which contains the filter options of 
one of the four current filters, designated by the name passed through the props
*/
function FilterSet(props) {
    const dashManage = dashboardManager();
    const [filterOptions, changeOptions] = React.useState([]);

    React.useEffect(async () => {
        changeOptions(await dashManage.filterListSetup(props.name, props.hasEnum));
    }, []);

    let piece = filterOptions.map((row, index) =>
        <option key={index} value={row.queryValue}>{row.htmlText}</option>
    );

    return piece;
}