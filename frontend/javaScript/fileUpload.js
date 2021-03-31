/*
This function returns the FileUpload react object that allows for
xml files to be uploaded to the Node.js middleware but is currently unused
*/
function FileUpload() {
  let page = /*#__PURE__*/React.createElement("div", {
    id: "manage"
  }, /*#__PURE__*/React.createElement("form", {
    id: "uploadForm",
    method: "post",
    enctype: "multipart/form-data"
  }, /*#__PURE__*/React.createElement("label", {
    for: "xmlFileUpload"
  }, "Please input an XML file"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "file",
    id: "xmlFileUpload",
    name: "xmlFileUpload",
    accept: ".xml",
    multiple: true
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    id: "xmlSubmit",
    value: "Submit"
  })));
  return page;
}