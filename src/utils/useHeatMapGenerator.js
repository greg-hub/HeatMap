import { useRef } from "react";
import getDayNumberInYear from "./getDayNumberInYear";
import formatTransactions from "./formatTransactions";
import getSortedData from "./getSortedData";
import classlist from "classnames";

const useHeatMapYearGenerator = (sourcedata) => {
  const dataIndex = useRef(0);
  const daysInYear = 365;
  const sortedData = getSortedData(sourcedata);
  const transactions = formatTransactions(sortedData);

  return new Array(daysInYear).fill(null).map((_, dayIndex) => {
    let isDayMatch = false;
    let data = {};
    const heat = {};
    const indexData = transactions[dataIndex.current];

    if (dataIndex.current < daysInYear && !!indexData) {
      const [isoDate] = Object.keys(indexData);
      const transactionDayNumber = getDayNumberInYear(isoDate);
      isDayMatch = dayIndex === transactionDayNumber - 1;

      if (isDayMatch) {
        data = transactions[dataIndex.current][isoDate];
        dataIndex.current += 1;
      }
    }

    if (!!Object.keys(data).length) {
      const calculateTotals = (accumulator, currentValue) =>
        accumulator + currentValue;
      const { failed = [], success = [] } = data;
      const failedAmount = failed.reduce(calculateTotals, 0).toFixed(2);
      const successAmount = success.reduce(calculateTotals, 0).toFixed(2);

      if (failedAmount > successAmount) {
        heat.type = "fail";
        heat.total = failedAmount;
      } else {
        heat.type = "success";
        heat.total = successAmount;
      }
    }

    return (
      <div
        key={`day-${dayIndex}`}
        className={classlist("day", {
          success: isDayMatch && heat?.type === "success",
          fail: isDayMatch && heat?.type === "fail"
        })}
      />
    );
  });
};

export default useHeatMapYearGenerator; 