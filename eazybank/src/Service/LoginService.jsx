
import axios from 'axios';

class LoginService {
    validateLoginDetails(user) {
        return axios.post('/api/login', user, { withCredentials: true });
    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new LoginService();
