
import {
    GET_BLOGS, GET_NEWS,
} from '../../types/types'
import instance from '../../../confiq/axios/instance'


// Register User 
export const getBlogs = () => async  dispatch => {

   let res = await instance.get('api//blogs')
    dispatch({
        type: GET_BLOGS,
        payload: res.data.response.blogs
    })

}

export const getNews = () => async  dispatch => {
    debugger
    let res = await instance.get('api//news')
     dispatch({
         type: GET_NEWS,
         payload: res.data.response.news
     })
 
 }
 

