/* eslint-disable func-names */
const moment = require('moment');
function fiterChartDataByDate(startDate, endDate, originChartData) {
  const formateDateToInputFormat = (date) => moment(date).format('YYYY-MM-DD');
  // eslint-disable-next-line no-unused-vars
  const filterChartData = originChartData.filter(
    // eslint-disable-next-line camelcase
    ({ date_ms }) => moment(formateDateToInputFormat(date_ms)).isBetween(
      startDate,
      endDate,
      undefined,
      '[]'
    )
  );

  return filterChartData;
}

module.exports = fiterChartDataByDate;
