import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from './components/AppRouter';
import Navbar from "./components/NavBar";
import {Context} from "./index";
import 'bootstrap/dist/css/bootstrap.min.css';
import {observer} from "mobx-react-lite";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";

const App = observer ( () => {
    const {user} = useContext(Context)
    const [loading, setLoading] = useState (true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [user])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }

  return (
      <BrowserRouter>
          <Navbar />
          <AppRouter />
      </BrowserRouter>
  );
});

export default App;
