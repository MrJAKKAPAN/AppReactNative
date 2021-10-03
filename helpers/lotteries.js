import { remove, find, uniq, groupBy, reduce } from 'lodash';

export const groupLotteries = (initLotteries, groupType, prize) => {
  let lotteriesGroupByNumber = groupBy(initLotteries, groupType);
  const remainingLotteries = [];
  const groupResults = reduce(
    lotteriesGroupByNumber,
    (result, lotteryGroup, key) => {
      if (lotteryGroup.length > 1 && key !== 'undefined' && !prize) {
        const firstItem = lotteryGroup[0];
        result.push({
          lotteries: lotteryGroup,
          number: firstItem.number,
          groupKey: key,
          count: lotteryGroup.length,
        });
      } else {
        remainingLotteries.push(...lotteryGroup);
      }
      return result;
    },
    [],
  );
  return {
    result: groupResults,
    remaining: remainingLotteries,
  };
};
export const groupAllLotteries = (formattedLotteries, prize) => {
  const numberGroupResult = groupLotteries(formattedLotteries, 'number', prize);
  const seriesLotteries = numberGroupResult.result;
  const lastThreeDigitsGroupResult = groupLotteries(numberGroupResult.remaining, 'lastThreeDigits');
  const lastThreeDigitsLotteries = lastThreeDigitsGroupResult.result;
  const lastTwoDigitsGroupResult = groupLotteries(lastThreeDigitsGroupResult.remaining, 'lastTwoDigits');
  const lastTwoDigitsLotteries = lastTwoDigitsGroupResult.result;
  const firstThreeDigitsGroupResult = groupLotteries(lastTwoDigitsGroupResult.remaining, 'firstThreeDigits');
  const firstThreeDigitsLotteries = firstThreeDigitsGroupResult.result;

  const singleLotteries = firstThreeDigitsGroupResult.remaining;
  
  return {
    series: seriesLotteries,
    lastThree: lastThreeDigitsLotteries,
    lastTwo: lastTwoDigitsLotteries,
    firstThree: firstThreeDigitsLotteries,
    single: singleLotteries,
  };
};
