const INITIAL_STATE={
    ishome:true,
    char:100
}

export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'NOTHOME': 
            return {...state,ishome:false}
        case 'HOME':
            return {...state,ishome:true}
        case 'COUNTCHAR':
            return {...state,char:INITIAL_STATE.char-action.payload}
        default:
            return state
    }
}