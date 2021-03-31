/*
This function returns the DisplayArea react object which
is where all the main interactive subobjects are added
excluding the navigation bars
*/
function DisplayArea(props) {
    let piece;
    if (props.ms === 3) {
      if (props.ss === 1) {
  
      }
    }
    if (props.ms === 2) {
      if (props.ss === 1) {
        piece = <Explore_Dashboard />;
      }
      if (props.ss === 2) {
        piece = <Explore_ViewProduct />;
      }
      if(props.ss === 6){
        piece = <PageIntegrator/>
      }
    }
    let page = (
      <div id="displayArea">
        {piece}
      </div>
    );
    return page;
  }