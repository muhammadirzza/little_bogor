import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {isNotHome} from '../redux/actions'

class Footer extends Component{

    componentWillMount() {
        this.props.isNotHome()
    }

    render() {
        console.log(this.props.Home.ishome)
        return (
            <div className="container">
                {
                    this.props.Home.ishome?
                        <div className="footer">
                            <h3 className="mb-4">
                                Tentang
                            </h3>
                            <p>
                                Little Bogor adalah sebuah website tempat mengumpulkan data komunitas, 
                                kuliner, olahraga dan lainnya yang ada di Kota Bogor, dengan tujuan 
                                menjadikan Kota Bogor sebagai Kota Produktif dimulai dari hal Terkecil.
                            </p>
                            <p>
                                Kamu bisa mendaftarkan komunitas kamu <Link to="/input" className="ex5" style={{color:"blue"}}>disini</Link> agar orang lain dapat menemukanmu
                                dan ikut bergabung melakukan hal positif bersama komunitasmu.
                            </p>
                            <p>
                                Web sederhana ini dibuat terinspirasi dari website Little Makassar. Kami 
                                sangat menerima saran dan masukan yang membangun dari rekan-rekan sekalian
                                yang dapat diinfokan melalui email muhammadirzza@gmail.com.
                            </p>
                        </div>
                    :
                    null
                }
            </div>
        )
    }
}

const MapstatetoProps=(state)=>{
    return{
        Home:state.Home,
    }
  }

export default connect(MapstatetoProps,{isNotHome}) (Footer)