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