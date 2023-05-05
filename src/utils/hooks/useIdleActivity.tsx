import { useRef, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const TEN_MINUTES = 10 * 1000;
const THREE_MINUTES = 3 * 1000;
const whiteListedUrls = ["/login", "/productSelection"].map(
  (s) => `#${import.meta.env.VITE_REACT_APP_ROOT}${s}`
);

export const useIdleActivity = () => {
  const history = useHistory();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [timeLeft, setTimeLeft] = useState(TEN_MINUTES / 1000);

  const redirectToLogin = () => history.push("/login");

  const detectActivity = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(TEN_MINUTES / 1000);
    if (!whiteListedUrls.includes(window.location.hash)) {
      timerRef.current = setTimeout(redirectToLogin, TEN_MINUTES);
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
  };

  useEffect(() => {
    if (timeLeft === 0 && intervalRef.current)
      clearInterval(intervalRef.current);
    if (timeLeft === THREE_MINUTES / 1000) history.push("/productSelection");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const handleMouseMove = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(detectActivity, 500);
  };

  useEffect(() => {
    detectActivity();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleMouseMove);
    document.addEventListener("touchstart", detectActivity);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleMouseMove);
      document.removeEventListener("touchstart", detectActivity);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return timeLeft;
};
