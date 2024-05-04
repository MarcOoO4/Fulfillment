import React, {useContext} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import OrderItem from "./OrderItem";

const UserList = observer(() => {
    const { order } = useContext(Context);
    const id = localStorage.getItem('id');
    const userOrders = order.orders.filter(order => order.userId === parseInt(id));

    return (
        <Row className="">
            {userOrders.map(order =>
                <OrderItem key={order.id} order={order} />
            )}
        </Row>
    );
});

export default UserList;