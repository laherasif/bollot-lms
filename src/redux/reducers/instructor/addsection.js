import {
    ADD_SECTIONS_VALUES,
    ADD_MORE_QUESTION_ANSWER,
    DEL_QUESTION_ANSWERS,
    INSE_AND_DESC_MULTI_OPTION,
    // ADD_SECTIONS_INPUT_VALUES,
    ADD_SECTIONS_FORM_INPUT_VALUES,
    CLEAR_SECTION_STATE,
    EDIT_SECTION_LECTURE,
    EDIT_SECTIONS_FORM_INPUT_VALUES,
    EDIT_MORE_QUESTION_ANSWER,
    EDIT_DEL_QUESTION_ANSWERS,
    EDIT_INSE_AND_DESC_MULTI_OPTION,
    EDIT_SECTIONS_VALUES,

} from "../../types/types";


const initialState = {
    section: [

        { name: "title", value: '' },
    ],
    EditSetion: {}


};

const AddSectionReducer = (state = initialState, action) => {
    switch (action.type) {


        case ADD_SECTIONS_VALUES:
            return {
                ...state,
                section: [...state.section, action.payload]
            }
        case ADD_SECTIONS_FORM_INPUT_VALUES:
            let payload = action.payload.values
            return {
                ...state,
                section: state.section.map((item, index) => {
                    if (index === payload.index && item.name === "multiple") {
                        return {
                            ...item,
                            questionValue: item.questionValue.map((qv, i) => {
                                if (i === payload.i && payload.targetName === 'question' || payload.targetName === 'option' || payload.targetName === 'checkOption' || payload.targetName === 'choiceDesc' || payload.targetName === "choice") {

                                    return {
                                        ...qv,
                                        questions: qv.questions.map((q, cIndex) => {
                                            if (payload.targetName === 'option' && cIndex === payload.ccIndex) {
                                                return {
                                                    ...q,
                                                    options: q.options.map((item, cccindex) => {
                                                        if (cccindex === payload.cccIndex) {
                                                            return payload.value
                                                        }
                                                        else {
                                                            return item
                                                        }
                                                    })
                                                }
                                            }

                                            else
                                                if (cIndex === payload.ccIndex) {

                                                    return {
                                                        ...q,
                                                        [payload.targetName]: payload.value
                                                    }
                                                }
                                                else {
                                                    return q
                                                }



                                        })
                                    }

                                }
                                else {

                                    return {
                                        ...qv,
                                        [payload.targetName]: payload.value
                                    }

                                }
                            })
                        }
                    }
                    else if (index === payload.index && item.name === "short") {
                        return {
                            ...item,
                            shortValue: item.shortValue.map((s, index) => {
                                if (index === payload.i && payload.targetName === "question" || payload.targetName === "correct" || payload.targetName === "incorrect" || payload.targetName === "answer") {
                                    return {
                                        ...s,
                                        questions: s.questions.map((q, index) => {
                                            if (payload.targetName === 'answer' && index === payload.ccIndex) {
                                                return {
                                                    ...q,
                                                    answers: q.answers.map((a, index) => {
                                                        if (index === payload.cccIndex) {
                                                            return payload.value
                                                        }
                                                        return a
                                                    })
                                                }
                                            }
                                            else {
                                                return {
                                                    ...q,
                                                    [payload.targetName]: payload.value
                                                }

                                            }
                                        })
                                    }

                                }
                                else {
                                    return {
                                        ...s,
                                        [payload.targetName]: payload.value
                                    }

                                }
                            })
                        }
                    }
                    else if (index === payload.index && item.name === "title") {
                        return {
                            ...item,
                            title: payload.value
                        }
                    }
                    else if (index === payload.index && item.name === "text") {
                        return {
                            ...item,
                            [payload.targetName]: payload.value
                        }
                    }
                    else if (index === payload.index && item.name === "code") {
                        return {
                            ...item,
                            codesValue: { ...item.codesValue, [payload.targetName]: payload.value }
                        }
                    }
                    else if (index === payload.i && item.name === "images") {
                        return {
                            ...item,
                            imageValue: { ...item.imageValue, [payload.targetName]: payload.value }
                        }
                    }
                    else if (index === payload.i && item.name === "videos") {
                        return {
                            ...item,
                            videoValue: {
                                ...item.videoValue, [payload.targetName]: payload.value
                            }
                        }
                    }
                    else if (index === payload.index && item.name === "codes") {
                        return {
                            ...item,
                            codeValue: { ...item.codeValue, [payload.targetName]: payload.value }
                        }
                    }
                    else {
                        return item
                    }
                })
            }


        case ADD_MORE_QUESTION_ANSWER:
            return {
                ...state,
                section: state.section?.map((s, index) => {
                    switch (action.payload.name) {
                        case "question":
                            if (action.payload.values.pIndex === index) {
                                return {
                                    ...s,
                                    questionValue: s.questionValue?.map((q, i) => {
                                        if (i === action.payload.values.cIndex) {
                                            return {
                                                ...q, questions: [...q.questions, action.payload.questionValue]
                                            }
                                        }
                                        else {
                                            return q
                                        }
                                    })


                                }

                            }
                            else {
                                return s
                            }
                        case "short_question":
                            if (action.payload.pIndex === index) {

                                return {
                                    ...s,
                                    shortValue:
                                        s.shortValue.map((q, i) => {
                                            if (action.payload.cIndex === i) {
                                                return {
                                                    ...q, questions: [...q.questions, action.payload.shortValue]
                                                }
                                            }
                                        })
                                }
                            }
                            else {
                                return s
                            }
                        case "short_answer":
                            if (action.payload.pIndex === index) {
                                return {
                                    ...s, shortValue: s.shortValue.map((q, i) => {
                                        if (action.payload.cIndex === i) {
                                            return {
                                                ...q, questions: q.questions.map((ans, ind) => (
                                                    ind === action.payload.ccIndex ?
                                                        { ...ans, answers: [...ans.answers, ""] }
                                                        : ans
                                                    // )

                                                ))
                                            }
                                        }
                                    }
                                    )

                                }
                            }
                            else {
                                return s
                            }
                    }
                })
            }

        case DEL_QUESTION_ANSWERS:
            if (action.payload.value.name === "multiple_question") {
                return {
                    ...state,
                    section: state.section?.map((s, index) => {
                        if (index === action.payload.value.pIndex) {
                            return {
                                ...s,
                                questionValue: s.questionValue?.map((q, i) => {
                                    if (i === action.payload.value.cIndex) {
                                        return {
                                            ...q, questions: q.questions.filter((q, i) => i !== action.payload.value.ccIndex)
                                        }
                                    }
                                    else {
                                        return q
                                    }
                                })
                            }
                        }
                        else {
                            return s
                        }
                    })
                }
            }

            else if (action.payload.value.name === "short_question") {
                return {
                    ...state,
                    section: state.section?.map((s, index) => {
                        if (index === action.payload.value.pIndex) {
                            return {
                                ...s,
                                shortValue: s.shortValue.map((q, i) => {
                                    if (action.payload.value.cIndex === i) {
                                        return {
                                            ...q, questions: q.questions.filter((q, i) => i !== action.payload.value.ccIndex)
                                        }
                                    }
                                })
                            }
                        }
                        else {
                            return s
                        }
                    })
                }
            }
            else if (action.payload.value.name === "short_answer") {
                return {
                    ...state,
                    section: state.section?.map((s, index) => {
                        if (index === action.payload.value.pIndex) {
                            return {
                                ...s, shortValue: s.shortValue.map((q, i) => {
                                    if (action.payload.value.cIndex === i) {
                                        return {
                                            ...q, questions: q.questions.map((ans, ind) => (
                                                ind === action.payload.value.ccIndex ?
                                                    { ...ans, answers: ans.answers.filter((ans, ind) => ind !== action.payload.value.cccIndex) }
                                                    : ans
                                            ))
                                        }
                                    }
                                }
                                )

                            }
                        }
                        else {
                            return s
                        }
                    })
                }
            }

            else {
                return {
                    ...state,
                    section: state.section?.filter((_, i) => i !== action.payload.value.pIndex)
                }

            }
        case INSE_AND_DESC_MULTI_OPTION:
            return {
                ...state,
                section: state.section.map((item, index) => {
                    console.log("first path")
                    if (index === action.payload.value.pIndex && action.payload.type === 'inc') {
                        console.log("second path")
                        return {
                            ...item,
                            questionValue: item.questionValue.map((q, i) => {
                                console.log("tird path")
                                if (i === action.payload.value.cIndex) {
                                    return {
                                        ...q,
                                        questions: q.questions.map((op, ind) => {
                                            console.log("forth path")
                                            if (ind === action.payload.value.ccIndex) {
                                                return {
                                                    ...op, options: [...op.options, ""]
                                                }
                                            }
                                            else {
                                                return op
                                            }
                                        })
                                    }
                                }
                                else {
                                    return q
                                }
                            })
                        }
                    }
                    else if (index === action.payload.value.pIndex && action.payload.type === 'desc') {
                        return {
                            ...item,
                            questionValue: item?.questionValue?.map((qv, index) => {
                                if (index === action.payload.value.cIndex) {
                                    return {
                                        ...qv,
                                        questions: qv.questions.map((op, index) => {
                                            if (index === action.payload.value.ccIndex) {
                                                return {
                                                    ...op, options: [...op.options].slice(0, -1)
                                                }
                                            }
                                            else {
                                                return op
                                            }
                                        })
                                    }
                                }
                                else {
                                    return qv
                                }
                            })
                        }
                    }
                    else {
                        return item
                    }
                })
            }


        case EDIT_SECTION_LECTURE:
            debugger
            return {
                ...state,
                EditSetion: action.payload
            }
        // edit sections

        case EDIT_SECTIONS_VALUES:
            let d = state.EditSetion
            return {
                ...state,
                EditSetion: {
                    ...d,
                    contents: [...d?.contents, action.payload]
                }
            }

        case EDIT_SECTIONS_FORM_INPUT_VALUES:
            let payloads = action.payload.values
            let dz = state.EditSetion
            debugger
            return {
                ...state,
                EditSetion: {
                    ...dz,
                    contents: dz.contents.map((item, index) => {
                        if (index === payloads.index && item.key === "multiple") {
                            if (payloads.targetName === 'question' || payloads.targetName === 'option' || payloads.targetName === 'checkOption' || payloads.targetName === 'choiceDesc' || payloads.targetName === "choice") {
                                let its = item.value
                                return {
                                    ...item,
                                    value: {
                                        ...its,
                                        questions: its.questions.map((s, index) => {

                                            if (payloads.targetName === 'option' && index === payloads.i || payloads.targetName === 'checkOption') {
                                                return {
                                                    ...s,
                                                    options: s.options.map((a, index) => {
                                                        if (index === payloads.ccIndex && payloads.targetName === 'option') {
                                                            a.option = payloads.value
                                                        }
                                                        else if (index === payloads.ccIndex && payloads.targetName === 'checkOption') {
                                                            // a.is_correct = "1"
                                                            for (let b = 0; b < s.options.length; b++) {
                                                                let elements = s.options[b];
                                                                if (elements.is_correct === "1") {
                                                                    elements.is_correct = "0"
                                                                }
                                                                s.is_correct = "1";
                                                            }
                                                        }

                                                        return a

                                                    })

                                                }
                                            }
                                            else if(payloads.targetName === 'question' && index === payloads.i) {
                                                return {
                                                    ...s,
                                                    [payloads.targetName]: payloads.value
                                                }

                                            }
                                            else{
                                                return s
                                            }

                                        })
                                    }
                                }

                            }
                            else {
                             
                                return {
                                    ...item,
                                    value: { ...item.value, [payloads.targetName]: payloads.value }
                                }

                            }
                        }
                        else if (index === payloads.index && item.key === "short") {

                            if (payloads.targetName === "question" || payloads.targetName === "correct" || payloads.targetName === "incorrect_hint" || payloads.targetName === "answer") {
                                let it = item.value
                                return {
                                    ...item,
                                    value: {
                                        ...it,
                                        questions: it.questions.map((s, index) => {
                                            if (payloads.targetName === 'answer' && index === payloads.cccIndex) {
                                                return {
                                                    ...s,
                                                    answers: s.answers.map((a, index) => {
                                                        if (index === payloads.ccIndex) {
                                                            a.option = payloads.value
                                                        }
                                                        return a
                                                    })

                                                }
                                            }
                                            else {
                                                return {
                                                    ...s,
                                                    [payloads.targetName]: payloads.value
                                                }

                                            }

                                        })
                                    }
                                }
                            }
                            else {
                                return {
                                    ...item,
                                    value: { ...item.value, [payloads.targetName]: payloads.value }
                                }
                            }
                        }
                        else if (index === payloads.index && item.key === "title") {
                            return {
                                ...item,
                                value: payloads.value
                            }
                        }
                        else if (index === payloads.index && item.key === "text") {
                            return {
                                ...item,
                                [payloads.targetName]: payloads.value
                            }
                        }
                        else if (index === payloads.index && item.key === "code") {
                            return {
                                ...item,
                                value: { ...item.value, [payloads.targetName]: payloads.value }
                            }
                        }
                        else if (index === payloads.i && item.key === "images") {
                            return {
                                ...item,
                                [payloads.targetName]: payloads.value
                            }
                        }
                        else if (index === payloads.i && item.key === "videos") {
                            return {
                                ...item,
                                [payloads.targetName]: payloads.value
                            }
                        }
                        else if (index === payloads.index && item.key === "codes") {
                            return {
                                ...item,
                                value: { ...item.value, [payloads.targetName]: payloads.value }
                            }
                        }
                        else {
                            return item
                        }
                    })
                }
            }


        case EDIT_MORE_QUESTION_ANSWER:
            let ad = state.EditSetion
            debugger
            return {
                ...state,
                EditSetion: {
                    ...ad,
                    contents: ad.contents.map((item, index) => {
                        let adItm = item.value
                        switch (action.payload.key) {
                            case "question":
                                if (action.payload.values.pIndex === index) {
                                    return {
                                        ...item,
                                        value: {
                                            ...adItm,
                                            questions: [...adItm.questions, action.payload.questionValue]


                                        }

                                    }
                                }
                                else {
                                    return item
                                }
                            case "short_question":
                                if (action.payload.pIndex === index) {
                                    return {
                                        ...item,
                                        value: {
                                            ...adItm,
                                            questions: [...adItm.questions, action.payload.shortValue]


                                        }

                                    }
                                }
                                else {
                                    return item
                                }
                            case "short_answer":
                                if (action.payload.pIndex === index) {
                                    return {
                                        ...item,
                                        value: {
                                            ...adItm,
                                            questions: adItm.questions.map((ans, ind) => (
                                                ind === action.payload.ccIndex ?
                                                    { ...ans, answers: [...ans.answers, { option: '' }] }
                                                    : ans
                                                // )

                                            ))
                                        }
                                    }
                                }

                                else {
                                    return item
                                }
                        }
                    })
                }
            }

        case EDIT_DEL_QUESTION_ANSWERS:
            if (action.payload.value.name === "multiple_question") {
                let ad = state.EditSetion
                return {
                    ...state,
                    EditSetion: {
                        ...ad,
                        contents: ad.contents.map((item, index) => {
                            let delItm = item.value
                            if (index === action.payload.value.pIndex) {
                                return {
                                    ...item,
                                    value: {
                                        ...delItm,
                                        questions: delItm.questions.filter((q, i) => i !== action.payload.value.ccIndex)
                                    }
                                }
                            }
                            else {
                                return item
                            }
                        })
                    }
                }
            }

            else if (action.payload.value.name === "short_question") {
                let ad = state.EditSetion

                return {
                    ...state,
                    EditSetion: {
                        ...ad,
                        contents: ad.contents.map((item, index) => {
                            let delItm = item.value
                            if (index === action.payload.value.pIndex) {
                                return {
                                    ...item,
                                    value: {
                                        ...delItm,
                                        questions: delItm.questions.filter((q, i) => i !== action.payload.value.ccIndex)
                                    }
                                }
                            }
                            else {
                                return item
                            }
                        })
                    }
                }
            }
            else if (action.payload.value.name === "short_answer") {
                let ad = state.EditSetion

                return {
                    ...state,
                    EditSetion: {
                        ...ad,
                        contents: ad.contents.map((item, index) => {
                            let delItm = item.value
                            if (index === action.payload.value.pIndex) {
                                return {
                                    ...item,
                                    value: {
                                        ...delItm,
                                        questions: delItm.questions.map((ans, ind) => (
                                            ind === action.payload.value.ccIndex ?
                                                { ...ans, answers: ans.answers.filter((ans, ind) => ind !== action.payload.value.cccIndex) }
                                                : ans
                                        ))
                                    }
                                }
                                // return {
                                //     ...s, shortValue: s.shortValue.map((q, i) => {
                                //         if (action.payload.value.cIndex === i) {
                                //             return {
                                //                 ...q, questions: q.questions.map((ans, ind) => (
                                //                     ind === action.payload.value.ccIndex ?
                                //                         { ...ans, answers: ans.answers.filter((ans, ind) => ind !== action.payload.value.cccIndex) }
                                //                         : ans
                                //                 ))
                                //             }
                                //         }
                                //     }
                                //     )

                                // }
                            }
                            else {
                                return s
                            }
                        })
                    }
                }
            }

            else {
                let ad = state.EditSetion
                return {
                    ...state,
                    EditSetion: {
                        ...ad,
                        contents: ad.contents.filter((_, i) => i !== action.payload.value.pIndex)
                    }
                    // return {
                    //     ...state,
                    //     EditSetion: state.EditSetion?.filter((_, i) => i !== action.payload.value.pIndex)
                    // }

                }
            }
        case EDIT_INSE_AND_DESC_MULTI_OPTION:
            let dzs = state.EditSetion
            debugger
            return {
                ...state,
                EditSetion: {
                    ...dzs,
                    contents: dzs.contents.map((item, index) => {
                        let its = item.value
                        if (index === action.payload.value.pIndex && action.payload.type === 'inc') {
                            return {
                                ...item,
                                value: {
                                    ...its,
                                    questions: its.questions.map((op, ind) => {
                                        if (ind === action.payload.value.ccIndex) {
                                            return {
                                                ...op, options: [...op.options, { option: '', is_correct: '' }]
                                            }
                                        }
                                        else {
                                            return op
                                        }
                                    })
                                }

                            }
                        }
                        else if (index === action.payload.value.pIndex && action.payload.type === 'desc') {
                            return {
                                ...item,
                                value: {
                                    ...its,
                                    questions: its.questions.map((op, index) => {
                                        if (index === action.payload.value.ccIndex) {
                                            return {
                                                ...op, options: [...op.options].slice(0, -1)
                                            }
                                        }
                                        else {
                                            return op
                                        }
                                    })
                                }

                            }
                        }
                        else {
                            return item
                        }

                    })
                }
            }





        case CLEAR_SECTION_STATE:
            return {
                ...state,
                section: [{ name: "title", value: "" }]
            }



        default: {
            return state;
        }
    }
};

export default AddSectionReducer;
