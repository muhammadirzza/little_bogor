import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';
import {API_url} from '../support/API_url';
import Axios from 'axios'
import {capitalFirst} from '../support/cap-first';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';
import {limitChar} from '../redux/actions';
import { connect } from 'react-redux'

const Addata = (props) => {

const [obj, setobj]=useState({
    name: "",
    image: "",
    deskripsi: "",
    categoryId: 0,
    web: "",
    ig:"",
    twitter:"",
    facebook:"",
})

const [ok, setok]=useState(false)
const [category, setcategory]=useState([])
const [loading, setloading]=useState(true)

useEffect(()=>{
    Axios.get(`${API_url}/categories`)
        .then((res1)=>{
            console.log(res1.data)
            setcategory(res1.data)
        }).catch((err1)=>{
            console.log(err1)
        }).finally(()=>{
            setloading(false)
        })
    },[])

const Category=()=>{
    return category.map((val,index)=>{
        return <option key={index} value={val.id}>{capitalFirst(val.nama)}</option>
    })
}

const onObjChange=(e)=>{    
    let charr = e.target.value.split('')
    let newchar = charr.filter((val)=>val!=='')
    props.limitChar(newchar.length)
    setobj({...obj,[e.target.name]:e.target.value})
}

const onDataSubmit=(e)=>{
    e.preventDefault()
    if(obj.name==="" || obj.image==="" || obj.deskripsi==="" || obj.categoryId===0 ||
        (obj.web===""&&obj.ig===""&&obj.facebook===""&&obj.twitter==="")){
        Swal.fire({
            icon: 'error',
            title: 'Oops..., Data yang kamu isi kurang lengkap',
            text: 'Ayo lengkapi data yang kurang!',
            })
    }else{
        Axios.post(`${API_url}/products`,obj)
        .then((res)=>{
            console.log(res.data)
            Swal.fire(
                'Selamat!',
                'Data Berhasil Ditambahkan!',
                'success'
              ).then(()=>{
                  return setok(true)
              })
        }).catch((err)=>{
            console.log(err)
        })
    }
}

if(ok){
    return <Redirect href="/"/>
}

  return (
      <div className="container mt-5 mb-5" style={{width:"1000px", height:"100vh"}}>
        <Form onSubmit={onDataSubmit}>
            <FormGroup>
                <Label for="examplename">Nama Komunitas</Label>
                <Input name="name" placeholder="Masukkan Nama Komunitasmu" value={obj.name} onChange={onObjChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="exampleimage">Logo</Label>
                <Input name="image" placeholder="Masukkan url Gambar" value={obj.image} onChange={onObjChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="examplecategoryId">Kategori</Label>
                <Input type="select" name="categoryId" onChange={onObjChange}>
                    <option value="" hidden>Pilih Kategori</option>
                    {
                        loading?
                        null
                        :
                        Category()
                    }
            </Input>
            </FormGroup>
            <Row className="p-4">
                <Col className="md-6">
                    <FormGroup>
                        <Label for="exampleig">Instagram</Label>
                        <Input name="ig" placeholder="Masukkan alamat instagram (jika ada)" value={obj.ig} onChange={onObjChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplefacebook">Facebook</Label>
                        <Input name="facebook" placeholder="Masukkan alamat facebook (jika ada)" value={obj.facebook} onChange={onObjChange}/>
                    </FormGroup>
                </Col>
                <Col className="md-6">
                    <FormGroup>
                        <Label for="exampleweb">Web</Label>
                        <Input name="web" placeholder="Masukkan alamat website (jika ada)" value={obj.web} onChange={onObjChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampletwitter">Twitter</Label>
                        <Input name="twitter" placeholder="Masukkan alamat twitter (jika ada)" value={obj.twitter} onChange={onObjChange}/>
                    </FormGroup>
                </Col>
            </Row>
            <FormGroup>
                <Label for="exampledeskripsi">Deskripsi</Label>
                <Input type="textarea" name="deskripsi" value={obj.deskripsi} onChange={onObjChange} maxLength={100}/>
                <div style={{textAlign:"right",}}>
                    {props.Home.char}
                </div>
            </FormGroup>
            <Button>Submit</Button>
        </Form>
      </div>
  );
}

const MapstatetoProps=(state)=>{
    return{
        Home:state.Home,
    }
  }

export default connect(MapstatetoProps,{limitChar}) (Addata);