import React, {useContext, useEffect} from 'react';
import {Container} from "react-bootstrap";
import { Context } from "../index";
import './users.css';
import {fetchOrders} from "../http/orderAPI";


const UserItem = ({user}) => {
    const {order} = useContext(Context)
    const filteredOrders = order.orders.filter(order => order.userId === user.id);

    useEffect( () => {
        fetchOrders().then(data => order.setOrders(data.rows))
    }, [order])

    return (
        <Container className="containerOrder">
            <table className="fixed-width-table2 my-3">
                <thead>
                <tr>
                    <th>ID пользователя</th>
                    <th>ФИО</th>
                    <th>Номер телефона</th>
                    <th>Email</th>
                    <th>ID заказа</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{user.id}</td>
                    <td>{user.FIO}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                        {filteredOrders.map(order => (
                            <span key={order.id}>{order.id}, </span>
                        ))}
                    </td>
                </tr>
                </tbody>
            </table>
        </Container>
    )
}

export default UserItem;