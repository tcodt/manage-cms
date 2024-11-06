import jalaali from "jalaali-js";
import { useEffect, useState } from "react";

const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const { jy, jm, jd } = jalaali.toJalaali(now);
    setCurrentDate(`${jy}/${jm}/${jd}`);
  }, []);

  return currentDate;
};

export default useCurrentDate;
