"use client";

import { useEffect, useState } from "react";
import { useRenderLogger } from "./visualizer";

export const MyComponent = () => {
  const [count, setCount] = useState(0);
  useRenderLogger(`MyComponent (${count})`);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <p>レンダリング回数：{count}</p>
    </>
  );
};
