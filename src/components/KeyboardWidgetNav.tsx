"use client";

import { useEffect, useState } from "react";

export default function KeyboardWidgetNav() {
  const [activeHint, setActiveHint] = useState<{
    text: string;
    x: number;
    y: number;
    visible: boolean;
  }>({
    text: "",
    x: 0,
    y: 0,
    visible: false,
  });

  useEffect(() => {
    let hintTimeout: NodeJS.Timeout;

    const showHint = (text: string, element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      setActiveHint({
        text,
        x: Math.max(16, Math.min(window.innerWidth - 220, rect.left + rect.width / 2 - 100)),
        y: Math.max(10, rect.top - 36),
        visible: true,
      });

      clearTimeout(hintTimeout);
      hintTimeout = setTimeout(() => {
        setActiveHint((prev) => ({ ...prev, visible: false }));
      }, 2500);
    };

    // Helper: Collect all interactive simulator controls (sliders and active/first buttons in button groups)
    const getNavigableControls = (): HTMLElement[] => {
      const controls: HTMLElement[] = [];
      const seen = new Set<HTMLElement>();

      // 1. All range sliders
      document.querySelectorAll<HTMLInputElement>('input[type="range"]:not([disabled])').forEach((input) => {
        if (!seen.has(input)) {
          seen.add(input);
          controls.push(input);
        }
      });

      // 2. All option button groups (pick active button or first button)
      document
        .querySelectorAll<HTMLElement>('[role="radiogroup"], [data-widget="button-group"]')
        .forEach((group) => {
          const activeBtn =
            group.querySelector<HTMLButtonElement>('button[aria-checked="true"]') ||
            group.querySelector<HTMLButtonElement>("button:not([disabled])");
          if (activeBtn && !seen.has(activeBtn)) {
            seen.add(activeBtn);
            controls.push(activeBtn);
          }
        });

      // Sort by vertical position on the page
      return controls.sort((a, b) => {
        const topA = a.getBoundingClientRect().top + window.scrollY;
        const topB = b.getBoundingClientRect().top + window.scrollY;
        return topA - topB;
      });
    };

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.tagName === "INPUT" && (target as HTMLInputElement).type === "range") {
        const allRanges = document.querySelectorAll('input[type="range"]');
        if (allRanges.length > 1) {
          showHint("← → で数値変更 / ↑ ↓ でゲージ切替", target);
        } else {
          showHint("← → で数値変更", target);
        }
      } else if (target.tagName === "BUTTON") {
        const parent = target.parentElement;
        if (parent) {
          const siblingButtons = Array.from(parent.querySelectorAll("button:not([disabled])"));
          if (siblingButtons.length >= 2) {
            showHint("← → で選択切替 / ↑ ↓ で項目移動", target);
          }
        }
      }
    };

    const handleFocusOut = () => {
      clearTimeout(hintTimeout);
      setActiveHint((prev) => ({ ...prev, visible: false }));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;

      // Skip normal text inputs and textareas
      if (
        active.tagName === "TEXTAREA" ||
        (active.tagName === "INPUT" && (active as HTMLInputElement).type === "text")
      ) {
        return;
      }

      const isRange =
        active.tagName === "INPUT" && (active as HTMLInputElement).type === "range";
      const isButton = active.tagName === "BUTTON";

      // --- Vertical Navigation (↑ / ↓): Move between gauges/widgets ---
      if ((isRange || isButton) && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        const controls = getNavigableControls();
        // If active is a button in a group, check if its group container is represented
        let currentCtrl = controls.find(
          (c) => c === active || (c.parentElement && c.parentElement === active.parentElement)
        );

        if (!currentCtrl && isRange) {
          currentCtrl = active;
        }

        if (controls.length > 1 && currentCtrl) {
          const currentIndex = controls.indexOf(currentCtrl);
          if (currentIndex !== -1) {
            let nextIndex = -1;
            if (e.key === "ArrowDown" && currentIndex < controls.length - 1) {
              nextIndex = currentIndex + 1;
            } else if (e.key === "ArrowUp" && currentIndex > 0) {
              nextIndex = currentIndex - 1;
            }

            if (nextIndex !== -1) {
              e.preventDefault();
              const targetCtrl = controls[nextIndex];
              targetCtrl.focus();
              targetCtrl.scrollIntoView({ block: "nearest", behavior: "smooth" });

              if (targetCtrl.tagName === "INPUT") {
                showHint("ゲージ切替 (← → で調整)", targetCtrl);
              } else {
                showHint("選択肢切替 (← → で選択)", targetCtrl);
              }
              return;
            }
          }
        }
      }

      // --- Case 1: Button Group / Option Toggle (← / →) ---
      if (isButton && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        const button = active as HTMLButtonElement;
        
        let container = button.closest(
          '[role="radiogroup"], [role="group"], [data-widget="button-group"], .grid, .flex'
        ) as HTMLElement | null;

        if (!container) {
          container = button.parentElement;
        }

        if (container) {
          const buttons = Array.from(
            container.querySelectorAll<HTMLButtonElement>("button:not([disabled])")
          ).filter((btn) => {
            const btnContainer =
              btn.closest(
                '[role="radiogroup"], [role="group"], [data-widget="button-group"], .grid, .flex'
              ) || btn.parentElement;
            return btnContainer === container || btn.parentElement === button.parentElement;
          });

          if (buttons.length >= 2) {
            const currentIndex = buttons.indexOf(button);
            if (currentIndex !== -1) {
              e.preventDefault();

              let targetIndex: number;
              if (e.key === "ArrowRight") {
                targetIndex = Math.min(buttons.length - 1, currentIndex + 1);
              } else {
                targetIndex = Math.max(0, currentIndex - 1);
              }

              if (targetIndex !== currentIndex) {
                const targetBtn = buttons[targetIndex];
                targetBtn.focus();
                targetBtn.click();
                showHint("← → で選択切替 / ↑ ↓ で項目移動", targetBtn);
              }
              return;
            }
          }
        }
      }

      // --- Case 2: Range Slider (← / → / Home / End / PageUp / PageDown) ---
      if (isRange) {
        const input = active as HTMLInputElement;
        const min = Number(input.min) || 0;
        const max = Number(input.max) || 100;
        const step = Number(input.step) || 1;
        const currentVal = Number(input.value);

        let newVal = currentVal;
        const isShift = e.shiftKey;
        const multiplier = isShift ? 5 : 1;

        if (e.key === "ArrowRight") {
          newVal = Math.min(max, currentVal + step * multiplier);
        } else if (e.key === "ArrowLeft") {
          newVal = Math.max(min, currentVal - step * multiplier);
        } else if (e.key === "Home") {
          newVal = min;
        } else if (e.key === "End") {
          newVal = max;
        } else if (e.key === "PageUp") {
          newVal = Math.min(max, currentVal + step * 5);
        } else if (e.key === "PageDown") {
          newVal = Math.max(min, currentVal - step * 5);
        }

        if (newVal !== currentVal) {
          e.preventDefault();

          // Dispatch through native setter for React 19 compatibility
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
          )?.set;

          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(input, newVal.toString());
          } else {
            input.value = newVal.toString();
          }

          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));

          showHint(`${newVal.toLocaleString()} (← → で微調整)`, input);
        }
      }
    };

    // --- Case 3: Clicking anywhere in a slider section focuses that specific slider ---
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // If clicked element is already an interactive control, let native handling work
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("a")
      ) {
        return;
      }

      // Ascend upwards to find the closest wrapper containing exactly ONE range slider
      let el: HTMLElement | null = target;
      while (el && el !== document.body) {
        const ranges = el.querySelectorAll<HTMLInputElement>('input[type="range"]');
        if (ranges.length === 1) {
          // Found the single slider for this section!
          if (ranges[0] !== document.activeElement) {
            ranges[0].focus();
          }
          break;
        } else if (ranges.length > 1) {
          // Reached an outer wrapper that contains multiple sliders; stop searching upwards
          break;
        }
        el = el.parentElement;
      }
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClick);

    return () => {
      clearTimeout(hintTimeout);
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  if (!activeHint.visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: `${activeHint.y}px`,
        left: `${activeHint.x}px`,
        zIndex: 9999,
      }}
      className="pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95"
    >
      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/95 text-white text-[11px] font-bold shadow-xl backdrop-blur-xs border border-white/20">
        <span className="text-teal-400">⌨️</span>
        <span>{activeHint.text}</span>
      </div>
    </div>
  );
}
