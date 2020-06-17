import { SET_SCREAMS,
         LOADING_DATA, 
         LIKE_SCREAM, 
         UNLIKE_SCREAM, 
         DELETE_SCREAM, 
         SET_ERRORS, 
         CLEAR_ERRORS,
         POST_SCREAM,
         LOADING_UI,
         STOP_LOADING_UI,
         SET_SCREAM,
        SUBMIT_COMMENT} from '../types';
import axios from 'axios';

//Get all screams
export const getScreams = () => (dispatch)=>{
  dispatch({ type: LOADING_DATA});
  axios.get('/screams')
       .then(res => {
         dispatch({
           type: SET_SCREAMS,
           payload: res.data
         })
       })
       .catch(err =>{
         dispatch({
           type: SET_SCREAMS,
           payload: []
         })
       })
}

export const getScream = (screamId) => dispatch =>{
  dispatch({ type: LOADING_UI});
  axios.get(`/scream/${screamId}`)
       .then (res =>{
         dispatch({
           type: SET_SCREAM,
           payload: res.data
         });
         dispatch({ type: STOP_LOADING_UI})
       })
       .catch( err => console.log(err));
}

//Post a scream
export const postScream = (newScream)=> (dispatch) =>{
  dispatch({ type: LOADING_UI});
  axios.post('/scream', newScream)
       .then(res => {
         dispatch({
           type: POST_SCREAM,
           payload: res.data.resScream
         });
         dispatch(clearErrors());
       })
       .catch(err =>{
         dispatch({
           type: SET_ERRORS,
           payload: err.response.data
         })
       })
        
}

//Like a scream
export const likeScream = (screamId) => (dispatch)=>{
  axios.get(`/scream/${screamId}/like`)
       .then(res =>{
         dispatch({
           type: LIKE_SCREAM,
           payload: res.data
         })
       })
       .catch (err=> console.log(err));
}

//Unlike a scream
export const unlikeScream = (screamId) => (dispatch)=>{
  axios.get(`/scream/${screamId}/unlike`)
       .then(res =>{
         dispatch({
           type: UNLIKE_SCREAM,
           payload: res.data
         });
       })
       .catch (err=> console.log(err));
}

//submit comment
export const submitComment = (screamId, commentData) =>(dispatch)=>{
  axios.post(`/scream/${screamId}/comment`, commentData)
       .then(res => {
         console.log(res.data.newComment);
         dispatch({
           type: SUBMIT_COMMENT,
           payload: res.data.newComment
         });
         dispatch(clearErrors());
      })
      .catch(err =>{
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
}

export const deleteScream = (screamId) =>(dispatch) =>{
  axios.delete(`/scream/${screamId}`)
      .then((res) =>{
        let id = res.config.url.split('/scream/')[1];
        dispatch({ 
          type: DELETE_SCREAM, 
          payload: id
        });
      })
      .catch(err => console.log(err));
}

//to open up user profile 
export const getUserData = (userHandle) => dispatch =>{
  dispatch({ type: LOADING_DATA });
  axios.get(`/user/${userHandle}`)
       .then(res =>{
         dispatch({
           type: SET_SCREAMS,
           payload: res.data.screams
         });
       })
       .catch(() => {
         dispatch({
           type: SET_SCREAMS,
           payload: null
         });
       });
}

export const clearErrors = () => dispatch =>{
  dispatch({ type: CLEAR_ERRORS });
}
