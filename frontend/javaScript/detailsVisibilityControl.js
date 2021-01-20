/*
This function takes in a string that describes what the
class name is for the section that is being toggled and
another string which describes what the section's hidden 
class name is. The function then toggles the hidden class
name.
*/
async function toggleDetails(type, hiddenType) {
  let holder = document.getElementsByClassName(type);

  for (let i = 0; i < holder.length; i++) {
    holder[i].classList.toggle(hiddenType);
  }
}