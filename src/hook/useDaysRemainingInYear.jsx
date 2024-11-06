import { useState, useEffect } from "react";
import jalaali from "jalaali-js";

const useDaysRemainingInYear = () => {
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    const now = new Date();
    const {
      jy: currentYear,
      jm: currentMonth,
      jd: currentDay,
    } = jalaali.toJalaali(now);

    const isLeapYear = jalaali.isLeapJalaaliYear(currentYear);
    const totalDaysInYear = isLeapYear ? 366 : 365;

    let daysCount = 0;
    for (let month = 1; month < currentMonth; month++) {
      daysCount += jalaali.jalaaliMonthLength(currentYear, month);
    }
    daysCount += currentDay;

    const remainingDays = totalDaysInYear - daysCount;
    setDaysRemaining(remainingDays);
  }, []);

  return daysRemaining;
};

export default useDaysRemainingInYear;
