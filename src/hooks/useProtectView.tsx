import { RefObject, useEffect } from "react";

/**
 *
 * @param ref - A RefObject to HTML element that need to be fully visible
 *
 * @param triggerEvent - The protected logic will be triggered when this event is emitted
 */
export const useProtectView = (ref: RefObject<HTMLDivElement>) => {
  useEffect(() => {
    let prevEl: HTMLElement | null = null;

    const clickHandler = (e: MouseEvent) => {
      const el = ref.current;

      const isDisplayed = prevEl && el;

      prevEl = el;
      
      // Skip handle when the element is already display
      if (isDisplayed) return;

      if (el) {
        // Skip when clicking to itself
        if (el.contains(e.target as Node)) {
          return;
        }

        const { clientX, clientY } = e;

        el.style.top = clientY + "px";
        el.style.left = clientX + "px";

        const { offsetLeft, offsetTop, clientWidth, clientHeight } = el;
        const { clientWidth: bodyWidth, clientHeight: bodyHeight } =
          document.body;

        const isExceedRight = clientWidth + offsetLeft - bodyWidth > 0;
        const isExceedBottom = clientHeight + offsetTop - bodyHeight > 0;

        if (isExceedRight) {
          el.style.left = bodyWidth - clientWidth + "px";
        }

        if (isExceedBottom) {
          el.style.bottom = "0";
        }
      }
    };

    document.addEventListener("click", clickHandler);
    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [ref]);
};
