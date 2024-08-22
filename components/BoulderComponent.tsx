import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {};

const BoulderComponent = (props: Props) => {
  const [xState, setXState] = useState(0);
  const [yState, setYState] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setXState(Math.random() * (window.innerWidth - 80));
    setYState(- Math.random() * 100 - 100);
    setRotation(Math.random() * 360);
  }, []);

  return (
    <div className="boulder-shadow"
      style={{ left: xState, top: yState, position: "absolute", animation: 'moveDown 10s linear forwards' }}
    >
      <Image  src={"/meteor.png"} width={80} height={80} style={{rotate: `${rotation}deg`}} alt={"meteor"} />
    </div>
  );
};

export default BoulderComponent;
