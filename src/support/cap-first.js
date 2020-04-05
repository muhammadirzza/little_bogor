export const capitalFirst=(str)=>{
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 }
    // const upper = input.charAt(0).toUpperCase() + input.substring(1)
    // return upper
