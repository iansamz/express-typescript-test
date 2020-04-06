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

// custom slider to be done better later
// just change active on buttons class
// change class left right and transform

// get buttons and slides
var buttons = document.getElementsByClassName("image-gallery-bullet");
var slides = document.getElementsByClassName("image-gallery-slide");

function slider() {
  // action for slider
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
      // remove all buttons/slides active/center classes
      for (let t = 0; t < buttons.length; t++) {
        if (t !== i) {
          buttons[t].classList.remove("active");
          slides[t].classList.remove("center");
          slides[t].classList.remove("centerStyle");
        }
        slides[t].classList.remove("left");
        slides[t].classList.remove("leftStyle");
        slides[t].classList.remove("right");
        slides[t].classList.remove("rightStyle");
        slides[t].classList.add("ordinaryStyle");
      }

      //add the center and active classes
      buttons[i].classList.add("active");

      let l = i - 1;
      let r = i + 1;
      let end = slides.length - 1;

      let left = l >= 0 ? l : end;
      let right = r <= end ? r : 0;

      addLeftStyles(left);
      addRightStyles(right);
      addCenterStyles(i);
    };
  }
}

slider();

function addCenterStyles(o) {
  slides[o].classList.add("center");
  slides[o].classList.add("centerStyle");
  removeOrdinary(o);
}

function addLeftStyles(o) {
  slides[o].classList.add("left");
  slides[o].classList.add("leftStyle");
  removeOrdinary(o);
}

function addRightStyles(o) {
  slides[o].classList.add("right");
  slides[o].classList.add("rightStyle");
  removeOrdinary(o);
}

function removeOrdinary(o) {
  slides[o].classList.remove("ordinaryStyle");
}

window.onLoad = function () {
  riderBlock.classList.add("active-item");
  this.slider();
};
