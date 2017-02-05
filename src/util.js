/**
 * @param String. One of '1-10', '11-20', '21-30', '31-40', 40+
 */
export function wordingForExplanationLine(segment, count) {
  if(count <= 0) {
    console.error("Can't provide wording for count ", count, 'and segment', segment);
    return "Can't provide wording for count " + ' and segment ' + segment;
  }
  const tripWord = count === 1 ? 'Поездка' : 'Поездки';
  const costWord = count === 1 ? 'стоит' : 'стоят';
  let countWord = '';

  switch(segment) {
    case '1-10':
      countWord = count === 1 ? '1' : '1-' + (0 + count); 
      break;
    case '11-20':
      countWord = count === 1 ? '11' : '11-' + (10 + count); 
      break;
    case '21-30':
      countWord = count === 1 ? '21' : '21-' + (20 + count); 
      break;
    case '31-40':
      countWord = count === 1 ? '31' : '31-' + (30 + count); 
      break;
    case '41+':
      countWord = count === 1 ? '41' : '41-' + (40 + count); 
      break;
    default: {
      console.error('unknown segment ', segment);
      return 'unknown segment ' + segment;
    }
  }
  return tripWord + ' ' + countWord + ' ' + costWord;
}