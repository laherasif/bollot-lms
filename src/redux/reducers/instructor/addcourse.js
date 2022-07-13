import {
    ADD_COURSE_INPUTS,
    ADD_COURSE_CONTENT_MORE,
    ADD_COURSE_CONTENT,
    DEL_COURSE_CONTENT,
    CLEAR_STATE,
    COURSE_ID,
    PAGE_NO,
    EDIT_ADD_COURSE,
} from "../../types/types";


const initialState = {
    loader: false,
    page: 0,
    courseId: '',
    AddCourse: {
        instructor_id: '',
        category_id: '',
        language_id : '',
        title: '',
        short_desc: '',
        long_desc: '',
        price: '',
        discounted_price: '',
        cover_image: '',
    },
    course_for: [''],
    requirements: [''],
    outcomes: [''],


};

const AddCourseReducer = (state = initialState, action) => {
    switch (action.type) {


        case PAGE_NO:

            return {
                ...state,
                page: action.payload

            }


        case COURSE_ID:

            return {
                ...state,
                courseId: action.payload

            }
        case ADD_COURSE_CONTENT_MORE:

            if (action.payload === "outcoms") {
                let list = state.outcomes
                return {
                    ...state,
                    outcomes: [...list, ""]

                }
            }
            else if (action.payload === "request") {
                let lists = state.requirements

                return {
                    ...state,
                    requirements: [...lists, ""]

                }
            }
            else {
                let list = state.course_for
                return {

                    ...state,
                    course_for: [...list, ""]


                }
            }




        case ADD_COURSE_INPUTS: {

            let course = state.AddCourse
            debugger
            return {
                ...state,
                AddCourse: { ...course, [action.payload.name]: action.payload.value },

            }
        }

        // case ADD_IMAGE_URL:
        //     let courses = state.AddCourse
        //     return {
        //         ...state,
        //         AddCourse: { ...courses, [action.payload.name]: action.payload.value }

        //     }


        case ADD_COURSE_CONTENT:

            if (action.payload.field === "outcoms") {
                let list = state.outcomes
                list[action.payload.index] = action.payload.value
                return {
                    ...state,
                    outcomes: list
                }

            }
            else if (action.payload.field === "request") {
                let list = state.requirements
                list[action.payload.index] = action.payload.value
                return {
                    ...state,
                    requirements: list
                }
            }
            else {
                let list = state.course_for
                list[action.payload.index] = action.payload.value
                return {
                    ...state,
                    course_for: list
                }
            }


        case DEL_COURSE_CONTENT:

            if (action.payload.field === "outcoms") {
                let list = state.outcomes
                list.splice(action.payload.index, 1)
                return {
                    ...state,
                    outcomes: list
                }

            }
            else if (action.payload.field === "request") {
                let list = state.requirements
                list.splice(action.payload.index, 1)
                return {
                    ...state,
                    requirements: list
                }
            }
            else {
                let list = state.course_for
                list.splice(action.payload.index, 1)
                return {
                    ...state,
                    course_for: list
                }
            }

        case EDIT_ADD_COURSE:
            let course = state.AddCourse
            return {
                ...state,
                AddCourse: { ...action.payload },
                AddCourse: { ...course, instructor_id: action.payload.instructor.id },
                course_for: action.payload.course_for || [''],
                requirements: action.payload.requirements || [''],
                outcomes: action.payload.outcomes || [''],
            }

        case CLEAR_STATE:

            return {
                ...state,
                courseId: '',
                AddCourse: {
                    instructor_id: '',
                    category_id: '',
                    language_id : '',
                    title: '',
                    short_desc: '',
                    long_desc: '',
                    price: '',
                    discounted_price: '',
                    cover_image: '',
                },
                course_for: [''],
                requirements: [''],
                outcomes: [''],
            }



        default: {
            return state;
        }
    }
};

export default AddCourseReducer;
