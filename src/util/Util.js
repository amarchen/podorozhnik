 export function subwayPackageTitle(subwayPackageType) {
    switch(subwayPackageType) {
      case 'none':
        return 'нет';
      case '10':
        return '10 поездок';
      default:
        console.error('Unknown monthlyType', subwayPackageType);
        return 'Неизвестный тип многоразового проездного на метро';
    }
  }

 export function monthlyTitle(monthlyType) {
    switch(monthlyType) {
      case 'none':
        return 'нет';
      case 'bus':
        return 'автобус';
      case 'tram':
        return 'трамвай';
      default:
        console.error('Unknown monthlyType', monthlyType);
        return 'Неизвестный тип месячного проездного';
    }
  }