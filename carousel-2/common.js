let bigscreen = document.getElementById("bigscreen");
let carousel = document.getElementById("carousel");
let carouselctrl = document.getElementById("carouselctrl");
let bigScreenImageText = document.getElementById("bigScreenImageText");

let slideToCtrlMapping = new Map;
let ctrlToSlideMapping = new Map;
let slideToProvinceNameMap = new Map;

let currentSnapTarget = null;
let hintSnapTarget = null;

const imageSrcs = [
  "Alberta.svg",
  "BritishColumbia.svg",
  "Manitoba.svg",
  "NewBrunswick.svg",
  "Newfoundland.svg",
  "NorthwestTerritories.svg",
  "NovaScotia.svg",
  "Nunavut.svg",
  "Ontario.svg",
  "PrinceEdwardIsland.svg",
  "Quebec.svg",
  "Saskatchewan.svg",
  "Yukon.svg",
];

const provinceNames = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "NewBrunswick",
  "Newfoundland",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

function DeEmphasize(element, hint=false) {
  if (element) {
    let classToRemove = "highlighted";
    if (hint) {
      classToRemove = "highlightedhint";
    }
    element.classList.remove(classToRemove);
    const ctrl = slideToCtrlMapping[element.id];
    ctrl.classList.remove(classToRemove);
  }
}

function Emphasize(element, hint=false) {
  if (element) {
    let classToAdd = "highlighted";
    let borderColor = "black";
    if (hint) {
      classToAdd = "highlightedhint";
      borderColor = "yellow";
    }
    element.classList.add(classToAdd);
    const ctrl = slideToCtrlMapping[element.id];
    ctrl.classList.add(classToAdd);
  }
}

function ConfigureSlideToDeleteButtonMapping() {
  carousel = document.getElementById("carousel");
  carouselctrl = document.getElementById("carouselctrl");

  const carousel_slides = carousel.querySelectorAll(".slide_thumbnail");
  const carouselctrl_slides = carouselctrl.querySelectorAll(".slide_thumbnail");
  
  for (let idx = 0; idx < carousel_slides.length; idx++) {
    const carousel_slide = carousel_slides[idx];
    const carouselctrl_slide = carouselctrl_slides[idx];

    const slide_text = carousel_slide.querySelector(".slide_text");
    slide_text.innerHTML = `<h3>${provinceNames[idx]}<h3>`;
    carousel_slide.addEventListener("click", () => {
      if (carousel_slide.style.transform.length === 0) {
        carousel_slide.style.transform = "rotateY(180deg)";
      } else {
        carousel_slide.style.transform = "";
      }
    });

    slideToCtrlMapping[carousel_slide.id] = carouselctrl_slide;
    ctrlToSlideMapping[carouselctrl_slide.id] = carousel_slide;
    slideToProvinceNameMap[carousel_slide.id] = provinceNames[idx];
    
    carouselctrl_slide.addEventListener("click", () => {
      ctrlToSlideMapping[carouselctrl_slide.id].scrollIntoView({ behavior: "smooth" });
    });

    const slide_image = carousel_slide.querySelector("img");
    slide_image.src = `images/${imageSrcs[idx]}`;
    const ctrlslide_image = carouselctrl_slide.querySelector("img");
    ctrlslide_image.src = `images/${imageSrcs[idx]}`;
  }

  if (window.onscrollsnapchange === undefined) {
    UpdateCurrentSnapTarget();
  }
}
  
window.addEventListener("DOMContentLoaded", () => {
  ConfigureSlideToDeleteButtonMapping();

  const notice = document.getElementById("supportnotice");
  if (window.onscrollsnapchange === undefined) {
    notice.innerText = "User-agent does not support snap events.";
    UpdateCurrentSnapTarget();
  } else {
    notice.innerText = "User-agent supports snap events.";
  }
});

carousel.addEventListener("scroll", () => {
  const carousel_slides = carousel.querySelectorAll(".slide_thumbnail");
  for (const slide of carousel_slides) {
    if (slide.style.transform.length !== 0) {
      slide.style.transform = "";
    }
  }
});


