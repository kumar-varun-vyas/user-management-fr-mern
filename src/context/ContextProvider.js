import React, { createContext, useState } from 'react'

export const addData = createContext()

const ContextProvider = ({ children }) => {

    const [userAdd, setUserAdd] = useState()
    const [userUpdatecont, setUserUpdateCont] = useState()
    const [userDelete, setUserDelete] = useState()

    return (
        <>
            <addData.Provider value={{ userAdd, setUserAdd, userUpdatecont, setUserUpdateCont, userDelete, setUserDelete }}>
                {children}
            </addData.Provider>
        </>
    )
}

export default ContextProvider