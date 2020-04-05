import React from 'react'
import Loader from 'react-loader-spinner'

export default class Loading extends React.Component {
   render() {
    return(
     <Loader
        type="CradleLoader"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={10000} //3 secs

     />
    );
   }
}