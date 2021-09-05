import htaccess from '../http-common'

class adminService {
    addCategory(CatObj){
        return htaccess().post('/category/add',CatObj);
    }

    addScreen(screenObj){
        return htaccess().post('/screens/add',screenObj);
    }

    addMovie(MovieObj){
        return htaccess().post('/movie/add',MovieObj);
    }

    updateCategory(CatId,CatObj){
        return htaccess().post('/category/update/' + CatId,CatObj);
    }

    updateScreen(screenId,screenObj){
        return htaccess().post('/screens/update/' + screenId,screenObj);
    }

    updateMovie(movieId,movieObj){
        return htaccess().post('/movie/update/' + movieId,movieObj);
    }

    deleteCategory(CatId){
        return htaccess().delete('/category/delete/' + CatId);
    }

    deleteScreen(screenId){
        return htaccess().delete('/screens/delete/' + screenId);
    }

    deleteMovie(movieId){
        return htaccess().delete('/movie/delete/' + movieId);
    }

    editCategory(CatId){
        return htaccess().get('/category/edit/' + CatId);
    }

    editScreen(screenId){
        return htaccess().get('/screens/edit/' + screenId);
    }

    editMovie(movieId){
        return htaccess().get('/movie/edit/' + movieId);
    }
}

export default new adminService();