import axios from 'axios'

function htaccess(baseURL = "http://localhost:5000/api/",headers = {"Content-type" : "application/json"}){
    return axios.create({
        baseURL: baseURL,
        headers: headers
    })
}

export default htaccess;