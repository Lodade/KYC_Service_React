/*
This function takes in an object and returns an array which contains the
contents of each property of the object in the order in which each 
property appears in the original object's keys.
*/
function objToArray(object) {
  let keys = Object.keys(object);
  let output = [];

  for (let i = 0; i < keys.length; i++) {
    output[i] = object[keys[i]];
  }

  return output;
}

function formSetup() {
  let uploadForm = document.getElementById("uploadForm");
  let fileInput = document.getElementById("xmlFileUpload");
  uploadForm.addEventListener("submit", function (e) {
    e.preventDefault();
    fileUploadProcess();
  });

  async function fileUploadProcess() {
    let filesToUpload = new FormData();

    for (let i = 0; i < fileInput.files.length; i++) {
      let fileName = "xmlFile" + i;
      filesToUpload.append(fileName, fileInput.files[i]);
    }

    let response = await fetch("/test", {
      method: "POST",
      body: filesToUpload
    });

    if (response.ok) {
      console.log("File transfer to server successful");
    } else {
      console.log("File transfer to server failed");
    }
  }
}