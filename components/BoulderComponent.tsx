import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
    isMoving ?: boolean,
    what: any,
    soWhat: () => void,
    when: any
};

const BoulderComponent = ({isMoving, what, soWhat, when}: Props) => {
  const [xState, setXState] = useState(0);
  const [yState, setYState] = useState(0);
  const [rotation, setRotation] = useState(0);
  const boulderRef = useRef(null);

  useEffect(() => {
    // detection logic
    detectCollision();
  }, [when])

  const detectCollision = () => {
    if(boulderRef.current) {
        const boulder = (boulderRef.current as any).getBoundingClientRect();
        const didCollide = boulder.left < what.right && boulder.right > what.left && boulder.bottom > what.top && boulder.top < what.bottom;
        if (didCollide) {
            soWhat();
        }
    }
  }
  

  useEffect(() => {
    setXState(Math.random() * (window.innerWidth - 80));
    setYState(- Math.random() * 100 - 100);
    setRotation(Math.random() * 360);
  }, []);

  return (
    <div ref={boulderRef} className="boulder-shadow"
      style={{ 
        left: xState,
        top: yState,
        position: "absolute",
        animation: 'moveDown 10s linear forwards',
        animationPlayState: isMoving ? 'running' : 'paused'
    }}
    >
      <Image  src={"/meteor.png"} width={80} height={80} style={{rotate: `${rotation}deg`}} alt={"meteor"} />
    </div>
  );
};

export default BoulderComponent;
