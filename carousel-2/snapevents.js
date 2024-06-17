carousel.addEventListener("scrollsnapchange", (evt) => {
  DeEmphasize(hintSnapTarget, /*hint*/true);
  DeEmphasize(currentSnapTarget);
  currentSnapTarget = evt.snapTargetInline;
  Emphasize(currentSnapTarget);
});

carousel.addEventListener("scrollsnapchanging", (evt) => {
  DeEmphasize(hintSnapTarget, /*hint*/true);
  hintSnapTarget = evt.snapTargetInline;
  // Ensure to undo any effects snapchanging away from the
  // currentSnapTarget may have done.
  Emphasize(hintSnapTarget, /*hint*/evt.snapTargetInline !== currentSnapTarget);
});

function UpdateCurrentSnapTarget() {
  // Not needed when using snap events, only here to avoid
  // error in common.js
}