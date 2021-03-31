/*
This function returns the FileUpload react object that allows for
xml files to be uploaded to the Node.js middleware but is currently unused
*/
function FileUpload() {
    let page = (
        <div id="manage">
            <form id="uploadForm" method="post" enctype="multipart/form-data">
                <label for="xmlFileUpload">Please input an XML file</label><br></br>
                <input type="file" id="xmlFileUpload" name="xmlFileUpload" accept=".xml" multiple></input><br></br>
                <input type="submit" id="xmlSubmit" value="Submit"></input>
            </form>
        </div>
    );
    return page;
}