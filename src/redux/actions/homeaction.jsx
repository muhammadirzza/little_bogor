export const isHome=()=>{
    return {
        type:'HOME'
    }
}

export const isNotHome=()=>{
    return {
        type:'NOTHOME'
    }
}

export const limitChar=(char)=>{
    return {
        type:'COUNTCHAR',
        payload:char
    }
}