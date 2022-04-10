
import { LOGIN_USER, ERROR, REGISTER_SOCIAL_MEDIA , SIGNUP_USER , OPT_VERIFY, CLEAN_STATE} from '../../types/types'
import { Dispatch } from 'redux';
import instance from '../../../confiq/axios/instance'

// export enum ActionType {
//     REGISTER_SOCIAL_MEDIA = 'REGISTER_SOCIAL_MEDIA',
//     GET_POST_COMMENTS_SUCCESS = 'GET_POST_COMMENTS_SUCCESS',
//     GET_POST_COMMENTS_FAIL = 'GET_POST_COMMENTS_FAIL'
// }


// interface actionMedia {
//     type: ActionType.REGISTER_SOCIAL_MEDIA;
//     payload: [];
// }



export const SignUp = (data:object) => async (dispatch: any) => {
    try {
        dispatch({
            type: SIGNUP_USER,
            payload: data
        })
    } catch (error) {

    }
}


export const OtpVarif = (data:boolean) => async (dispatch: any) => {
    try {
        dispatch({
            type: OPT_VERIFY,
            payload: data
        })
    } catch (error) {

    }
}

export const CleanState = () => async (dispatch: any) => {
    try {
        dispatch({
            type: CLEAN_STATE,
            payload: ""
        })
    } catch (error) {

    }
}

// Register User 
export const SocialRegMedia = (providerData: [], role: string) => async (dispatch: any) => {
    try {
        let object = Object.assign({}, ...providerData)

        let fb = {
            fullname : object.displayName,
            email: object.email,
            fb_user_id: object.uid,
            image: object.photoURL,
            role: role
        }
        let google = {
            fullname : object.displayName,
            email: object.email,
            google_user_id: object.uid,
            image: object.photoURL,
            role: role
        }


        let res = await instance.post('api//social-signin', object.providerId === "facebook.com" ? fb : google)
        dispatch({
            type: REGISTER_SOCIAL_MEDIA,
            payload: res.data
        })
    }
    catch (err) {
       dispatch({
           type : ERROR,
           payload :err
       })
    } 
}


// Login User 

interface actionSuccess {
    type: "LOGIN_USER" | "ERROR";
    payload: [];
}


export const loginUser = (data: []) => {
    return async (dispatch: Dispatch<actionSuccess>) => {
        try {

                dispatch({
                    type: LOGIN_USER,
                    payload: data
                })

        }
        catch (err) {
            console.log("error in token ")
        }
    }
}