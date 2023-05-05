import { useState, useRef, useEffect } from "react";

export const MobilePayment = () => {
  const [count, setCount] = useState(1);
  const refCount = useRef<number>(5);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  // console.log({
  //   count,
  //   refCount: refCount.current,
  //   inputRef: inputRef.current,
  // });

  return (
    <div>
      <h1>MobilePayment Page</h1>
      <div>Count: {count}</div>
      <button onClick={() => setCount((c) => c + 1)}>Add</button>
      <div>RefCount: {refCount.current}</div>
      <button
        onClick={() => {
          refCount.current = refCount.current + 5;
          console.log(refCount.current);
        }}
      >
        Add 5 to RefCount
      </button>
      <input type="text" id="barkha" ref={inputRef} />
    </div>
  );
};
