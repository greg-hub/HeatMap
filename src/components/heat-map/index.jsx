import React  from 'react';
import useHeatMapYearGenerator from '../../utils/useHeatMapGenerator';

const HeatMap = ({data}) => {
  const mappedHeatYear = useHeatMapYearGenerator(data);
  const weeksInYear = 52;
  return (
    <div className="container">
      <div className="wrapper">
        {new Array(weeksInYear).fill(null).map((_, weekIndex) => {
          let week;
          const weekLength = 7;
          if (weekIndex === 0) {
            week = mappedHeatYear.slice(0, weekLength);
          } else {
            week = [
              ...mappedHeatYear.slice(
                weekLength * weekIndex,
                weekLength * weekIndex + weekLength
              )
            ];
          }
          return (
            <div key={`week-${weekIndex}`} className="week">
              {week}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default HeatMap;

