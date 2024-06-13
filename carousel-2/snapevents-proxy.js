// Get the offset, relative to the viewport, at which |area|'s left edge needs
// to be in order to be snap-aligned to |container|.
function GetAlignedOffset(container, area) {
  const areaStyle = getComputedStyle(area);
  const alignment = areaStyle.scrollSnapAlign;
  const scrollMargin = parseInt(areaStyle.scrollMargin);
  const containerOffsetLeft = container.offsetLeft;

  let alignedOffset;
  if (alignment === "start") {
    alignedOffset = containerOffsetLeft;
  } else if (alignment === "center") {
    alignedOffset = containerOffsetLeft + container.clientWidth / 2 - area.clientWidth / 2;
  } else { // "end" alignment
    alignedOffset = containerOffsetLeft + container.clientWidth - area.clientWidth;
  }

  return alignedOffset + scrollMargin;
}

// Get the distance of |area|'s left edge, relative to the viewport from its
// snap-aligned position.
function GetSnapDistance(container, area) {
  const alignedOffset = GetAlignedOffset(container, area);

  return Math.abs(parseInt(area.getBoundingClientRect().x) - alignedOffset);
}

// Update the UI to highlight the item that is snapped-to if it has changed.
function UpdateCurrentSnapTarget() {
  const snapAreas = carousel.querySelectorAll(".slide_thumbnail");
  let newSnapTarget = currentSnapTarget;
  let min_distance = Infinity;

  for (const snapArea of snapAreas) {
    const distance = GetSnapDistance(carousel, snapArea);
    if (distance < min_distance) {
      newSnapTarget = snapArea;
      min_distance = distance;
    }
  }

  DeEmphasize(hintSnapTarget, /*hint*/true);
  if (newSnapTarget !== currentSnapTarget) {
    DeEmphasize(currentSnapTarget);
  }

  currentSnapTarget = newSnapTarget;
  Emphasize(currentSnapTarget);
}

// Update the UI to highlight, as a hint, the item that the current scrolling
// is intending to snap to, unless the item is the last snapped-to thing.
function UpdateHintSnapTarget() {
  const snapAreas = carousel.querySelectorAll(".slide_thumbnail");
  let newHintTarget = hintSnapTarget;
  let min_distance = Infinity;

  for (const snapArea of snapAreas) {
    const distance = GetSnapDistance(carousel, snapArea);
    if (distance < min_distance) {
      newHintTarget = snapArea;
      min_distance = distance;
    }
  }

  if (newHintTarget === hintSnapTarget) {
    return;
  }
  
  DeEmphasize(hintSnapTarget, /*hint*/true);

  // Don't override the current snap target's style with hint styling.
  if (newHintTarget === currentSnapTarget) {
    return;
  }

  hintSnapTarget = newHintTarget;
  Emphasize(hintSnapTarget, /*hint*/true);
}

carousel.addEventListener("scrollend", () => {
  UpdateCurrentSnapTarget();
});

carousel.addEventListener("scroll", () => {
  UpdateHintSnapTarget();
});
