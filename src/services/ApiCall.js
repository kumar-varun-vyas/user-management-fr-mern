import axios from "axios"

export const commonrequest = async (method, url, body, header) => {
    let config = {
        method: method,
        url,
        headers: header ? header : { "Content-Type": "application/json" },
        data: body
    }

    //axios intance
    return axios(config).then((data) => {
        return data
    }).catch((err) => {
        console.log("ac errr--------", err)
        return err
    })
}