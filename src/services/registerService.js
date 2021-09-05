import htaccess from '../http-common'

class RegisterService {
    register(UsrObj){
        return htaccess().post('/users/register',UsrObj);
    }
}

export default new RegisterService();