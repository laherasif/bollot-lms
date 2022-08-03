
import {
    ADD_ZYBOOKS_INPUTS,
    DELET_ZYBOOKS_COURSE,
    ADD_INSTRUCTOR_CONTENT,
    DEL_INSTRUCTOR,
    ZYBOOKS_STEP,
    CLEAR_ZYBOOKS_STATE,
    ADD_SECTIONS_VALUES,
    ADD_SECTIONS_FORM_INPUT_VALUES,
    ADD_MORE_QUESTION_ANSWER,
    DEL_QUESTION_ANSWERS,
    INSE_AND_DESC_MULTI_OPTION

} from '../../types/types'


export const addZybookCourseInput = ({ name, value }) => dispatch => {

    dispatch({
        type: ADD_ZYBOOKS_INPUTS,
        payload: { name, value }
    })


}


export const deleteZybookCourse = (id, name) => dispatch => {

    dispatch({
        type: DELET_ZYBOOKS_COURSE,
        payload: { id, name }
    })

}

export const addMoreInstructor = (name) => dispatch => {

    dispatch({
        type: ADD_ZYBOOKS_INPUTS,
        payload: { name }
    })

}



export const addInstructorContent = ({ name, index, value }) => dispatch => {
    dispatch({
        type: ADD_INSTRUCTOR_CONTENT,
        payload: { name, index, value }
    })

}

export const delInstructor = (index) => dispatch => {

    dispatch({
        type: DEL_INSTRUCTOR,
        payload: index
    })

}

export const saveStep = (step) => dispatch => {

    dispatch({
        type: ZYBOOKS_STEP,
        payload: step
    })

}


export const ClearStates = () => dispatch => {
    dispatch({
        type: CLEAR_ZYBOOKS_STATE,

    })
}


// zybooks class create actions

export const addSectionsValues = ({ name, values }) => dispatch => {
    
        dispatch({
            type: ADD_SECTIONS_FORM_INPUT_VALUES,
            payload: { name, values }
        })
    
}


// text create 


export const createText = () => dispatch => {

    let name = "text"
    let value = ""

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, value }
    })

}


// table create 


export const createTable = () => dispatch => {

    let name = "table"
    let value = ""

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, value }
    })


}

// code editor

export const createCodeEditor = () => dispatch => {
    let name = "code"
    let value = {
        title: '',
        language: '',
        instruction: '', 
        code :''
    }

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, value }
    })

}


// multiple choice

export const createMultipleChoice = () => dispatch => {
    let name = "multiple"
    let value = {
        title: '',
        instruction: '',
        questions: [
            {
                question: '',
                choice: '',
                choiceDesc: '',
                checkOption: '0',
                options: [
                    "", "", "", ""
                ]
            }
        ]
    }

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, value }
    })

}

// short question


export const createShortQuestion = () => dispatch => {
    let name = "short"
    let value = {
        title: '',
        instruction: '',
        questions: [
            {
                question: '',
                correct: '',
                incorrect: '',
                answers: [""]
            }
        ]
    }

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, value }
    })
}


export const addQuestionsAnswers = (name, values) => dispatch => {
    debugger
    if (name === "question") {
        let value = {
            question: '',
            choice: '',
            choiceDesc: '',
            options: ["", "", "", ""]

        }
        dispatch({
            type: ADD_MORE_QUESTION_ANSWER,
            payload: { name, value }
        })
    }
    else if (name === "short_question") {
        let value = {
            question: '',
            correct: '',
            incorect: '',
            answers: [""]

        }
        dispatch({
            type: ADD_MORE_QUESTION_ANSWER,
            payload: { name, value }
        })
    }
    else if (name === "short_answer") {
        let value = ""
        let { pIndex, cIndex } = values
        dispatch({
            type: ADD_MORE_QUESTION_ANSWER,
            payload: { name, value, pIndex, cIndex }
        })
    }
}

// image

export const createImage = () => dispatch => {
    let name = "images"
    let value = {
        title: '',
        file: ''
    }

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, value }
    })
}

// video


export const createVideo = () => dispatch => {
    let name = "videos"
    let value = {
        title: '',
        url: ''
    }

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, value }
    })
}

// codes


export const createCodes = () => dispatch => {
    let name = "codes"
    let value = ""

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, value }
    })
}


// delet sections using types

export const deleQuestionAnwser = (name, value) => dispatch => {
    dispatch({
        type: DEL_QUESTION_ANSWERS,
        payload: { name, value }
    })
}


// increse and descrese multiple options
export const IncDescOptions = (type, pIndex, cIndex) => dispatch => {

    let value = {
        pIndex: pIndex,
        cIndex: cIndex
    }
    dispatch({
        type: INSE_AND_DESC_MULTI_OPTION,
        payload: { type, value }
    })
}

