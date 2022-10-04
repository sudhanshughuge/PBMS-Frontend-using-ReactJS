
export const isLoggedIn=()=>{
    let data = localStorage.getItem("data")
    if(data==null){
        return false;
    }
    else{
        return true;
    }
}

export const doLogin=(data,next)=>{
    localStorage.setItem("data",JSON.stringify(data))
    next()
}

export const doLogout=(next)=>{
    localStorage.removeItem("data")
    next()
}

export const getCurrentUserDetails=()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("data")).user;
    } else{
        return {}
    }
}

export const checkAdmin=()=>{
    const userRoles = getCurrentUserRole()
    if(userRoles === 'ROLE_ADMIN'){
        return true
    } else{
        return false
    }
}

export const getCurrentUserRole=()=>{
    if(isLoggedIn){
        return JSON.parse(localStorage.getItem("data")).user.role;
    } else{
        return {}
    }
}

export const getToken=()=>{
    return JSON.parse(localStorage.getItem("data")).token;
}