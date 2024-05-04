import React, {useContext, useEffect, useState} from 'react';
import { Container, Card, Row } from "react-bootstrap";
import { getEmail, getFIO, getPhone } from "../utils/localStorageKeys";
import UserList from "./UserList";
import {fetchOrders} from "../http/orderAPI";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Profile = observer (() => {
    const {order} = useContext(Context)
    const [FIO, setFIO] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Получаем данные пользователя из локального хранилища
        const storedFIO = getFIO();
        const storedPhone = getPhone();
        const storedEmail = getEmail();

        // Устанавливаем данные пользователя в состояние компонента
        setFIO(storedFIO);
        setPhone(storedPhone);
        setEmail(storedEmail);
    }, []);
    useEffect( () => {
        fetchOrders().then(data => order.setOrders(data.rows))
    }, [order])

    return (
        <Container>
            <Row className="justify-content-center align-items-center pt-4 pb-5">
                <Card style={{ width: 500}} className="p-5 pb-2 pt-2 mt-5">
                    <h2 className="pb-2">Личный кабинет</h2>
                    <div className="justify-content-center align-items-center my-2">
                        <p>ФИО: {FIO}</p>
                        <p>Телефон: {phone}</p>
                        <p>Email: {email}</p>
                    </div>
                </Card>
            </Row>
            <UserList/>
        </Container>
    );
})

export default Profile;