import htaccess from '../http-common'

class displayService {
    getCategory(){
        return htaccess().get('/category/all');
    }

    getScreen(){
        return htaccess().get('/screens/all');
    }

    getMovie(){
        return htaccess().get('/movies/all');
    }

    getMovieByCategory(catid){
        return htaccess().get('/movies/cat/'+catid);
    }

    getMovieScreen(Mid){
        return htaccess().get('/movies/screen/'+Mid);
    }

    getOneMovie(movieId){
        return htaccess().get('/movies/one/'+movieId);
    }

    getMovieBooking(movieID,screenID){
        return htaccess().get('/movies/book/one/'+movieID+'/'+screenID);
    }
}

export default new displayService();