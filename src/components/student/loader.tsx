import { Spinner } from "react-bootstrap"

export const Main = () => {
    return (
        <>
            <div style={{ textAlign: 'center', paddingTop: '20rem' }}>
                <Spinner animation="border" />
            </div>
        </>
    )
}

export const Small = () => {
    return (
        <>
            <div style={{ textAlign: 'center' , marginTop:'10rem' }}>
                <Spinner animation="border"  />
            </div>
        </>
    )
}