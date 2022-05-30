const helper = require('../utils/fiterChartDataByDate');
const moment = require('moment');
const chartData = require('./mockApi.json');

describe('fiter Chart-Data By Date', () => {
  // eslint-disable-next-line no-undef
  test('pass startDate and endDate parameters', () => {
    moment.locale('en');
    const startDate = '2022-01-10';
    const endDate = '2022-01-11';
    const originChartData = chartData;
    const res = [{
      date_ms: 1641772800000,
      performance: 0.2,
    },
    {
      date_ms: 1641859200000,
      performance: 0.33,
    }];
    expect(helper(
      startDate,
      endDate,
      originChartData
    )).toEqual(res);
  });
  // eslint-disable-next-line no-undef
  test('pass startDate parameter only', () => {
    moment.locale('en');
    const startDate = null;
    const endDate = '2022-01-11';
    const originChartData = chartData;
    const res = [];
    expect(helper(
      startDate,
      endDate,
      originChartData
    )).toEqual(res);
  });
  // eslint-disable-next-line no-undef
  test('pass endDate parameter only', () => {
    moment.locale('en');
    const startDate = '2022-01-10';
    const endDate = null;
    const originChartData = chartData;
    const res = [];
    expect(helper(
      startDate,
      endDate,
      originChartData
    )).toEqual(res);
  });
  // eslint-disable-next-line no-undef
  test('not pass any parameter', () => {
    moment.locale('en');
    const startDate = null;
    const endDate = null;
    const originChartData = chartData;
    const res = [];
    expect(helper(
      startDate,
      endDate,
      originChartData
    )).toEqual(res);
  });
});
