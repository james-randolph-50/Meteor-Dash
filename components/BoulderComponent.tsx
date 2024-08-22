import React, { useEffect, useState } from "react";
import Image from "next/image";

type Props = {};

const BoulderComponent = (props: Props) => {
  const [xState, setXState] = useState(0);
  const [yState, setYState] = useState(0);

  useEffect(() => {
    setXState(Math.random() * window.innerWidth);
    setYState(Math.random() * 100);
  }, []);

  return (
    <div
      className="bg-red-600 h-24 w-24 border-2 border-black"
      style={{ left: xState, top: yState, position: "absolute" }}
    >
      <Image src={"/meteor.png"} width={80} height={80} alt={"meteor"} />
    </div>
  );
};

export default BoulderComponent;
