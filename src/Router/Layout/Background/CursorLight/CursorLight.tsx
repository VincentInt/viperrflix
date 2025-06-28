import "./CursorLight.css";
import { useEffect, useRef, useState } from "react";

type CursorType = {
  x: number;
  y: number;
  statusLeave: boolean;
};
const CursorLight = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorType>({
    x: 0,
    y: 0,
    statusLeave: true,
  });
  const [skipAnimation, setSkipAnimation] = useState<boolean>(true);
  const cursorLight = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: number;
    const cursorMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.x,
        y: e.y + window.scrollY,
        statusLeave: e.type === "mousemove" ? false : true,
      });
      timer = setTimeout(() => {
        setSkipAnimation(e.type === "mousemove" ? false : true);
      }, 1000);
    };
    const cursorWindowBlur = () => {
      setCursorPosition((prev) => ({
        ...prev,
        statusLeave: true,
      }));
      timer = setTimeout(() => {
        setSkipAnimation(true);
      }, 1000);
    };

    document.addEventListener("mousemove", (e) => {
      document.addEventListener("scroll", () => cursorMove(e));
      clearTimeout(timer);
      cursorMove(e);
    });
    document.addEventListener("mouseleave", (e) => {
      clearTimeout(timer);
      cursorMove(e);
    });
    document.addEventListener("blur", () => {
      clearTimeout(timer);
      cursorWindowBlur();
    });
  }, []);

  useEffect(() => {
    let animateId: number;
    let timer: number;

    const cursorLightMove = () => {
      const cursor = cursorLight.current;
      if (cursor) {
        if (!skipAnimation) {
          requestAnimationFrame(() => {
            cursor.style.transition = `transform 1s ease-out, opacity 1s ease-out`;
          });
        } else if (cursorPosition.statusLeave === false) {
          requestAnimationFrame(() => {
            cursor.style.transition = `opacity 1s ease-out`;
          });
        } else {
          requestAnimationFrame(() => {
            cursor.style.transition = ``;
          });
        }
        cursor.style.transform = `translate(${
          cursorPosition.x - cursor.clientWidth / 2
        }px, ${cursorPosition.y - cursor.clientHeight / 2}px)`;

        if (cursorPosition.statusLeave) {
          cursor.style.opacity = "0";
        } else {
          cursor.style.opacity = "1";
        }

        setSkipAnimation(false);

        timer = setTimeout(() => {
          cursor.style.transition = `all 5s ease-out`;
          cursor.style.opacity = "0";
          setTimeout(() => {
            cursor.style.transition = `all 1s ease-out`;
          }, 5000);
        }, 3000);
      }
    };
    animateId = requestAnimationFrame(cursorLightMove);
    return () => {
      cancelAnimationFrame(animateId);
      clearTimeout(timer);
    };
  }, [cursorPosition]);

  return <div ref={cursorLight} className="cursor_light_source"></div>;
};

export default CursorLight;
