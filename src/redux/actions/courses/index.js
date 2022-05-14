

import {
    LOADING,
    GET_CATAGORY, GET_LATEST,
    GET_FILTER_PRICE,
    GET_SORTED_COURSE,
    GET_BY_CATAGORY_FEATURE,
    GET_BY_CATAGORY,
    GET_FETAURE,
    GET_ALL_COURSES,
    GET_SEARCH_COURSE,
    DELETE_CART,
    GET_BY_CATAGORY_COURSE,
    LIVE_COURSE,
    GET_COURSE_INPUTS,
    GET_COURSE_INPUTS_MORE,
    ADD_COURSE_INPUTS_MORE,
    GET_COURSE_CRICULUM,

} from '../../types/types'
import instance from '../../../confiq/axios/instance'
import axios from 'axios'




export const Loading = (data) => dispatch  => {
    debugger
    dispatch({
        type:LOADING ,
        payload : data
    })
}


 


export const getCourseInput = ({name , value} ) => async (dispatch) => {
    debugger
    dispatch({
        type : GET_COURSE_INPUTS,
        payload : { name , value }
    })
}

export const getCourseAddMore = ({field , index , value } ) => async (dispatch) => {
    debugger
    dispatch({
        type : GET_COURSE_INPUTS_MORE,
        payload : { field , index , value }
    })
}

export const addMoreField = (field  ) => async (dispatch) => {
    debugger
    dispatch({
        type : ADD_COURSE_INPUTS_MORE,
        payload :  field 
    })
}






export const GetCourse = () => async (dispatch) => {

    try {
        let feature = {
            page_no: 1,
            rows_per_page: 10,
            sorting: {
                sort_by: "sales",
                sort_direction: "desc"
            }

        }

        let latest = {
            page_no: 1,
            rows_per_page: 10,
            sorting: {
                sort_by: "id",
                sort_direction: "desc"
            }

        }
        let all = {
            page_no: 1,
            rows_per_page: 10,

        }


        let liveCourse = {
            page_no: 1,
            rows_per_page: 10,
            course_type: "live"
        }


        let AllCourse = await instance.post('api//courses', all)
        dispatch({
            type: GET_ALL_COURSES,
            payload: AllCourse.data.response.courses,
        })

        let res = await instance.get('api//course/categories/all')
        dispatch({
            type: GET_CATAGORY,
            payload: res.data.response.categories
        })
        let featurs = await instance.post('api//courses', feature)

        dispatch({
            type: GET_FETAURE,
            payload: featurs.data.response.courses
        })
        let latests = await instance.post('api//courses', latest)

        dispatch({
            type: GET_LATEST,
            payload: latests.data.response.courses
        })
        let live = await instance.post('api//courses', liveCourse)
        dispatch({
            type: LIVE_COURSE,
            payload: live.data.response.courses
        })



    } catch (error) {

    }

}


export const GetAllCatagory = () => async dispatch => {
    let all = {
        page_no: 1,
        rows_per_page: 10,

    }

    try {
        let res = await instance.post('api//courses', all)
        dispatch({
            type: GET_BY_CATAGORY,
            payload: res.data.response.courses
        })
    } catch (error) {

    }
}



// Register User 
export const GetCatagory = (id, name) => async dispatch => {

    try {
        let catagory = {
            page_no: 1,
            rows_per_page: 10,
            category_id: id

        }
        let res = await instance.post('api//courses', catagory)
        if (name === "getall") {
            dispatch({
                type: GET_BY_CATAGORY,
                payload: res.data.response.courses
            })
        }
        else if (name === "getfet") {
            dispatch({
                type: GET_BY_CATAGORY_FEATURE,
                payload: res.data.response.courses
            })
        }
        else if (name === "getcourseCata") {
            dispatch({
                type: GET_BY_CATAGORY_COURSE,
                payload: res.data.response.courses
            })
        }

    } catch (error) {

    }


}




export const priceFilter = (data) => async dispatch => {

    try {
        let filterPrice = {
            page_no: 1,
            rows_per_page: 10,
            price_range: data

        }
        let res = await instance.post('api//courses', filterPrice)
        dispatch({
            type: GET_FILTER_PRICE,
            payload: res.data.response.courses
        })
    } catch (error) {

    }


}

export const GetSorted = (name) => async dispatch => {
    debugger
    try {

        let filterPrice = {
            page_no: 1,
            rows_per_page: 10,
            sorting: {
                sort_by: name === "low" ? "price" : name === "high" ? "price" : name === "recent" ? "id" : "rating",
                sort_direction: name === "low" ? "asc" : name === "desc" ? "asc" : name === "recent" ? "desc" : "desc"
            }
        }

        let res = await instance.post('api//courses', filterPrice)
        dispatch({
            type: GET_SORTED_COURSE,
            payload: res.data.response.courses
        })
    } catch (error) {

    }


}


export const GetSearchCourse = (name) => async dispatch => {
   debugger
    try {

        let filterPrice = {
            page_no: 1,
            rows_per_page: 10,
            search: name,

        }

        let res = await instance.post('api//courses', filterPrice)
        dispatch({
            type: GET_SEARCH_COURSE,
            payload: res.data.response.courses
        })
    } catch (error) {

    }


}







// Register User 
export const DeleteCart = (id) => async dispatch => {
    try {
        dispatch({
            type: DELETE_CART,
            payload: id
        })
    }
    catch (err) {

    }
}


