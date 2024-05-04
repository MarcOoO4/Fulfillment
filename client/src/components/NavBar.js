import React, {useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Context} from "../index";
import {NavLink, useLocation} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, ACCOUNT_ROUTE} from "../utils/consts";
import {Button} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {useNavigate} from 'react-router-dom';


const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isAccountPage = location.pathname === ACCOUNT_ROUTE;
    const isAdminPage = location.pathname === ADMIN_ROUTE;

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false);
        // Проверяем, находится ли пользователь на странице личного кабинета или админ-панели
        if (isAccountPage || isAdminPage) {
            navigate(SHOP_ROUTE); // Перенаправляем на главную страницу
        }
    }

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        display: 'block',
        padding: '10px',
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark" className="fixed-top">
            <Container>
                <NavLink style={{color:'white', textDecoration: "none", fontSize: '20px', fontWeight: 'bold', marginRight: '50px'}} to={SHOP_ROUTE}>THE DOERS</NavLink>
                {isHomePage && (
                    <Nav style={{color: 'white', marginRight: 'auto'}}>
                        <a href="#home" style={linkStyle}>Главная</a>
                        <a href="#services" style={linkStyle}>Услуги</a>
                        <a href="#calculate" style={linkStyle}>Калькулятор</a>
                        <a href="#contacts" style={linkStyle}>Контакты</a>
                    </Nav>
                )}
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {!user.isAdmin && (
                        <Button
                            variant={"outline-light"}
                            className="mr-2"
                            onClick={() => navigate(ACCOUNT_ROUTE)}
                        >
                            Личный кабинет
                        </Button>
                        )}
                        {user.isAdmin ?
                        <Button
                            variant={"outline-light"}
                            className="ml-2"
                            onClick={() => navigate(ADMIN_ROUTE)}
                        >
                            Админ панель
                        </Button>
                            :
                            <div></div>
                        }
                        <Button
                            variant={"outline-light"}
                            onClick={() => logOut()}
                            className='ms-2'
                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button variant={"outline-light"} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});


export default NavBar;
