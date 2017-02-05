import React, { Component } from 'react';
import {
  PropTypes,
  View,
  Text
} from 'react-native';
import {subwayPackageTitle, monthlyTitle} from '../../util/Util';

export default class PaymentOption extends Component {
  constructor(props) {
    super(props);
    // console.log('props:', props);
  }

  render() {
    return (
      <View>
        <Text >Проездной: {monthlyTitle(this.props.monthlyType)}</Text>
        <Text >Многоразовый на метро: {subwayPackageTitle(this.props.metroPackage)}</Text>
        <Text >Сумма на единый электронный билет: {this.props.walletMoney}₽</Text>
        <Text >на {this.props.walletSubwayTrips} поездки на метро</Text>
        <Text >и {this.props.walletNonSubwayTrips} поездок на наземном транспорте.</Text>
        <Text >Итого: {this.props.totalCost}</Text>
      </View>
    );
  }
}
