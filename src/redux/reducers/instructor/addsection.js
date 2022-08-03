import {
    ADD_SECTIONS_VALUES,
    ADD_MORE_QUESTION_ANSWER,
    DEL_QUESTION_ANSWERS,
    INSE_AND_DESC_MULTI_OPTION,
    // ADD_SECTIONS_INPUT_VALUES,
    ADD_SECTIONS_FORM_INPUT_VALUES,

} from "../../types/types";


const initialState = {
    section: [
        {
            title: '',
            text: [],
            table: [],
            code: [],
            multiple: [],
            short: [],
            images: [],
            videos: [],
            codes: []
        }
    ]


};

const AddSectionReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_SECTIONS_FORM_INPUT_VALUES:
            let Action = action.payload.values
  debugger
            return {
                ...state,
                section: state.section?.map((s) => {
                    switch (action.payload.name) {
                        case "title":
                            return {    
                                ...s,
                                [Action.targetName]: Action.value
                            }
                        case "text":
                            return {
                                ...s, text: s.text.map((t, ind) => {
                                    if (ind === Action.i) {
                                        return Action.value

                                    }
                                    else { return t }
                                })
                            }
                        case "table":
                            return { ...s, table: [...s.table, action.payload.value] }
                        case "code":
                            return {
                                ...s, code: s.code.map((t, ind) => {
                                    if (ind === Action.i) {
                                        return {
                                            ...t,
                                            [Action.targetName]: Action.value
                                        }

                                    }
                                    else { return t }
                                })
                            }
                        case "multiple":
                            return {
                                ...s, multiple: s.multiple.map((t, ind) => {
                                    if (ind === Action.index) {
                                        if (Action.targetName === "question" || Action.targetName === "checkOption" || Action.targetName === "choice" || Action.targetName === "choiceDesc") {
                                            return {
                                                ...t,
                                                questions: t.questions.map((q, i) => {
                                                    if (i === Action.i) {
                                                        return {
                                                            ...q,
                                                            [Action.targetName]: Action.targetName === "checkOption" ? Action.ccIndex : Action.value
                                                        }


                                                    }
                                                    else { return q }
                                                })
                                            }
                                        }
                                        else if (Action.targetName === "option") {
                                            return {
                                                ...t,
                                                questions: t.questions.map((q, i) => {
                                                    if (i === Action.i) {
                                                        return {
                                                            ...q,
                                                            options: q.options.map((o, j) => {
                                                                if (j === Action.ccIndex) {
                                                                    return Action.value

                                                                }
                                                                else { return o }
                                                            })
                                                        }

                                                    }
                                                    else { return q }
                                                })
                                            }
                                        }

                                        else {
                                            return {
                                                ...t,
                                                [Action.targetName]: Action.value
                                            }
                                        }

                                    }
                                    else { return t }
                                })
                            }
                        case "short":

                            return {

                                ...s, short: s.short.map((t, ind) => {
                                    if (ind === Action.index) {
                                        if (Action.targetName === "question" || Action.targetName === "correct" || Action.targetName === "incorrect") {
                                            return {
                                                ...t,
                                                questions: t.questions.map((q, i) => {
                                                    if (i === Action.i) {
                                                        return {
                                                            ...q,
                                                            [Action.targetName]: Action.value
                                                        }


                                                    }
                                                    else { return q }
                                                })
                                            }
                                        }
                                        else if (Action.targetName === "answer") {
                                            return {
                                                ...t,
                                                questions: t.questions.map((q, i) => {
                                                    if (i === Action.i) {
                                                        return {
                                                            ...q,
                                                            answers: q.answers.map((o, j) => {
                                                                if (j === Action.ccIndex) {
                                                                    return Action.value

                                                                }
                                                                else { return o }
                                                            })
                                                        }

                                                    }
                                                    else { return q }
                                                })
                                            }
                                        }

                                        else {
                                            return {
                                                ...t,
                                                [Action.targetName]: Action.value
                                            }
                                        }

                                    }
                                    else { return t }
                                })
                            }
                        case "images":
                            return {
                                ...s,
                                images: s.images.map((t, ind) => {
                                    if (ind === Action.i) {
                                        return {
                                            ...t,
                                            [Action.targetName]: Action.value
                                        }
                                    }
                                })
                            }
                        case "videos":
                            return {
                                ...s,
                                videos: s.videos.map((t, ind) => {
                                    if (ind === Action.i) {
                                        return {
                                            ...t,
                                            [Action.targetName]: Action.value
                                        }
                                    }
                                })
                            }
                        case "codes":
                            return { ...s, codes: [...s.codes, action.payload.value] }

                    }
                })
            }

        case ADD_SECTIONS_VALUES:
            debugger
            return {
                ...state,
                section: state.section?.map((s) => {
                    switch (action.payload.name) {
                        case "text":
                            return { ...s, text: [...s.text, action.payload.value] }
                        case "table":
                            return { ...s, table: [...s.table, action.payload.value] }
                        case "code":
                            return { ...s, code: [...s.code, action.payload.value] }
                        case "multiple":
                            return { ...s, multiple: [...s.multiple, action.payload.value] }
                        case "short":
                            return { ...s, short: [...s.short, action.payload.value] }
                        case "images":
                            return { ...s, images: [...s.images, action.payload.value] }
                        case "videos":
                            return { ...s, videos: [...s.videos, action.payload.value] }
                        case "codes":
                            return { ...s, codes: [...s.codes, action.payload.value] }

                    }
                })
            }
        case ADD_MORE_QUESTION_ANSWER:
            debugger
            return {
                ...state,
                section: state.section?.map((s) => {
                    switch (action.payload.name) {

                        case "question":
                            return {
                                ...s, multiple: s.multiple.map((q) => (
                                    { ...q, questions: [...q.questions, action.payload.value] }
                                ))
                            }
                        case "short_question":
                            return {
                                ...s, short: s.short.map((q) => (
                                    { ...q, questions: [...q.questions, action.payload.value] }
                                ))
                            }
                        case "short_answer":
                            return {
                                ...s, short: s.short.map((q, i) => {
                                    if (action.payload.pIndex === i) {
                                        return {
                                            ...q, questions: q.questions.map((ans, ind) => (
                                                ind === action.payload.cIndex ?
                                                    { ...ans, answers: [...ans.answers, action.payload.value] }
                                                    : ans
                                                // )

                                            ))
                                        }
                                    }
                                }
                                )

                            }
                    }
                })
            }

        case DEL_QUESTION_ANSWERS:
            debugger
            return {
                ...state,
                section: state.section?.map((s) => {
                    switch (action.payload.name) {
                        case "text":
                            return {
                                ...s, text: s.text.filter((f, index) => index !== action.payload.value.pIndex)

                            }
                        case "multipl_choice":
                            return {
                                ...s, multiple: s.multiple.filter((f, index) => index !== action.payload.value.pIndex)

                            }
                        case "multipl_question":
                            return {
                                ...s, multiple: s.multiple.map((q, i) => {
                                    if (i === action.payload.value.pIndex) {
                                        return { ...q, questions: q.questions.filter((f, index) => index !== action.payload.value.cIndex) }
                                    }
                                })
                            }
                        case "short":
                            return {
                                ...s, short: s.short.filter((f, index) => index !== action.payload.value.pIndex)

                            }
                        case "code":
                            return {
                                ...s, code: s.code.filter((f, index) => index !== action.payload.value.pIndex)

                            }
                        case "images":
                            return {
                                ...s, images: s.images.filter((f, index) => index !== action.payload.value.pIndex)

                            }
                        case "videos":
                            return {
                                ...s, videos: s.videos.filter((f, index) => index !== action.payload.value.pIndex)

                            }
                        case "codes":
                            return {
                                ...s, codes: s.codes.filter((f, index) => index !== action.payload.value.pIndex)

                            }
                        case "short_question":
                            return {
                                ...s, short: s.short.map((q, i) => {
                                    if (i === action.payload.value.pIndex) {
                                        return { ...q, questions: q.questions.filter((f, index) => index !== action.payload.value.cIndex) }
                                    }
                                }
                                )
                            }
                        case "short_answer":
                            return {
                                ...s, short: s.short.map((q, i) => {
                                    if (action.payload.value.pIndex === i) {
                                        return {
                                            ...q, questions: q.questions.map((ans, ind) => {
                                                if (ind === action.payload.value.cIndex) {
                                                    return {
                                                        ...ans, answers: ans.answers.filter((a, index) => index !== action.payload.value.ansIndex)
                                                    }
                                                }
                                            }

                                            )
                                        }
                                    }
                                }
                                )

                            }
                    }
                })
            }
        case INSE_AND_DESC_MULTI_OPTION:
            return {
                ...state,
                section: state.section?.map((s) => {
                    switch (action.payload.type) {
                        case "inc":
                            return {
                                ...s, multiple: s.multiple.map((q, i) => {
                                    if (action.payload.value.pIndex === i) {
                                        return {
                                            ...q, questions: q.questions.map((op, ind) => {
                                                if (ind === action.payload.value.cIndex) {
                                                    return {
                                                        ...op, options: [...op.options, ""]
                                                    }
                                                }
                                                else {
                                                    return op
                                                }
                                            }

                                            )
                                        }
                                    }
                                }
                                )

                            }
                        case "desc":
                            return {
                                ...s, multiple: s.multiple.map((q, i) => {
                                    if (action.payload.value.pIndex === i) {
                                        return {
                                            ...q, questions: q.questions.map((op, ind) => {
                                                if (ind === action.payload.value.cIndex) {
                                                    return {
                                                        ...op, options: [...op.options].slice(0, -1)
                                                    }
                                                }
                                                else {
                                                    return op
                                                }
                                            }

                                            )
                                        }
                                    }
                                }
                                )

                            }
                    }
                })
            }

        default: {
            return state;
        }
    }
};

export default AddSectionReducer;
