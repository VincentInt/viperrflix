import "./Slider.css";
import LoadIndicator from "../../../../../UI/LoadIndicator/LoadIndicator";
import { useEffect, useState, useRef, useCallback } from "react";
import { onLoadImg } from "../../../../../utils/onLoadImg/onLoadImg.ts";
import type { TraktResponse } from "../../../../../utils/type/TraktType.ts";

type propsType = {
  data: TraktResponse[];
  stateSlider: number;
  onChangeClickBtnSlider: (index: number) => any;
};

const Slider = ({ data, stateSlider, onChangeClickBtnSlider }: propsType) => {
  const [dataImgLoadingIndex, setDataImgLoadingIndex] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  const [infiniteData, setInfiniteData] = useState<TraktResponse[]>([]);
  const [infiniteIndex, setInfiniteIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [cardWidth, setCardWidth] = useState<number>(160);
  const [gap, setGap] = useState<number>(16);

  const [dragCurrentIndex, setDragCurrentIndex] = useState<number | null>(null);

  const isInternalChange = useRef<boolean>(false);
  const jumpTimeout = useRef<any | null>(null);
  const dragEndPending = useRef<boolean>(false);
  const lastNotifiedIndex = useRef<number>(-1);
  const lastActionTime = useRef<number>(0);
  const actionDelay = 2000;

  const wasDragging = useRef<boolean>(false);
  const isBlocked = useRef<boolean>(false);
  const blockTimeout = useRef<any | null>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartX = useRef<number>(0);
  const dragStartTranslate = useRef<number>(0);
  const currentTranslate = useRef<number>(0);

  const originalLength = data.length;
  const cloneCount = 9;

  const getGap = useCallback(() => {
    if (!itemsRef.current) return 16;
    const style = window.getComputedStyle(itemsRef.current);
    const gapValue = style.gap;
    if (gapValue && gapValue !== "normal") {
      return parseFloat(gapValue);
    }
    return 16;
  }, []);

  const updateCardWidth = useCallback(() => {
    if (!itemsRef.current || !itemsRef.current.children.length) return;
    const slide = itemsRef.current.children[0] as HTMLElement;
    const width = slide.offsetWidth;
    const currentGap = getGap();
    setGap(currentGap);
    setCardWidth(width + currentGap);
    return width + currentGap;
  }, [getGap]);

  const buildInfiniteArray = useCallback(() => {
    if (!data.length) return [];
    const clonesRight = data.slice(0, cloneCount);
    const clonesLeft = data.slice(-cloneCount);
    return [...clonesLeft, ...data, ...clonesRight];
  }, [data, cloneCount]);

  const getOriginalIndexFromTranslate = useCallback(
    (translate: number): number => {
      if (cardWidth === 0) return 0;

      const containerWidth = containerRef.current?.clientWidth || 0;
      const centerOffset = (containerWidth - (cardWidth - gap)) / 2;

      let rawIndex = -(translate - centerOffset) / cardWidth;
      let infiniteIdx = Math.round(rawIndex);

      let originalIdx = infiniteIdx - cloneCount;
      originalIdx =
        ((originalIdx % originalLength) + originalLength) % originalLength;

      return originalIdx;
    },
    [cardWidth, gap, cloneCount, originalLength],
  );

  const updateSliderPosition = useCallback(
    (useAnimation: boolean = true, targetIndex?: number) => {
      if (!itemsRef.current || !containerRef.current || cardWidth === 0) return;

      if (isTransitioning && useAnimation) return;

      const index = targetIndex !== undefined ? targetIndex : infiniteIndex;
      const containerWidth = containerRef.current.clientWidth;
      const centerOffset = (containerWidth - (cardWidth - gap)) / 2;
      const newTranslate = -index * cardWidth + centerOffset;

      if (useAnimation) {
        itemsRef.current.style.transition =
          "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      } else {
        itemsRef.current.style.transition = "none";
      }

      itemsRef.current.style.transform = `translateX(${newTranslate}px)`;
      currentTranslate.current = newTranslate;
      dragStartTranslate.current = newTranslate;
    },
    [infiniteIndex, cardWidth, gap, isTransitioning],
  );

  const performInfiniteJump = useCallback(() => {
    const minIndex = cloneCount;
    const maxIndex = cloneCount + originalLength - 1;

    let newIndex = infiniteIndex;
    let needsJump = false;

    if (infiniteIndex < minIndex) {
      newIndex = infiniteIndex + originalLength;
      needsJump = true;
    } else if (infiniteIndex > maxIndex) {
      newIndex = infiniteIndex - originalLength;
      needsJump = true;
    }

    if (needsJump) {
      setInfiniteIndex(newIndex);
      updateSliderPosition(false, newIndex);
    }
  }, [infiniteIndex, cloneCount, originalLength, updateSliderPosition]);

  useEffect(() => {
    if (!isTransitioning) return;

    if (jumpTimeout.current) clearTimeout(jumpTimeout.current);

    jumpTimeout.current = setTimeout(() => {
      performInfiniteJump();
      setTimeout(() => {
        setIsTransitioning(false);
        setTimeout(() => {
          isInternalChange.current = false;
        }, 100);
      }, 50);
    }, 350);

    return () => {
      if (jumpTimeout.current) clearTimeout(jumpTimeout.current);
    };
  }, [isTransitioning, performInfiniteJump]);

  useEffect(() => {
    if (!data.length || cardWidth === 0) return;
    if (isInternalChange.current || dragEndPending.current || isBlocked.current)
      return;

    const targetInfiniteIndex = cloneCount + stateSlider;
    if (
      targetInfiniteIndex !== infiniteIndex &&
      !isTransitioning &&
      !isDragging
    ) {
      setInfiniteIndex(targetInfiniteIndex);
      updateSliderPosition(false, targetInfiniteIndex);
    }
  }, [
    stateSlider,
    cloneCount,
    data.length,
    infiniteIndex,
    isTransitioning,
    isDragging,
    updateSliderPosition,
    cardWidth,
  ]);

  const getCursorPosition = (
    e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent,
  ): number => {
    if ("touches" in e) return e.touches[0].clientX;
    return e.clientX;
  };

  const blockActions = () => {
    if (blockTimeout.current) {
      clearTimeout(blockTimeout.current);
    }

    isBlocked.current = true;
    lastActionTime.current = Date.now();

    blockTimeout.current = setTimeout(() => {
      isBlocked.current = false;
      blockTimeout.current = null;
    }, actionDelay);
  };

  const onDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isBlocked.current) {
      e.preventDefault();
      return;
    }
    if (isTransitioning || !data.length) return;

    e.preventDefault();
    wasDragging.current = false;
    setIsDragging(true);
    dragEndPending.current = false;
    dragStartX.current = getCursorPosition(e);
    dragStartTranslate.current = currentTranslate.current;
    if (itemsRef.current) itemsRef.current.style.transition = "none";
  };

  const onDragMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const currentX = getCursorPosition(e);
      const diff = Math.abs(currentX - dragStartX.current);
      if (diff > 5) {
        wasDragging.current = true;
      }

      const diffX = currentX - dragStartX.current;
      const newTranslate = dragStartTranslate.current + diffX;

      if (itemsRef.current) {
        itemsRef.current.style.transform = `translateX(${newTranslate}px)`;
        currentTranslate.current = newTranslate;

        const centerIndex = getOriginalIndexFromTranslate(newTranslate);
        setDragCurrentIndex(centerIndex);
      }
    },
    [isDragging, getOriginalIndexFromTranslate],
  );

  const onDragEnd = useCallback(() => {
    if (!isDragging) return;

    const centerIndex =
      dragCurrentIndex !== null
        ? dragCurrentIndex
        : getOriginalIndexFromTranslate(currentTranslate.current);

    const movedBy = currentTranslate.current - dragStartTranslate.current;

    setIsDragging(false);
    dragEndPending.current = true;

    const targetInfiniteIndex = cloneCount + centerIndex;

    if (Math.abs(movedBy) < 20 && targetInfiniteIndex === infiniteIndex) {
      if (itemsRef.current) {
        itemsRef.current.style.transition =
          "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        itemsRef.current.style.transform = `translateX(${dragStartTranslate.current}px)`;
        currentTranslate.current = dragStartTranslate.current;
      }

      setTimeout(() => {
        dragEndPending.current = false;
      }, 350);
    } else {
      isInternalChange.current = true;
      setIsTransitioning(true);

      setInfiniteIndex(targetInfiniteIndex);

      if (itemsRef.current && containerRef.current && cardWidth > 0) {
        const containerWidth = containerRef.current.clientWidth;
        const centerOffset = (containerWidth - (cardWidth - gap)) / 2;
        const newTranslate = -targetInfiniteIndex * cardWidth + centerOffset;

        itemsRef.current.style.transition =
          "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        itemsRef.current.style.transform = `translateX(${newTranslate}px)`;
        currentTranslate.current = newTranslate;
        dragStartTranslate.current = newTranslate;
      }

      setTimeout(() => {
        setIsTransitioning(false);
        let finalOriginalIndex = centerIndex;
        finalOriginalIndex =
          ((finalOriginalIndex % originalLength) + originalLength) %
          originalLength;

        if (finalOriginalIndex !== lastNotifiedIndex.current) {
          lastNotifiedIndex.current = finalOriginalIndex;
          onChangeClickBtnSlider(finalOriginalIndex);
        }

        blockActions();

        setTimeout(() => {
          isInternalChange.current = false;
          dragEndPending.current = false;
        }, 100);
      }, 350);
    }

    setDragCurrentIndex(null);

    setTimeout(() => {
      wasDragging.current = false;
    }, 100);
  }, [
    isDragging,
    dragCurrentIndex,
    getOriginalIndexFromTranslate,
    cloneCount,
    infiniteIndex,
    cardWidth,
    gap,
    originalLength,
    onChangeClickBtnSlider,
  ]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onDragMove);
      window.addEventListener("mouseup", onDragEnd);
      window.addEventListener("touchmove", onDragMove, { passive: false });
      window.addEventListener("touchend", onDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", onDragMove);
      window.removeEventListener("mouseup", onDragEnd);
      window.removeEventListener("touchmove", onDragMove);
      window.removeEventListener("touchend", onDragEnd);
    };
  }, [isDragging, onDragMove, onDragEnd]);

  useEffect(() => {
    let resizeTimeout: any;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCardWidth();
        updateSliderPosition(false);
      }, 100);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [updateCardWidth, updateSliderPosition]);

  useEffect(() => {
    if (data.length) {
      const infinite = buildInfiniteArray();
      setInfiniteData(infinite);
      setInfiniteIndex(cloneCount + stateSlider);
      isInternalChange.current = true;
      lastNotifiedIndex.current = stateSlider;

      setTimeout(() => {
        isInternalChange.current = false;
      }, 200);
    }
  }, [data, buildInfiniteArray, cloneCount, stateSlider]);

  useEffect(() => {
    if (infiniteData.length && itemsRef.current && containerRef.current) {
      setTimeout(() => {
        updateCardWidth();
        updateSliderPosition(false);
      }, 50);
    }
  }, [infiniteData, updateCardWidth, updateSliderPosition]);

  useEffect(() => {
    data.forEach((item, index) => {
      onLoadImg(
        () => setDataImgLoadingIndex((prev) => [...prev, index]),
        `/viperrflix/img/movies/${item?.images?.poster}`,
      );
    });
  }, [data]);

  useEffect(() => {
    setIsMobile(
      /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        navigator.userAgent,
      ),
    );

    return () => {
      if (blockTimeout.current) {
        clearTimeout(blockTimeout.current);
      }
    };
  }, []);

  const onClickCardSlider = (
    originalIndexCard: number,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();

    if (isBlocked.current) {
      return;
    }

    if (wasDragging.current) {
      return;
    }

    if (isTransitioning || isDragging || !data.length) return;

    if (originalIndexCard === lastNotifiedIndex.current) return;

    const targetInfiniteIndex = cloneCount + originalIndexCard;

    isInternalChange.current = true;
    setIsTransitioning(true);
    setInfiniteIndex(targetInfiniteIndex);
    updateSliderPosition(true, targetInfiniteIndex);

    lastNotifiedIndex.current = originalIndexCard;
    onChangeClickBtnSlider(originalIndexCard);

    blockActions();

    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => {
        isInternalChange.current = false;
      }, 100);
    }, 350);
  };

  const displayOriginalIndex =
    isDragging && dragCurrentIndex !== null
      ? dragCurrentIndex
      : (() => {
          let originalIndex = infiniteIndex - cloneCount;
          originalIndex =
            ((originalIndex % originalLength) + originalLength) %
            originalLength;
          return originalIndex;
        })();

  return (
    <div
      style={
        isMobile && window.visualViewport?.height
          ? {
              marginBottom: `${(window.screen.height - window.visualViewport?.height) * 0.4}px`,
              paddingBottom: `0px`,
            }
          : {}
      }
      className="container_banner_nav"
    >
      <div className="container_window" ref={containerRef}>
        <div
          className="container_state_img_page"
          ref={itemsRef}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {infiniteData.map((item: TraktResponse, idx: number) => {
            const originalIndexOfThis =
              (idx - cloneCount + originalLength) % originalLength;
            const isActive = originalIndexOfThis === displayOriginalIndex;
            const isImageLoaded =
              dataImgLoadingIndex.includes(originalIndexOfThis);

            return (
              <div
                key={`slide-${idx}`}
                onClick={(e) => onClickCardSlider(originalIndexOfThis, e)}
                className={`container_img ${isActive ? "active" : ""}`}
                style={{
                  cursor: "pointer",
                }}
              >
                {isImageLoaded ? (
                  <img
                    className={isActive ? "chosen" : "not_chosen"}
                    src={`/viperrflix/img/movies/${item?.images?.poster}`}
                    alt="state_img"
                  />
                ) : (
                  <LoadIndicator />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
