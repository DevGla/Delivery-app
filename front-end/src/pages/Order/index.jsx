import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import OrderItem from '../../components/OrderItem';
import style from './style.module.css';

export default function Order() {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    axios.get('http://localhost:3002/sales/all', {
      headers: {
        authorization: JSON.parse(localStorage.getItem('user'))?.token,
      },
    })
      .then((response) => setOrders(response.data))
      .catch(() => console.log('deu ruim'));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Header />
      <div className={ style.container__orders }>
        { !orders.length
          ? <p>Você não possui pedidos :</p>
          : orders.map((order, index) => (
            <OrderItem
              key={ index }
              id={ order.id }
              totalPrice={ order.totalPrice }
              status={ order.status }
              data={ order.saleDate }
              index={ index }
            />
          ))}
      </div>
    </div>
  );
}
