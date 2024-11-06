import useDaysPassedInYear from "../hook/useDaysPassedInYear";
import useDaysRemainingInYear from "../hook/useDaysRemainingInYear";

function DateInfos() {
  const daysRemaining = useDaysRemainingInYear();
  const daysPassedInYear = useDaysPassedInYear();

  const d = new Date();

  const getMonth = new Intl.DateTimeFormat("fa-IR", { month: "short" }).format(
    d
  );
  const getDay = new Intl.DateTimeFormat("fa-IR", { day: "numeric" }).format(d);
  const getYear = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(
    d
  );

  return (
    <div className="bg-white p-4 rounded border border-slate-200">
      <div>
        <div className="mb-4">
          <p className="text-gray-500 text-lg mb-2">امروز:</p>
          <span className="text-sky-500 text-xl block text-end">{`${getDay} ,${getMonth} ,${getYear}`}</span>
        </div>
        <hr />
      </div>
      <div className="my-4">
        <p className="text-gray-500 text-lg mb-2">
          روز های باقی مانده تا سال جدید:
        </p>
        <span className="text-sky-500 text-xl block text-end">{`${daysRemaining} روز`}</span>
      </div>
      <hr />
      <div className="mt-4">
        <p className="text-gray-500 text-lg mb-2">روز های گذشته:</p>
        <span className="text-red-500 text-xl block text-end">{`${daysPassedInYear} روز`}</span>
      </div>
    </div>
  );
}

export default DateInfos;
