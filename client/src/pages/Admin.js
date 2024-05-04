import React, {useContext, useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import CreateOrder from "../components/modals/CreateOrder";
import OrderList from "../components/OrderList";
import EditOrder from "../components/modals/EditOrder";
import Users from "../components/Users";
import {fetchOrders} from "../http/orderAPI";
import {fetchUsers} from "../http/userAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Admin = observer (() => {
    const {order} = useContext(Context)
    const {user} = useContext(Context)

    useEffect( () => {
        fetchOrders().then(data => order.setOrders(data.rows))
    }, [])

    useEffect( () => {
        fetchUsers().then(data => user.setUsers(data.rows))
    }, [])


    const [editOrderVisible, setEditOrderVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderVisible, setOrderVisible] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

    const handleEditOrder = (order) => {
        setSelectedOrder(order);
        setEditOrderVisible(true);
    };

    const handleShowOrders = () => {
        // При клике на кнопку "Заказы", изменяем состояние showOrders, чтобы показать или скрыть список заказов
        setShowOrders(!showOrders);
    };

    const handleShowUsers = () => {
        // При клике на кнопку "Заказы", изменяем состояние showOrders, чтобы показать или скрыть список заказов
        setShowUsers(!showUsers);
    };

    return (
        <Container className="d-flex flex-column mt-4">
            <Button
                variant={"outline-dark"}
                className="mt-5 p-2 mb-5"
                onClick={() => setOrderVisible(true)}
            >
                Добавить заказ
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-3 p-2 mb-3"
                onClick={handleShowOrders} // Обработчик клика для кнопки "Заказы"
            >
                Заказы
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-3 p-2 mb-3"
                onClick={handleShowUsers} // Обработчик клика для кнопки "Заказы"
            >
                Пользователи
            </Button>
            {showOrders && ( // Показываем OrderList только если showOrders равен true
                <OrderList onEdit={handleEditOrder} />
            )}
            {showUsers && ( // Показываем Users только если showOrders равен true
                <Users/>
            )}
            <CreateOrder show={orderVisible} onHide={() => setOrderVisible(false)}/>
            <EditOrder
                show={editOrderVisible}
                onHide={() => setEditOrderVisible(false)}
                order={selectedOrder}
            />
        </Container>
    );
});

export default Admin;
