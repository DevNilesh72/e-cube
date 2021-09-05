import htaccess from "../http-common";

class LoginService {
  login(UsrObj) {
    return htaccess().post("/users/login", UsrObj);
  }

  current(token) {
    return htaccess("http://localhost:5000/api/", {
      "Content-type": "application/json",
      "Authorization": token
    }).get("users/current");
  }
}

export default new LoginService();
