import htaccess from '../http-common'

class adminService {
    addCategory(CatObj){
        return htaccess().post('/category/add',CatObj);
    }

    addScreen(screenObj){
        return htaccess().post('/screens/add',screenObj);
    }

    addMovie(MovieObj){
        return htaccess().post('/movies/add',MovieObj);
    }

    updateCategory(CatId,CatObj){
        return htaccess().post('/category/update/' + CatId,CatObj);
    }

    updateScreen(screenId,screenObj){
        return htaccess().post('/screens/update/' + screenId,screenObj);
    }

    updateMovie(movieId,movieObj){
        return htaccess().post('/movies/update/' + movieId,movieObj);
    }

    deleteCategory(CatId){
        return htaccess().delete('/category/delete/' + CatId);
    }

    deleteScreen(screenId){
        return htaccess().delete('/screens/delete/' + screenId);
    }

    deleteMovie(movieId){
        return htaccess().delete('/movies/delete/' + movieId);
    }

    editCategory(CatId){
        return htaccess().get('/category/edit/' + CatId);
    }

    editScreen(screenId){
        return htaccess().get('/screens/edit/' + screenId);
    }

    editMovie(movieId){
        return htaccess().get('/movies/edit/' + movieId);
    }

    updateMoviePrice(movieId,price_details){
        return htaccess().post('/movies/update/price/'+movieId,price_details);
    }

    addMoviePrice(movieId,price_details){
        return htaccess().post('/movies/add/price/'+movieId,price_details);
    }
}

export default new adminService();