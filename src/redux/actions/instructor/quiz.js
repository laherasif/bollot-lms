
import {
    ADD_QUIZ_QUESTION_INPUT,
    ADD_QUIZ_OPTION_INPUT,
    QUIZ_OPTION_RADIO,
    ADD_MORE_QUIZ,
    ADD_MORE_OPTION,
    DEL_QUESTION,
    DEL_OPTIONS,


} from '../../types/types'

export const addQuestionInput = ({ name, value, index }) => dispatch => {
    
    dispatch({
        type: ADD_QUIZ_QUESTION_INPUT,
        payload: { name, value, index }
    })

}


export const addOptionInput = ({ name, value, index , i }) => dispatch => {
    
    dispatch({
        type: ADD_QUIZ_OPTION_INPUT,
        payload: { name, value, index  , i }
    })

}

export const addOptionRadio = ({ name ,  index , i }) => dispatch => {
    
    dispatch({
        type: QUIZ_OPTION_RADIO,
        payload: {name ,  index  , i }
    })

}



export const addMoreQuiz = () => dispatch => {
    
    let data = {
        question: '',
        options: [
            { option: "", correct: false, },
            { option: "", correct: false, },
            { option: "", correct: false, },
            { option: "", correct: false, },

        ]
    }
    dispatch({
        type: ADD_MORE_QUIZ,
        payload: data
    })

}



export const addMoreOption = (index) => dispatch => {
    
    let data = { option: "", correct: false, }

    dispatch({
        type: ADD_MORE_OPTION,
        payload: { data, index }
    })

}


export const delQuiz = (index) => dispatch => {
    
    dispatch({
        type: DEL_QUESTION,
        payload: index
    })

}

export const delQuizOption = ({ index, i }) => dispatch => {
    
    dispatch({
        type: DEL_OPTIONS,
        payload: { index, i }
    })

}

