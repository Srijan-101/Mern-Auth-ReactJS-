import cookie from 'js-cookie';

//set in cookie
export const setCookie = (key,value) => {
     if(window !== 'undefined'){
         cookie.set(key,value,{
             expires : 1
         })
     }
}
//remove cookie
export const removeCookie = (key) => {
    if(window !== 'undefined'){
        cookie.remove(key,{
            expires : 1
        })
    }
}
//get from cookie such as stored token
export const getCookie = (key) => {
    if(window !== 'undefined'){
        return cookie.get(key);
    }
}

//set in localstorage
export const setLocalstorage = (key,value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key,JSON.stringify(value))
    }
}
//remove localstorage
export const removeLocalstorage = (key) => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

//autheticate user by passing data in cookie and localstorage during signin
export const authenticate = (response,next) => {
    setCookie('token',response.data.token);
    setLocalstorage('user',response.data.user);
    next();
}
 

//access user info from localstorage
export const isAuth = () => {
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token');
        if(cookieChecked){
             if(localStorage.getItem('user')){
                 return JSON.parse(localStorage.getItem('user'))
             }
        }else{
            return false;
        }
    }
}

export const signOut = (next) => {
    removeCookie('token');
    removeLocalstorage('token');
    next();
}

export const updateUser = (res,next) => {
    if(typeof window !== 'undefined'){
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = res.data;
        localStorage.setItem('user',JSON.stringify(auth));
    }
    next();
}