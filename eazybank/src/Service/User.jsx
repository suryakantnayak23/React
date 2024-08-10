class User {
    constructor(email = '', password = '', authStatus = '') {
        this.email = email;
        this.password = password;
        this.authStatus = authStatus;
    }
}

export default User;
