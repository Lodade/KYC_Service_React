/*
This function returns the react object which holds the TopNavBar,
the SideNavBar and the DisplayArea, which are the three
main components of the application where all subsequent 
elements are added as subobjects
*/
function EntirePage() {
  const [mainSection, changeMS] = React.useState(2);
  const [subSection, changeSS] = React.useState(1);
  let page = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopNavBar, null), /*#__PURE__*/React.createElement(SideNavBar, {
    changeSS: changeSS
  }), /*#__PURE__*/React.createElement(DisplayArea, {
    ms: mainSection,
    ss: subSection
  }));
  return page;
}