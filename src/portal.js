import ReactDOM from "react-dom"
const Portal = (props) => {
    return (
        ReactDOM.createPortal(props.children, document.getElementById('portal'))

    )
}

const PortalContent = () => {
    return (
        <div className='portal'>
            <h1>
                I am portal loading .....
            </h1>
        </div>
    )
}

export { Portal, PortalContent }
