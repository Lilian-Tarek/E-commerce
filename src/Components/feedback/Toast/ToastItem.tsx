import type { TToast } from "@Types/Types";
import { useAppDispatch } from "@store/hooks";
import { RemoveToast, StopDelayAppearance } from "@store/Toasts/ToastsSlice";
import { useEffect } from "react";
import { useState } from "react";
const ToastItem = ({ id, title, type, message, delayAppearance }: TToast) => {
  const dispatch = useAppDispatch();
  const progressBarScale = 100;
  const duration = 4000;
  const intervalTime = duration / 100;
  const [progressIndicator, setprogressIndicator] = useState(0);
  const [pauseIndicator, setpauseIndicator] = useState(false);

  const HandlePause = () => {
    setpauseIndicator((prev) => !prev);
  };
  useEffect(() => {
    if (delayAppearance === true) {
      const timerId = setTimeout(() => {
        dispatch(StopDelayAppearance(id));
      }, 1000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [delayAppearance, dispatch, id]);

  useEffect(() => {
    if (delayAppearance) return;
    const timerId = setInterval(() => {
      setprogressIndicator((prev) => {
        if (pauseIndicator) {
          return prev;
        }
        if (prev >= progressBarScale) {
          clearInterval(timerId);
          setTimeout(() => dispatch(RemoveToast(id)), 100);
          return prev;
        }

        return prev + 1;
      });
    }, intervalTime);

    return () => clearInterval(timerId);
  }, [dispatch, id, intervalTime, delayAppearance, pauseIndicator]);

  if (delayAppearance) {
    return "";
  }

  const typeStyles = {
    info: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      progress: "bg-blue-500"
    },
    success: {
      bg: "bg-green-100",
      text: "text-green-800",
      progress: "bg-green-500"
    },
    warning: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      progress: "bg-yellow-500"
    },
    danger: {
      bg: "bg-red-100",
      text: "text-red-800",
      progress: "bg-red-500"
    }
  };

  const currentStyle = typeStyles[type];
  return (
    <div
      className={`relative w-full ${currentStyle.bg} shadow-lg  rounded-lg p-4 overflow-hidden `}
      onMouseEnter={HandlePause}
      onMouseLeave={HandlePause}
    >
      <div className="flex justify-between items-start">
        <div>
          <h5 className={`font-semibold  ${currentStyle.text}`}>
            {title ? title : type}
          </h5>
          <p className={`text-sm mt-1 ${currentStyle.text}`}>{message}</p>
        </div>
        <button
          className="text-gray-400 hover:text-gray-600 transition"
          onClick={() => dispatch(RemoveToast(id))}
        >
          ✕
        </button>
      </div>
      <div
        className={`absolute bottom-0 left-0 h-1 transition-all ease-linear ${currentStyle.progress}`}
        style={{ width: `${progressIndicator}%` }}
      ></div>
    </div>
  );
};

export default ToastItem
