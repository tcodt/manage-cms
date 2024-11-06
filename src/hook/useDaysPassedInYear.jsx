import jalaali, { jalaaliMonthLength } from "jalaali-js";
import { useEffect, useState } from "react";

const useDaysPassedInYear = () => {
  const [daysPassed, setDaysPassed] = useState(0);

  useEffect(() => {
    const now = new Date();
    const {
      jy: currentYear,
      jm: currentMonth,
      jd: currentDay,
    } = jalaali.toJalaali(now);

    let daysCount = 0;
    for (let month = 0; month < currentMonth; month++) {
      daysCount += jalaaliMonthLength(currentYear, month);
    }
    daysCount += currentDay;

    setDaysPassed(daysCount);
  }, []);

  return daysPassed;
};

export default useDaysPassedInYear;
