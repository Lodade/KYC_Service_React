/*
This function returns the SearchProduct react object which contains the interface
for a user to search for mutual funds using the management code and fund id
*/
function SearchProduct(props) {
    let page = (
        <div id="explore_viewProduct">
            <p><b>Product Search</b></p>
            <form id="queryForm">
                <label>Enter a symbol:</label>
                <input type="text" id="symbolInput" onChange={props.symbolInput}></input><br></br><br></br>
                <input type="submit" defaultValue="Search" onClick={props.onSearch}></input>
            </form>
        </div>
    );
    return page;
}