/*
This function takes in any sql statement used in the program.
With this, it returns the query result from the database
pertaining to the given statement.
*/
async function queryProcess(query) {
    let response = await fetch("/query", {
        method: "POST",
        body: query
    });

    if (response.ok) {
        let result = await response.json();
        return result;
    } else {
        console.log("Query results not received");
    }
}