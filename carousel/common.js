let bigscreen = document.getElementById("bigscreen");
let carousel = document.getElementById("carousel");
let bigScreenImageText = document.getElementById("bigScreenImageText");

let deleteButtonToSlideMapping = new Map;
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
    bigscreen.style.borderColor = borderColor;
    bigScreenImageText.innerHTML = `<h3>${slideToProvinceNameMap[element.id]}</h3>`;
  }
}

function ConfigureSlideToDeleteButtonMapping() {
  carousel = document.getElementById("carousel");
  bigscreen = document.getElementById("bigscreen");

  const slides = carousel.querySelectorAll(".slide_thumbnail");
  const buttons = carousel.querySelectorAll(".delete_button");
  
  for (let idx = 0; idx < buttons.length; idx++) {
    const deleteButton = buttons[idx];
    const slide = slides[idx];

    deleteButtonToSlideMapping[deleteButton.id] = slides[idx];
    slideToProvinceNameMap[slide.id] = provinceNames[idx];
    
    deleteButton.addEventListener("click", () => {
      deleteButtonToSlideMapping[deleteButton.id].remove();
      if (window.onscrollsnapchange === undefined) {
        UpdateCurrentSnapTarget();
      }
    });

    const slide_image = slide.querySelector("img");
    slide_image.src = `images/${imageSrcs[idx]}`;
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
