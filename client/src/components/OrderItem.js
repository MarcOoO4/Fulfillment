import React, {useContext} from 'react';
import {Container, Button} from "react-bootstrap";
import { Context } from "../index";
import './order.css';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // добавляем 1, так как месяцы в JS начинаются с 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}
const OrderItem = ({order, onEdit}) => {
    const { user } = useContext(Context);
    const isAdmin = user.isAdmin; // Проверяем, является ли пользователь администратором

    return (
        <Container className="containerOrder">
            <table className="fixed-width-table my-3">
                <thead>
                <tr>
                    <th>ID заказа</th>
                    <th>Дата заказа</th>
                    <th>Статус заказа</th>
                    <th>Название товара</th>
                    <th>Объем товара (м³)</th>
                    <th>Вес товара (кг)</th>
                    <th>Количество товара (шт)</th>
                    <th>Цена заказа</th>
                    <th>Местоположение товара</th>
                    <th>Маркетплейс</th>
                    {isAdmin && <th>ID Клиента</th>}
                    {isAdmin && <th>Действия</th>}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{order.id}</td>
                    <td>{formatDate(order.date)}</td>
                    <td>{order.order_status}</td>
                    <td>{order.product_name}</td>
                    <td>{order.volume}</td>
                    <td>{order.weight}</td>
                    <td>{order.quantity_product}</td>
                    <td>{order.price}</td>
                    <td>{order.product_location}</td>
                    <td>{order.marketplace}</td>
                    {isAdmin && <td>{order.userId}</td>}
                    {isAdmin && (
                        <td>
                            <Button variant="info" onClick={() => onEdit(order)}>Редактировать</Button>
                        </td>
                    )}
                </tr>
                </tbody>
            </table>
        </Container>
    )
}

export default OrderItem;