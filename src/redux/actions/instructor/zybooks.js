
import {
    ADD_ZYBOOKS_INPUTS,
    DELET_ZYBOOKS_COURSE,
    ADD_INSTRUCTOR_CONTENT,
    DEL_INSTRUCTOR,
    ZYBOOKS_STEP,
    CLEAR_ZYBOOKS_STATE,
    ADD_SECTIONS_VALUES,
    // ADD_SECTIONS_VALUES,
    ADD_MORE_QUESTION_ANSWER,
    ADD_SECTIONS_FORM_INPUT_VALUES,
    DEL_QUESTION_ANSWERS,
    INSE_AND_DESC_MULTI_OPTION,
    CLEAR_SECTION_STATE

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
    let textValue = ""

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, textValue }
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
    let codesValue = {
        title: '',
        language: '',
        instruction: '',
        code: ''
    }

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, codesValue }
    })

}


// multiple choice

export const createMultipleChoice = () => dispatch => {
    let name = "multiple"
    let questionValue = [{
        title: '',
        instruction: '',
        questions: [
            {
                question: '',
                choice: 0,
                choiceDesc: '',
                checkOption: '',
                options: [
                   "" , "" , "" , ""
                ]
            }
        ]
    }]

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, questionValue }
    })

}

// short question


export const createShortQuestion = () => dispatch => {
    let name = "short"
    let shortValue = [{
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
    }]

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, shortValue }
    })
}


export const addQuestionsAnswers = (name, values) => dispatch => {
    
    if (name === "question") {
        let questionValue = {
            question: '',
            choice: 0,
            choiceDesc: '',
            checkOption: '',
            options: [
                "", "", "", ""
            ]
        }
        dispatch({
            type: ADD_MORE_QUESTION_ANSWER,
            payload: { name, questionValue, values }
        })
    }
    else if (name === "short_question") {
        let shortValue = {
            question: '',
            correct: '',
            incorrect: '',
            answers: [""]
        }
        let { pIndex, cIndex } = values
        dispatch({
            type: ADD_MORE_QUESTION_ANSWER,
            payload: { name, shortValue , pIndex ,cIndex}
        })
    }
    else if (name === "short_answer") {
        let answerValue = ""
        let { pIndex, cIndex , ccIndex} = values
        dispatch({
            type: ADD_MORE_QUESTION_ANSWER,
            payload: { name, answerValue, pIndex, cIndex , ccIndex }
        })
    }
}

// image

export const createImage = () => dispatch => {
    let name = "images"
    let imageValue = {
        title: '',
        file: ''
    }

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, imageValue }
    })
}

// video


export const createVideo = () => dispatch => {
    let name = "videos"
    let videoValue = {
        title: '',
        url: ''
    }

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, videoValue }
    })
}

// codes


export const createCodes = () => dispatch => {
    let name = "codes"
    let codeValue = {
        title: '',
        language: '',
        instruction: '',
        code: ''
    }

    dispatch({
        type: ADD_SECTIONS_VALUES,
        payload: { name, codeValue }
    })
}


// delet sections using types

export const deleQuestionAnwser = (value) => dispatch => {
   
    dispatch({
        type: DEL_QUESTION_ANSWERS,
        payload: {value}
    })
}


// increse and descrese multiple options
export const IncDescOptions = (type, pIndex, cIndex , ccIndex) => dispatch => {

    let value = {
        pIndex: pIndex,
        cIndex: cIndex,
        ccIndex : ccIndex,
        name: "mutiple"
    }
    dispatch({
        type: INSE_AND_DESC_MULTI_OPTION,
        payload: { type, value }
    })
}


// clear states

export const sectionClear = () => dispatch => {

    dispatch({
        type: CLEAR_SECTION_STATE
    })

}
