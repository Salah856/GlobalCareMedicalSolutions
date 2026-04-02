import { useEffect } from "react";
import { useLocation } from "react-router-dom";



export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof (window as any)?.gtag === "function") {
     (window as any).gtag?.(
      "config", 
      "G-1HJG03Q4D6",
      // "G-2NP2SCH1XT", 
      {
        page_path: location.pathname + location.search,
     });
    };
  }, [location]);
};




