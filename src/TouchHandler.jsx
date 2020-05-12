import React, { createContext, useState, useMemo, useContext } from "react";

const HandlerContext = createContext({});
const LocationContext = createContext({ x: 0, y: 0, active: false });

/**
 * Return event handlers for component.
 * Use inside 'TouchHandler'
 * @returns {{onTouchStart: function, onTouchMove: function, onTouchEnd: function}}
 */
export const useTouchHandlers = () => {
  return useContext(HandlerContext);
};

/**
 * Use inside TouchHandler context.
 * Return touch location inside element that generate touch event
 * @return {{x: number, y:number, active: boolean}}
 */
export const useTouchLocation = () => {
  return useContext(LocationContext);
};

/**
 * Provide touch handler to be bind to component and store touch event info.
 * Use together with 'useTouchLocation' and 'useTouchHandlers'
 */
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
