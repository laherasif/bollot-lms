import { NextComponentType } from "next";
import { useSelector, RootStateOrAny } from "react-redux";
import { useRouter } from "next/router";

function AdminAuth<T>(Component: NextComponentType<T>) {
    const Auth = (props: T) => {
        const router = useRouter();
        const { token } = useSelector((state: RootStateOrAny) => state.admin)
        
        if (!token) {
            router.push('/en/admin/login')
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

export default AdminAuth;