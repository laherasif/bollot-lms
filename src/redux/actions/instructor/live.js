
import {
    ADD_LIVECLASS_INPUT,
    ADD_LIVECLASS_MORE,
    DEL_LIVECLASS,

} from '../../types/types'

export const addLiveInput = ({name , i , date }) => dispatch => {
    dispatch({
        type: ADD_LIVECLASS_INPUT,
        payload: { name, i , date  }
    })

}

export const addMoreLive = () => dispatch => {
    
    let data ={ date: '', from_time: '', to_time: '' }
    dispatch({
        type: ADD_LIVECLASS_MORE,
        payload: data
    })

}




export const delPreview = ( i ) => dispatch => {
    dispatch({
        type: DEL_LIVECLASS,
        payload:  i 
    })

}


