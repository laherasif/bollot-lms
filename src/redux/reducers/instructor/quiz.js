import {
    ADD_QUIZ_QUESTION_INPUT,
    ADD_QUIZ_OPTION_INPUT,
    QUIZ_OPTION_RADIO,
    ADD_MORE_QUIZ,
    ADD_MORE_OPTION,
    DEL_QUESTION,
    DEL_OPTIONS,
    CLEAR_STATE,
    EDIT_QUIZ,
} from "../../types/types";


const initialState = {
    loader: false,
    Quiz: [{
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

        case ADD_MORE_QUIZ:
            return {
                ...state,
                Quiz: [...state.Quiz, action.payload]
            }

        case ADD_MORE_OPTION:
            return {
                ...state,
                ...state.Quiz.map((item, ind) => {
                    if (ind === action.payload.index) {
                        item.options.push(action.payload.data)
                    }
                    return item
                })

            }

        case ADD_QUIZ_QUESTION_INPUT:
            return {
                ...state,
                ...state.Quiz[action.payload.index][action.payload.name] = action.payload.value
            }

        case ADD_QUIZ_OPTION_INPUT:
            return {
                ...state,
                ...state.Quiz.map((item, ind) => (
                    ind === action.payload.index ?
                        item.options[action.payload.i][action.payload.name] = action.payload.value
                        : item
                ))
            }


        case QUIZ_OPTION_RADIO:
            return {
                ...state,
                ...state.Quiz.map((item, ind) => {
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



        case DEL_QUESTION:
            let findIndex = state.Quiz.filter((item, ind) => ind !== action.payload)
            return {
                ...state,
                Quiz: findIndex
            }


        case DEL_OPTIONS:
            return {
                ...state,
                ...state.Quiz.map((item, ind) => {
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
                Quiz: [{
                    question: '',
                    options: [
                        { option: "", correct: false, },
                        { option: "", correct: false, },
                        { option: "", correct: false, },
                        { option: "", correct: false, },
            
                    ]
            
                }]
            }

            case EDIT_QUIZ:
            return {
                ...state,
                Quiz: action.payload
            }

        default: {
            return state;
        }
    }
};

export default QuizReducer;
