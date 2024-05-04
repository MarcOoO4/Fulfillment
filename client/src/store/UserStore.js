import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._isAdmin = false
        this._users = []
        const storedIsAdmin = localStorage.getItem('isAdmin');
        if (storedIsAdmin) {
            this._isAdmin = JSON.parse(storedIsAdmin);
        }
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }
    setIsAdmin(bool) {
        this._isAdmin = bool
        localStorage.setItem('isAdmin', JSON.stringify(bool));
    }

    setUsers(users) {
        this._users = users;
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get isAdmin() {
        return this._isAdmin
    }

    get users() {
        return this._users
    }
}