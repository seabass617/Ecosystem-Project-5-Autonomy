function show() {
  var x = document.getElementById("info-block");
  var y = document.getElementById("show-button");
  if (!x.style.display || x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  
  if (!y.style.display || y.style.display === "block"){
    y.style.display = "none";
  } else {
    y.style.display = "block"; 
  }
  
}

function hide() {
  var x = document.getElementById("info-block");
  var y = document.getElementById("show-button");

  if (!x.style.display || x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }

  if (!y.style.display || y.style.display === "none"){
    y.style.display = "block";
  } else {
    y.style.display = "none"; 
  }

}