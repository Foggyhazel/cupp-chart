import React, { createContext, useState, useMemo } from "react";

export const HandlerContext = createContext();
export const LocationContext = createContext();

export default function TouchHandler({ children }) {
  const [loc, setLoc] = useState({ x: 0, y: 0, active: false });
  const handlers = useMemo(
    () => ({
      onTouchStart(e) {
        setLoc({
          x: e.nativeEvent.locationX,
          y: e.nativeEvent.locationY,
          active: true,
        });
      },
      onTouchMove(e) {
        setLoc({
          x: e.nativeEvent.locationX,
          y: e.nativeEvent.locationY,
          active: true,
        });
      },
      onTouchEnd(e) {
        setLoc({
          x: e.nativeEvent.locationX,
          y: e.nativeEvent.locationY,
          active: false,
        });
      },
    }),
    []
  );

  return (
    <HandlerContext.Provider value={handlers}>
      <LocationContext.Provider value={loc}>
        {children}
      </LocationContext.Provider>
    </HandlerContext.Provider>
  );
}
