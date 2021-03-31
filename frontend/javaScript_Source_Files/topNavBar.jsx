/*
This function returns the TopNavBar react object which
at this point is the only main element of the three which will
not have subobjects to swap out
*/
function TopNavBar() {
    let part = (
      <div className="topNavBar">
        <a>Home</a>
        <a>Explore</a>
        <a>Analyze</a>
        <a>Manage</a>
      </div>
    );
    return part;
  }