import moment from "moment";
import {
    ADD_ZYBOOKS_INPUTS,
    CLEAR_ZYBOOKS_STATE,
    DELET_ZYBOOKS_COURSE,
    ADD_INSTRUCTOR_CONTENT,
    DEL_INSTRUCTOR,
    // CLEAR_SECTION_STATE
    // ADD_ZYBOOKS_COURSE
} from "../../types/types";


const initialState = {
    firtCourse: {},
    courses: [],
    instructors: [],
    class_number: "",
    name: "",
    institution: "",
    start_date: "",
    end_date: "",
    expected_students: "",
    cause_usage: "",
    office_phone: "",
    mobile_phone: "",
    additional_comments: "",
    step: [],

};

const AddZyBooksReducer = (state = initialState, action) => {
    switch (action.type) {



        case ADD_ZYBOOKS_INPUTS:
            
            if (action.payload.name === "courses") {

                let list = state.courses
                let index = list.find(el => el.id == action.payload.value.id);

                if (index) {
                    return state
                }
                else {
                    return {
                        ...state,
                        courses: [...list, action.payload.value]
                    }
                }
            }
            else if (action.payload.name === "firstcourses") {
                let list = state.firtCourse
                if (Object.keys(list).length) {

                    return {
                        ...state,
                        firtCourse: [],

                    }

                }
                else {
                    return {
                        ...state,
                        firtCourse: action.payload.value

                    }
                }
            }
            else if (action.payload.name === "instructors") {
                let list = state.instructors
                return {
                    ...state,
                    instructors: [...list, { firstName: '', lastName: '', email: ' ' }]

                }
            }
            else if (action.payload.name === "start_date" || action.payload.name === "end_date") {
                return {
                    ...state,
                    [action.payload.name]: moment(action.payload.value).format('YYYY-MM-DD')

                }
            }

            else {

                return {

                    ...state,
                    [action.payload.name]: action.payload.value,


                }
            }

        case DELET_ZYBOOKS_COURSE:
            debugger
            if (action.payload.name === "firstCourse") {
                return {
                    ...state,
                    firtCourse: {}
                }
            }
            else {
                let findIndex = state.courses.filter((item) => item.id !== action.payload.id.id)
                return {
                    ...state,
                    courses: findIndex
                }
            }





        case ADD_INSTRUCTOR_CONTENT:

            let list = state.instructors
            list[action.payload.index][action.payload.name] = action.payload.value
            return {
                ...state,
                instructors: list
            }




        case DEL_INSTRUCTOR:

            let lists = state.instructors
            lists.splice(action.payload.index, 1)
            return {
                ...state,
                instructors: lists
            }



        case CLEAR_ZYBOOKS_STATE:

            return {
                ...state,
                courses: [],
                firtCourse :{},
                instructors: [],
                class_number: "",
                name: "",
                institution: "",
                start_date: "",
                end_date: "",
                expected_students: "",
                cause_usage: "",
                office_phone: "",
                mobile_phone: "",
                additional_comments: ""
            }

         



        default: {
            return state;
        }
    }
};

export default AddZyBooksReducer;
