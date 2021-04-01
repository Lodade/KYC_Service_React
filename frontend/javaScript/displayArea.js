/*
This function returns the DisplayArea react object which
is where all the main interactive subobjects are added
excluding the navigation bars
*/
function DisplayArea(props) {
  let piece;

  if (props.ms === 3) {
    if (props.ss === 1) {}
  }

  if (props.ms === 2) {
    if (props.ss === 1) {
      piece = /*#__PURE__*/React.createElement(Explore_Dashboard, null);
    }

    if (props.ss === 2) {
      piece = /*#__PURE__*/React.createElement(Explore_ViewProduct, {
        changePage: props.changePage,
        showResults: props.showResults
      });
    }

    if (props.ss === 6) {
      piece = /*#__PURE__*/React.createElement(PageIntegrator, null);
    }
  }

  let page = /*#__PURE__*/React.createElement("div", {
    id: "displayArea"
  }, piece);
  return page;
}