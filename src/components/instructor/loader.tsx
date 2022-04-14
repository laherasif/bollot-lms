import { Spinner } from "react-bootstrap"

export const Main = () => {
    return (
        <>
            <div style={{ textAlign: 'center', margin: 'auto' }}>
                <Spinner animation="border" />
            </div>
        </>
    )
}

export const Small = () => {
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <Spinner animation="border" size="sm" />
            </div>
        </>
    )
}