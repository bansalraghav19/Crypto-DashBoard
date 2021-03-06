import React, { useLayoutEffect, useState } from "react";
import {
  getLocalStorageValue,
  setLocalStorageValue,
} from "../../../utils/localStorage";
import { lightTheme, darkTheme } from "../../../utils/colors";
import { useCallback } from "react";

const Mode = () => {
  const [isNightMode, setIsNightMode] = useState(false);
  const [iconName, setIconName] = useState("fas fa-sun");

  const checkBackgroundMode = useCallback(() => {
    const storedValue: { isStored: boolean; data?: any } =
      getLocalStorageValue("isNightMode");
    const defaultMode = Boolean(storedValue.data);
    if (defaultMode) {
      document.querySelector(".App")?.classList.add("night");
    }
    applyStyles(defaultMode);
  }, []);

  useLayoutEffect(() => {
    checkBackgroundMode();
  }, [checkBackgroundMode]);

  const handleModeChange = () => {
    const newMode = !isNightMode;
    applyStyles(newMode);
    document.querySelector(".App")?.classList.toggle("night");
  };

  const applyStyles = (mode: boolean) => {
    const element = document.documentElement;
    const themeProperties: { [key: string]: string } = mode
      ? darkTheme
      : lightTheme;
    setIconName(mode ? "fas fa-moon" : "fas fa-sun");
    Object.keys(themeProperties).forEach((property) => {
      element.style.setProperty(property, themeProperties[property]);
    });
    setIsNightMode(mode);
    setLocalStorageValue("isNightMode", mode);
  };

  return <i onClick={handleModeChange} className={iconName}></i>;
};

export default React.memo(Mode);
