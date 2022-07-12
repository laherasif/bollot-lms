import {
    ADD_PRE_QUIZ_QUESTION_INPUT,
    ADD_PRE_QUIZ_OPTION_INPUT,
    QUIZ_PRE_OPTION_RADIO,
    ADD_PRE_MORE_QUIZ,
    ADD_PRE_MORE_OPTION,
    DEL_PRE_QUESTION,
    DEL_PRE_OPTIONS,
    CLEAR_STATE,
    EDIT_PRE_QUIZ
} from "../../types/types";


const initialState = {
    loader: false,
    PreQuiz: [{
        question: '',
        options: [
            { option: "", correct: false, },
            { option: "", correct: false, },
            { option: "", correct: false, },
            { option: "", correct: false, },

        ]

    }]


};

const QuizReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_PRE_MORE_QUIZ:
            return {
                ...state,
                PreQuiz: [...state.PreQuiz, action.payload]
            }

        case ADD_PRE_MORE_OPTION:
            return {
                ...state,
                ...state.PreQuiz.map((item, ind) => {
                    if (ind === action.payload.index) {
                        item.options.push(action.payload.data)
                    }
                    return item
                })

            }

        case ADD_PRE_QUIZ_QUESTION_INPUT:
            debugger
            return {
                ...state,
                ...state.PreQuiz[action.payload.index][action.payload.name] = action.payload.value
            }

        case ADD_PRE_QUIZ_OPTION_INPUT:
            return {
                ...state,
                ...state.PreQuiz.map((item, ind) => (
                    ind === action.payload.index ?
                        item.options[action.payload.i][action.payload.name] = action.payload.value
                        : item
                ))
            }


        case QUIZ_PRE_OPTION_RADIO:
            return {
                ...state,
                ...state.PreQuiz.map((item, ind) => {
                    if (ind === action.payload.index) {
                        for (let b = 0; b < item.options.length; b++) {
                            let elements = item.options[b];
                            if (elements.correct === "1") {
                                elements.correct = "0"
                            }
                            item.options[action.payload.i][action.payload.name] = "1";
                        }
                    }
                })
            }



        case DEL_PRE_QUESTION:
            let findIndex = state.PreQuiz.filter((item, ind) => ind !== action.payload)
            return {
                ...state,
                PreQuiz: findIndex
            }


        case DEL_PRE_OPTIONS:
            return {
                ...state,
                ...state.PreQuiz.map((item, ind) => {
                    if (ind === action.payload.index) {
                        let find = item.options;
                        find.splice(action.payload.i, 1);
                    }
                    return item
                })
            }

        case CLEAR_STATE:
            return {
                ...state,
                PreQuiz: [{
                    question: '',
                    options: [
                        { option: "", correct: false, },
                        { option: "", correct: false, },
                        { option: "", correct: false, },
                        { option: "", correct: false, },

                    ]

                }]
            }

        case EDIT_PRE_QUIZ:
            return {
                ...state,
                PreQuiz: action.payload
            }

        default: {
            return state;
        }
    }
};

export default QuizReducer;
