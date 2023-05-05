import { useIdleActivity } from "../utils/hooks/useIdleActivity";

export const CheckIdleActivity = () => {
  const timeLeft = useIdleActivity();
  return (
    <div style={{ textAlign: "right" }}>
      Session will expire in{" "}
      {String(Math.floor(timeLeft / 60)).padStart(2, "0")} :{" "}
      {String(timeLeft % 60).padStart(2, "0")}
    </div>
  );
};
