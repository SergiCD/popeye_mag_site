// Keep the arrangement while navigating, without storing anything remotely.
const positions = new Map();

export function mountDesk(desk) {
  if (!desk) return () => {};
  const cards = [...desk.querySelectorAll(".polaroid")];
  const abort = new AbortController();
  const options = { signal: abort.signal };
  let drag = null;
  let layer = 4;

  function place(card, x, y) {
    const maxX = Math.max(0, desk.clientWidth - card.offsetWidth);
    const maxY = Math.max(0, desk.clientHeight - card.offsetHeight);
    x = Math.max(0, Math.min(maxX, x));
    y = Math.max(0, Math.min(maxY, y));
    card.style.left = `${x}px`;
    card.style.top = `${y}px`;
    card.style.right = "auto";
    card.style.bottom = "auto";
    positions.set(card.dataset.position, {
      x: maxX ? x / maxX : 0,
      y: maxY ? y / maxY : 0,
    });
  }

  function restore() {
    for (const card of cards) {
      const saved = positions.get(card.dataset.position);
      if (saved)
        place(
          card,
          saved.x * Math.max(0, desk.clientWidth - card.offsetWidth),
          saved.y * Math.max(0, desk.clientHeight - card.offsetHeight),
        );
    }
  }

  function finish(cancelled = false) {
    if (!drag) return;
    const { card, pointerId, moved, x, y, saved } = drag;
    drag = null;
    if (cancelled && moved) {
      if (saved) place(card, x, y);
      else {
        for (const property of ["left", "top", "right", "bottom"])
          card.style.removeProperty(property);
        positions.delete(card.dataset.position);
      }
    }
    card.classList.remove("is-dragging");
    if (card.hasPointerCapture(pointerId))
      card.releasePointerCapture(pointerId);
  }

  cards.forEach((card) => {
    let suppressClick = false;
    card.addEventListener(
      "dragstart",
      (event) => event.preventDefault(),
      options,
    );
    card.addEventListener(
      "pointerdown",
      (event) => {
        if (event.button !== 0 || !event.isPrimary || drag) return;
        suppressClick = false;
        drag = {
          card,
          pointerId: event.pointerId,
          startX: event.clientX,
          startY: event.clientY,
          x: card.offsetLeft,
          y: card.offsetTop,
          moved: false,
          saved: positions.has(card.dataset.position),
        };
        card.setPointerCapture(event.pointerId);
      },
      options,
    );
    card.addEventListener(
      "pointermove",
      (event) => {
        if (!drag || drag.card !== card || drag.pointerId !== event.pointerId)
          return;
        const dx = event.clientX - drag.startX;
        const dy = event.clientY - drag.startY;
        if (!drag.moved && Math.hypot(dx, dy) < 6) return;
        event.preventDefault();
        if (!drag.moved) {
          drag.moved = true;
          suppressClick = true;
          card.classList.add("is-dragging");
          card.style.zIndex = String(++layer);
        }
        place(card, drag.x + dx, drag.y + dy);
      },
      options,
    );
    card.addEventListener("pointerup", () => finish(), options);
    card.addEventListener("pointercancel", () => finish(true), options);
    card.addEventListener("lostpointercapture", () => finish(), options);
    card.addEventListener(
      "click",
      (event) => {
        if (suppressClick && event.detail !== 0) {
          event.preventDefault();
          event.stopPropagation();
          suppressClick = false;
        }
      },
      options,
    );
    card.addEventListener(
      "keydown",
      (event) => {
        const directions = {
          ArrowLeft: [-1, 0],
          ArrowRight: [1, 0],
          ArrowUp: [0, -1],
          ArrowDown: [0, 1],
        };
        if (!directions[event.key]) return;
        event.preventDefault();
        const [dx, dy] = directions[event.key];
        const step = event.shiftKey ? 40 : 12;
        card.style.zIndex = String(++layer);
        place(card, card.offsetLeft + dx * step, card.offsetTop + dy * step);
      },
      options,
    );
  });
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && drag) finish(true);
    },
    options,
  );
  desk.querySelector(".reset-desk").addEventListener(
    "click",
    () => {
      finish();
      positions.clear();
      cards.forEach((card) => card.removeAttribute("style"));
    },
    options,
  );
  const observer = new ResizeObserver(() => {
    finish();
    restore();
  });
  observer.observe(desk);
  restore();
  return () => {
    finish();
    abort.abort();
    observer.disconnect();
  };
}
