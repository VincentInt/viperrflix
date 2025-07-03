import "./RandomLights.css";
import { useEffect, useState } from "react";

type CoordXYType = {
  x: number;
  y: number;
};
type SizeType = {
  width: number;
  height: number;
};
type PointDataType = {
  time: number;
  finishPoint: CoordXYType;
  opacity: number;
  size: SizeType;
};

function randomPosition(): CoordXYType {
  return {
    x:
      Math.random() *
      (Math.random() >= 0.5
        ? window.innerWidth + window.innerWidth * 1.5
        : window.innerWidth - window.innerWidth * 1.5),
    y:
      Math.random() *
      (Math.random() >= 0.5
        ? document.body.clientHeight + document.body.clientHeight * 1.5
        : document.body.clientHeight - document.body.clientHeight * 1.5),
  };
}

function randomSizePoint(): SizeType {
  const size = Math.random() * 2.8 + 0.8;
  return {
    width: size,
    height: size,
  };
}
function randomPointLightFunc(): PointDataType {
  const randomLightTime = Math.random() * 25000 + 15000;
  const randomLightEndPoint = randomPosition();
  const randomSizeLightPoint = randomSizePoint();
  const randomOpacity = Math.random() * 50 + 50;

  return {
    time: randomLightTime,
    finishPoint: randomLightEndPoint,
    opacity: randomOpacity,
    size: randomSizeLightPoint,
  };
}

const RandomLights = () => {
  const [pointsData, setPointsData] = useState<PointDataType[]>([]);

  useEffect(() => {
    const arrayPointsData: PointDataType[] = [];
    const countPoint = Math.random() * 150 + 500;

    for (let i = 0; i < countPoint; i++) {
      const randomPoint = randomPointLightFunc();
      arrayPointsData[i] = randomPoint;
      setTimeout(() => randomTimeMoveFunc(i), 10);
    }
    setPointsData(arrayPointsData);
  }, []);

  function randomTimeMoveFunc(index: number) {
    const { time, finishPoint } = randomPointLightFunc();

    setPointsData((prev: PointDataType[]) => {
      const clone = [...prev];
      clone[index] = {
        ...clone[index],
        time: time,
        finishPoint: finishPoint,
      };
      return clone;
    });

    setTimeout(() => randomTimeMoveFunc(index), time);
    setTimeout(() => {
      setPointsData((prev: PointDataType[]) => {
        const clone = [...prev];
        clone[index] = { ...clone[index], opacity: Math.random() * 50 + 50 };
        return clone;
      });
    }, time + Math.random() * 5000 + 4000);
  }

  return (
    <div className="container_random_lights">
      {pointsData.map((item: PointDataType, index) => {
        try {
          const style = {
            width: `${item.size.width}px`,
            height: `${item.size.height}px`,
            opacity: `${item.opacity}%`,
            transform: `translate(${item.finishPoint.x}px, ${item.finishPoint.y}px)`,
            transition: `all ${item.time}ms  linear, opacity 3s ease`,
          };
          return <div key={index} className="item_light" style={style} />;
        } catch (error) {
          return <div key={index}></div>;
        }
      })}
    </div>
  );
};

export default RandomLights;
