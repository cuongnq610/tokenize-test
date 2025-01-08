import { RefObject, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter({
  ref,
  callback,
  ignoreSelectors = [],
}: {
  ref: RefObject<HTMLDivElement>;
  callback: () => void;
  ignoreSelectors?: string[];
}) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        // Skip trigger callback when user click to ignored elements 
        const isClickToIgnoreEl = ignoreSelectors.some((selector) => {
          const ignoreEl = document.querySelector(selector);
          return ignoreEl && ignoreEl.contains(event.target as Node);
        }, []);

        if (!isClickToIgnoreEl) {
            callback();
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
}

export { useOutsideAlerter };
