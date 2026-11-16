import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface LoadingContextValue {
  isLoading: boolean;
  beginLoading: () => () => void;
  completeLoading: () => void;
  showLoadingFor: (duration?: number) => void;
}

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(
    () => window.sessionStorage.getItem("dua-mode-loading") === "true",
  );
  const activeLoads = useRef(0);
  const transitionTimer = useRef<number | null>(null);

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimer.current !== null) {
      window.clearTimeout(transitionTimer.current);
      transitionTimer.current = null;
    }
  }, []);

  const beginLoading = useCallback(() => {
    clearTransitionTimer();
    activeLoads.current += 1;
    setIsLoading(true);
    let isReleased = false;

    return () => {
      if (isReleased) {
        return;
      }
      isReleased = true;
      activeLoads.current = Math.max(0, activeLoads.current - 1);
      if (activeLoads.current === 0 && transitionTimer.current === null) {
        setIsLoading(false);
      }
    };
  }, [clearTransitionTimer]);

  const completeLoading = useCallback(() => {
    clearTransitionTimer();
    window.sessionStorage.removeItem("dua-mode-loading");
    setIsLoading(false);
  }, [clearTransitionTimer]);

  const showLoadingFor = useCallback(
    (duration = 900) => {
      clearTransitionTimer();
      setIsLoading(true);
      transitionTimer.current = window.setTimeout(() => {
        transitionTimer.current = null;
        if (activeLoads.current === 0) {
          setIsLoading(false);
        }
      }, duration);
    },
    [clearTransitionTimer],
  );

  useEffect(() => clearTransitionTimer, [clearTransitionTimer]);

  return (
    <LoadingContext.Provider value={{ isLoading, beginLoading, completeLoading, showLoadingFor }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useGlobalLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useGlobalLoading must be used within a LoadingProvider.");
  }
  return context;
}
