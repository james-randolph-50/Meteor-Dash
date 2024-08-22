"use client";

import BoulderComponent from "@/components/BoulderComponent";
import GameInfoOverlay from "@/components/GameInfoOverlay";
import HandRecognizer from "@/components/HandRecognizer";
import RocketComponent from "@/components/RocketComponent";
import { useEffect, useRef, useState } from "react";

let generationInterval: any;
let removalInterval: any;

let isInvincible = false;

export default function Home() {
  const [rocketLeft, setRocketLeft] = useState(0);
  const [isDetected, setIsDetected] = useState(false);
  const [degrees, setDegrees] = useState(0);
  const [boulders, setBoulders] = useState<any[]>([]);
  const [detectCollisionTrigger, setDetectCollisionTrigger] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isColliding, setIsColliding] = useState(false);

  const rocketRef = useRef(null);
  const [rocket, setRocket] = useState<any>()

  useEffect(() => {
    setRocketLeft(window.innerWidth / 2);
  }, []);

  useEffect(() => {
    if (isDetected) {
      generationInterval = setInterval(() => {
        setBoulders((prevArr) => {
          let retArr = [...prevArr];
          for (let i = 0; i < 4; i++) {
            const now = Date.now();
            retArr = [
              ...retArr,
              {
                timestamp: now,
                key: `${now}-${Math.random()}`,
              },
            ];
          }
          return retArr;
        });
      }, 1000);

      removalInterval = setInterval(() => {
        const now = Date.now();
        setBoulders((prevArr) => {
          return prevArr.filter((b, idx) => {
            return now - b.timestamp < 5000;
          });
        });
      }, 5000);
    }

    return () => {
      clearInterval(generationInterval);
      clearInterval(removalInterval);
    };
  }, [isDetected]);

  const setHandResults = (result: any) => {
    setIsLoading(result.isLoading);
    setIsDetected(result.isDetected);
    setDegrees(result.degrees);

    if (result.degrees && result.degrees !== 0) {
      setDetectCollisionTrigger(Math.random);
      setRocketLeft((prev) => {
        const ret = prev - result.degrees / 6;
        if (ret < 20) {
          return prev;
        }
        if (ret > window.innerWidth - 52) {
          return prev;
        }
        return ret;
      });
    }
    setRocket(((rocketRef.current as any).getBoundingClientRect()))
  };

  const collisionHandler = () => {
    // after collision detected
    if (!isInvincible) {
      console.log("collision occured");
      isInvincible = true;
      setIsColliding(isInvincible)
      setTimeout(() => {
        isInvincible = false;
        setIsColliding(isInvincible)
      }, 1500)
    }

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className={`absolute left-3 top-3 z-30 transition-all duration-500 ${isDetected ? 'w-24' : 'w-48'} `}>
        <HandRecognizer setHandResults={setHandResults} />
      </div>
      <div
      ref={rocketRef}
        id="rocket-container"
        style={{
          position: "absolute",
          left: rocketLeft,
          transition: "all",
          animationDuration: "10ms",
          marginTop: "500px",
        }}
      >
        <RocketComponent degrees={degrees} />
      </div>
      <div className="absolute z-10 h-screen w-screen overflow-hidden">
        {boulders.map((b, idx) => {
          return <BoulderComponent key={b.key} isMoving={isDetected} what={rocket} soWhat={collisionHandler} when={detectCollisionTrigger} />;
        })}
      </div>
      <GameInfoOverlay info={{isLoading, isDetected, isColliding }} />
    </main>
  );
}
