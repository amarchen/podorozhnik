MONTHLY_SUBWAY_PRICE_ETICKET = [
  { startingTripNum: 1, lastTripNum: 10, price: 36},
  { startingTripNum: 11, lastTripNum: 20, price: 35},
  { startingTripNum: 21, lastTripNum: 30, price: 34},
  { startingTripNum: 31, lastTripNum: 40, price: 33},
  { startingTripNum: 41, lastTripNum: Number.MAX_VALUE, price: 32},
];

MONTHLY_NON_SUBWAY_PRICE_ETICKET = [
  { startingTripNum: 1, lastTripNum: 10, price: 31},
  { startingTripNum: 11, lastTripNum: 20, price: 30},
  { startingTripNum: 21, lastTripNum: 30, price: 29},
  { startingTripNum: 31, lastTripNum: 40, price: 28},
  { startingTripNum: 41, lastTripNum: Number.MAX_VALUE, price: 27},
];

MONTHLY_SUBWAY_PRICE_SINGLE = [
  { startingTripNum: 1, lastTripNum: Number.MAX_VALUE, price: 45},
];

MONTHLY_NON_SUBWAY_PRICE_SINGLE = [
  { startingTripNum: 1, lastTripNum: Number.MAX_VALUE, price: 40},
];

/**
 * @param plannedTrips JavaScript set of weekday-weekend trips. Has to be completely filled, no undefines or nulls
 * @return total cost for a month
 */
export function calcMonthlyCost( plannedTrips ) {
  const { subwayTrips, nonSubwayTrips } = _getMonthlyTripCounts( plannedTrips );
  return monthlyCostsFromTripsAndPriceMap(subwayTrips, MONTHLY_SUBWAY_PRICE_ETICKET)
         + monthlyCostsFromTripsAndPriceMap(nonSubwayTrips, MONTHLY_NON_SUBWAY_PRICE_ETICKET);
}

export function calcSingleTripsCost( plannedTrips ) {
  const { subwayTrips, nonSubwayTrips } = _getMonthlyTripCounts( plannedTrips );
  return monthlyCostsFromTripsAndPriceMap(subwayTrips, MONTHLY_SUBWAY_PRICE_SINGLE)
         + monthlyCostsFromTripsAndPriceMap(nonSubwayTrips, MONTHLY_NON_SUBWAY_PRICE_SINGLE); 
}

export function monthlyCostsFromTripsAndPriceMap( tripCount, priceMap) {
  let totalCost = 0;
  priceMap.forEach( function( priceRow ) {
    const tripsFromRangeStart = Math.max(tripCount - (priceRow.startingTripNum - 1), 0);
    const tripsAboveRangeEnd = Math.max(tripCount - priceRow.lastTripNum, 0);;
    const tripsInRange = tripsFromRangeStart - tripsAboveRangeEnd;
    const rangeCost = tripsInRange * priceRow.price;
    totalCost += rangeCost;
  } );  
  return totalCost;
}


/**
 * @param plannedTrips JavaScript set of weekday-weekend trips. Has to be completely filled, no undefines or nulls
 * return a tuple of trips for the whole month {subwayTrips: 22, nonSubwayTrips: 44}
 */
function _getMonthlyTripCounts( plannedTrips ) {
  const monthlySubwayTrips = plannedTrips.weekday.subway * 22 + plannedTrips.weekend.subway * 8;
  const monthlyNonSubwayTrips = plannedTrips.weekday.nonSubway * 22 + plannedTrips.weekend.nonSubway * 8;
  return {subwayTrips: monthlySubwayTrips, nonSubwayTrips: monthlyNonSubwayTrips};
}
