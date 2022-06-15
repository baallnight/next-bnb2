import axios from "axios";
import cookie from 'react-cookies'


function setToken(accessToken:string, refreshToken:string) {

    axios.defaults.headers.common.Authorization = "Bearer " + accessToken;

    const expires = new Date()
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24)

    cookie.save(
        'accessToken'
        , accessToken
        , {
            path: '/'
            , expires
            , httpOnly: true // dev/prod 에 따라 true / false 로 받게 했다.
        }
    )
    cookie.save(
        'refreshToken'
        , refreshToken
        , {
            path: '/'
            , expires
            , httpOnly: true
        }
    )
}

export {setToken}