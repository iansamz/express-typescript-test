// follow path section
var driverBlock = document.getElementById("driverBlock"),
  riderBlock = document.getElementById("riderBlock");

driverBlock.onmouseover = function () {
  driverBlock.classList.add("active-item");
};

driverBlock.onmouseout = function () {
  driverBlock.classList.remove("active-item");
};

riderBlock.onmouseover = function () {
  riderBlock.classList.add("active-item");
};

riderBlock.onmouseout = function () {
  riderBlock.classList.remove("active-item");
};

window.onLoad = function () {
  riderBlock.classList.add("active-item");
};

// fare estimate section

var vejpaBlock = document.getElementById("vejpaImage"),
  carBlock = document.getElementById("carImage"),
  getEstimateBlock = document.getElementById("getEstimate"),
  vejpa = true;

vejpaBlock.onclick = function () {
  vejpaBlock.classList.add("active-item");
  carBlock.classList.remove("active-item");
  vejpa = true;
};

carBlock.onclick = function () {
  carBlock.classList.add("active-item");
  vejpaBlock.classList.remove("active-item");
  vejpa = false;
};

getEstimateBlock.onclick = function () {
  // TODO go to estimate page
  // pass whether vejpa or car
};
