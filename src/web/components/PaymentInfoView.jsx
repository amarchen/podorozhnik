import React from 'react';
import {connect} from 'react-redux';
// import {List, Map, fromJS} from 'immutable';

import * as actionCreators from '../../action_creators';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';


require('./PodorozhnikApp.less');

export class PaymentInfoView extends React.Component {
  constructor(props) {
    super(props);
    // console.log('App props:', props.model.toJS());
  }

  

  render() {
    // console.log('app .props: ', this.props);
    return(
      <span>
        <Row id="paymentView" className="row-centered">
          <Col className="col-centered" xs={12} sm={8} md={6}>
            <Button
              onClick={() => {
                this.props.onPaymentViewBackButtonClicked()
              }}
            >&lt; Назад</Button>
            <div>
              Пополнить Подорожник можно <a href="http://ispp.spbmetropoliten.ru/">на официальном сайте Петербургского метрополитена</a> через банковскую карту,
              электронные деньги (WebMoney, Яндекс.Деньги, QIWI-кошелёк) или со счёта мобильного телефона.
            </div>
            <div className="paymentButtonContainer">
              <a className="btn btn-primary" href="http://ispp.spbmetropoliten.ru/">Перейти на страницу пополнения</a>
            </div>
            <div>
              Обратите внимание, что за пополнение электронным образом взимается комиссия от двух (при оплате банковской картой)
              до более восьми процентов (при оплате с мобильного счёта Мегафона).
            </div>
            <div>
              С мобильного телефона вы также можете пополнить счёт отправив на номер 7878 смс <span className="smsSample">pod &lt;номер-карты-подорожник&gt; &lt;сумма-в рублях&gt;</span>,
              например <span className="smsSample">pod 96433078360764086447196203 100</span>, чтобы пополнить мой Подорожник на 100 рублей.
            </div>
            <div>
              В ответ придёт ответная смс с указанием размера комиссии и запросом на подтверждение оплаты. Пользователи Андроид могут
              установить <a href="https://play.google.com/store/apps/details?id=ru.smprc.podorojnik">мобильное приложение для оплаты</a>,
              мобильное приложение тоже будет взимать комиссию.
            </div>
            <div>
              После пополнения счёта Подорожника, начисленные средства надо активировать, <a href="http://otzovik.com/review_1237300.html">приложив карту</a> к
              любому аппарату проверки средств карты в метро
            </div>
          </Col>
        </Row>
      </span>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  };
}

const PaymentInfoViewContainer = connect(mapStateToProps, actionCreators)(PaymentInfoView);

export default PaymentInfoViewContainer;