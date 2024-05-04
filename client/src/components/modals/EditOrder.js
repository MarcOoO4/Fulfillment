import React, { useState, useEffect } from 'react';
import {Modal, Form, Button, Dropdown} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {updateOrder, deleteOrder} from "../../http/orderAPI";
import { format } from 'date-fns';

const EditOrder = ({ show, onHide, selectedOrder}) => {
    const [price, setPrice] = useState('');
    const [product_name, setProduct_name] = useState('');
    const [product_location, setProduct_location] = useState('')
    const [volume, setVolume] = useState('')
    const [weight, setWeight] = useState('')
    const [quantity_product, setQuantity_product] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [userId, setUserId] = useState('')

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const [selectedMarketplace, setSelectedMarketplace] = useState(""); // Состояние для хранения выбранного маркетплейса

    // Функция для обновления состояния при выборе маркетплейса
    const handleMarketplaceSelect = (marketplace) => {
        setSelectedMarketplace(marketplace);
    };

    const [selectedStatus, setSelectedStatus] = useState(""); // Состояние для хранения выбранного маркетплейса
    // // Функция для обновления состояния заказа
    const handleStatusSelect = (status) => {
        setSelectedStatus(status);
    };


    useEffect(() => {
        if (selectedOrder) {
            setPrice(selectedOrder.price || '');
            setProduct_name(selectedOrder.product_name || '');
            setProduct_location(selectedOrder.product_location || '');
            setVolume(selectedOrder.volume|| '');
            setWeight(selectedOrder.weight || '');
            setQuantity_product(selectedOrder.quantity_product || '');
            setSelectedDate(selectedOrder.date || '');
            setSelectedStatus(selectedOrder.order_status || '');
            setSelectedMarketplace(selectedOrder.marketplace || '');
            setUserId(selectedOrder.userId || '');
        }
    }, [selectedOrder]);

    const handleUpdateOrder = async () => {
        try {
            const formattedDate = format(selectedDate, 'yyyy.MM.dd');
            const updatedOrder = {
                id: selectedOrder.id,
                product_name,
                order_status: selectedStatus ? selectedStatus : 'Создан',
                date: formattedDate,
                price,
                product_location,
                volume,
                weight,
                quantity_product,
                marketplace: selectedMarketplace ? selectedMarketplace : '',
                userId,
            };

            await updateOrder(selectedOrder.id, updatedOrder);
            onHide(); // Закрыть модальное окно после успешного обновления заказа
            window.location.reload(); // Обновить страницу
        } catch (error) {
            console.error('Ошибка при обновлении заказа:', error);
        }
    };

    const handleDeleteOrder = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
            try {
                await deleteOrder(selectedOrder.id);
                onHide(); // Закрыть модальное окно после успешного удаления заказа заказа
                window.location.reload(); // Обновить страницу
            } catch (error) {
                console.error('Ошибка при удалении заказа:', error);
            }
        }
    };


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Редактировать заказ</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название товара"}
                        value={product_name}
                        onChange={(e) => setProduct_name(e.target.value) }
                    />

                    <Form.Group controlId="formDate">
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="Выберите дату заказа"
                            className="form-control mt-3"
                        />
                    </Form.Group>
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle>
                            {selectedStatus ? selectedStatus : 'Статус заказа'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleStatusSelect("Создан")}>Создан</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusSelect("Ожидает забора с ТК")}>Ожидает забора с тк</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusSelect("В работе")}>В работе</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusSelect("Ожидает отгрузки на склад")}>Ожидает отгрузки на склад</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleStatusSelect("Завершен")}>Завершен</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        className="mt-3"
                        placeholder={"Введите местоположение товара"}
                        value={product_location}
                        onChange={e => setProduct_location(e.target.value) }
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder={"Введите объем товара (м³)"}
                        type="number"
                        value={volume}
                        onChange={e => setVolume(e.target.value)}
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder={"Введите вес товара (кг)"}
                        type="number"
                        value={weight}
                        onChange={e => setWeight(e.target.value)}
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder={"Введите цену заказа"}
                        type="number"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder={"Введите количество товара (шт)"}
                        type="number"
                        value={quantity_product}
                        onChange={e => setQuantity_product(e.target.value)}
                    />

                    <Dropdown className="mt-3">
                        <Dropdown.Toggle>
                            {selectedMarketplace ? selectedMarketplace : 'Введите маркетплейс'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleMarketplaceSelect("Wildberries")}>Wildberries</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleMarketplaceSelect("Ozon")}>Ozon</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        className="mt-3"
                        placeholder={"Введите ID клиента"}
                        type="number"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Отмена</Button>
                <Button variant="danger" onClick={handleDeleteOrder}>Удалить заказ</Button>
                <Button variant="primary" onClick={handleUpdateOrder}>Сохранить изменения</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditOrder;