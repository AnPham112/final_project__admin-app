import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerOrders, updateOrder } from '../../actions';
import Layout from '../../components/Layout'
import Card from '../../components/UI/Card';
import { ToastContainer } from 'react-toastify';
import './style.css';

const Orders = (props) => {
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);
  const [type, setType] = useState('');
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = { orderId, type };
    dispatch(updateOrder(payload));
  }

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCustomerOrders());
    }
  }, [auth.authenticate]);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  }

  return (
    <Layout sidebar>
      <h3>Order list</h3>
      {
        order.orders.map((orderItem, index) => (
          <Card
            cardheaderstyle={{ backgroundColor: 'rgba(20, 45, 52, 0.9)', padding: '20px 50px', color: '#fff' }}
            style={{ backgroundColor: '#D8D8D8', margin: '0 0 0.5rem 0' }}
            key={index}
            headerleft={`Order id: ${orderItem._id}`}>
            <div className="itemStatus-container">
              <div>
                <div className="title">Items</div>
                {orderItem.items.map((item, index) => (
                  <div className="value" key={index}>
                    {item.productId?.name}
                  </div>
                ))}
              </div>
              <div>
                <span className="title">Total Price</span><br />
                <span className="value">${orderItem.totalAmount}</span>
              </div>
              <div>
                <span className="title">Payment Type</span><br />
                <span className="value">{orderItem.paymentType}</span>
              </div>
              <div>
                <span className="title">Payment Status</span><br />
                <span className="value">{orderItem.paymentStatus}</span>
              </div>
            </div>
            <div className="handleDelivery-container">
              <div className="orderTrack">
                {orderItem.orderStatus.map((status, index) => (
                  <div key={index} className={`orderStatus ${status.isCompleted ? "active" : ""}`} >
                    <div className={`point ${status.isCompleted ? "active" : ""}`}></div>
                    <div className="orderInfo">
                      <div className="status">{status.type}</div>
                      <div className="date">{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* select input to apply order action */}
              <div className="selectStatusContainer">
                <select className="form-select" onChange={(e) => setType(e.target.value)}>
                  <option value={""}>Select status</option>
                  {orderItem.orderStatus.map((status, index) => {
                    return (
                      <>
                        {!status.isCompleted ? (
                          <option
                            key={status.type}
                            value={status.type}>
                            {index + 1}-{status.type}
                          </option>
                        ) : null}
                      </>
                    );
                  })}
                </select>
              </div>

              {/*button to confirm action*/}
              <div className="btnConfirm-container">
                <button onClick={() => onOrderUpdate(orderItem._id)}>confirm</button>
              </div>
            </div>
          </Card>
        ))
      }
      <ToastContainer />
    </Layout >
  );
}

export default Orders;