import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserById, getAllUsers, getCustomerOrders } from '../../actions';
import { BsTrash } from "react-icons/bs";
import Highlight from '../../components/Highlight';
import BarChart from '../../components/BarChart';
import Layout from '../../components/Layout'
import './style.css';

const Home = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getAllUsers());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCustomerOrders());
    }
  }, [auth.authenticate]);

  const renderUserList = () => {
    return (
      <>
        <h3>User list</h3>
        <table className="content-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Id</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              user.users?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {user.role === 'user' ?
                    <td>
                      <button
                        className="deleteUser-btn"
                        onClick={() => {
                          const payload = { userId: user._id };
                          dispatch(deleteUserById(payload));
                        }}><BsTrash />
                      </button>
                    </td>
                    : null
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    );
  }

  return (
    <Layout sidebar>
      {renderUserList()}
      <h3>Shop status</h3>
      <Highlight
        users={(Object.values(user.users).filter(user => user.role === 'user')).length}
        orders={order.orders?.length}
        delivered={order.orders?.filter(orderItem => orderItem.orderStatus[3].isCompleted === true).length}
      />
      <BarChart
        users={(Object.values(user.users).filter(user => user.role === 'user')).length}
        orders={order.orders?.length}
        delivered={order.orders?.filter(orderItem => orderItem.orderStatus[3].isCompleted === true).length}
      />
    </Layout>
  );
}

export default Home;