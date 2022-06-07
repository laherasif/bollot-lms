import { NextComponentType } from "next";
import { useSelector, RootStateOrAny } from "react-redux";
import Login from '../../../pages/[language]/login'
import { useRouter } from "next/router";

function withAuth<T>(Component: NextComponentType<T>) {

    const Auth = (props: T) => {
        const router = useRouter();
        const { User , } = useSelector((state: RootStateOrAny) => state.userReducer)
        
        if (!User) {
            router.push('/en/login')
        }
        // else if (User && User.role === "student") {
        //     router.push('/en/student/dashboard')
        // }
        // else if (User && User.role === "instructor") {
        //     router.push('/en/instructor')

        // }
        return <Component {...props} />
    };

    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps;
    }

    return Auth;
}

export default withAuth;