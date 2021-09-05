import htaccess from '../http-common'

class displayService {
    getCategory(){
        return htaccess().get('/category/all');
    }

    getScreen(){
        return htaccess().get('/screens/all');
    }

    getMovie(){
        return htaccess().get('/movie/all');
    }

    getMovieByCategory(catid){
        return htaccess().get('/movie/cat/'+catid);
    }
}

export default new displayService();