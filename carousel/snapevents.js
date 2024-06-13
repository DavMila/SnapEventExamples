
carousel.addEventListener("scrollsnapchange", (evt) => {
  console.log(`snapchange to ${evt.snapTargetInline.id}`);
  DeEmphasize(hintSnapTarget, /*hint*/true);
  if (currentSnapTarget === evt.snapTargetInline) {
    return;
  }
  DeEmphasize(currentSnapTarget);
  currentSnapTarget = evt.snapTargetInline;
  Emphasize(currentSnapTarget);
});

carousel.addEventListener("scrollsnapchanging", (evt) => {
  DeEmphasize(hintSnapTarget, /*hint*/true);
  if (evt.snapTargetInline === currentSnapTarget) {
    return;
  }
  hintSnapTarget = evt.snapTargetInline;
  Emphasize(hintSnapTarget, /*hint*/true);
});

carousel.addEventListener("scrollend", () => {
  if (hintSnapTarget != currentSnapTarget) {
    DeEmphasize(hintSnapTarget, /*hint*/true);

    hintSnapTarget = null;
    Emphasize(currentSnapTarget);
    return;
  }
});
