import React, { Component } from 'react';
import Axios from 'axios';
import {API_url} from '../support/API_url';
import { Button } from 'reactstrap';
import {capitalFirst} from'../support/cap-first';
import {FaInstagram, FaTwitterSquare, FaFacebookSquare, FaGlobe} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {isHome, isNotHome} from '../redux/actions';
import Loading from '../support/loading';
import {Navbar, NavbarToggler, Collapse, Nav, NavItem} from 'reactstrap'

class Community extends Component {
    state= {
        products:[],
        searchProducts:[],
        category:[],
        loading:true,
        limit:5,
        categoryname:"",
        isOpen:false
    }

    componentDidMount() {
        this.props.isHome()
        Axios.get(`${API_url}/products?_expand=category`)
            .then((res)=>{
                console.log(res.data)
                this.setState(
                    {
                        products:res.data,
                        searchProducts:res.data
                    }
                )
                Axios.get(`${API_url}/categories`)
                .then((res1)=>{
                    console.log(res1.data)
                    this.setState({category:res1.data})
                    console.log(this.state.category)
                }).catch((err1)=>{
                    console.log(err1)
                })
            }).catch((err)=>{
                console.log(err)
                
            }).finally(()=>{
                this.setState({loading:false})
            })
        }
        
    onLoadMore=()=>{
        this.setState({
            limit:this.state.limit+5
        })
    }
    
    componentWillUnmount() {
        this.props.isNotHome()
    }
        
    renderData=()=>{
            if(this.state.searchProducts.length){
                return this.state.searchProducts.slice(0,this.state.limit).map((val, index)=>{
                    return(
                        <div className="card" key={index}>
                            <div className="imgbox">
                                <img src={val.image} alt={val.name} height="100%" width="100%"/>
                            </div>
                            <div className="textbox">
                                <div className="title">
                                    {capitalFirst(val.name)}
                                </div>
                                <div className="deskripsi">
                                    {val.deskripsi}
                                </div>
                                <div className="url mt-2 d-flex">
                                    {
                                        val.web?
                                        <a href={val.web} rel="noopener noreferrer" target='_blank' className="pr-2">
                                            <Button outline size="sm" color="secondary" style={{fontSize:"12px"}}>web <FaGlobe/></Button>
                                        </a>
                                        :
                                        null
                                    }
                                    {
                                        val.ig?
                                        <a href={val.ig} rel="noopener noreferrer" target='_blank' className="pr-2">
                                            <Button outline size="sm" color="secondary" style={{fontSize:"12px"}}>instagram <FaInstagram/></Button>
                                        </a>
                                        :
                                        null
                                    }
                                    {
                                        val.twitter?
                                        <a href={val.twitter} rel="noopener noreferrer" target='_blank' className="pr-2">
                                            <Button outline size="sm" color="secondary" style={{fontSize:"12px"}}>twitter <FaTwitterSquare/></Button>
                                        </a>
                                        :
                                        null
                                    }
                                    {
                                        val.facebook?
                                        <a href={val.facebook} rel="noopener noreferrer" target='_blank' className="pr-2">
                                            <Button outline size="sm" color="secondary" style={{fontSize:"12px"}}>facebook <FaFacebookSquare/></Button>
                                        </a>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }else{
                return(
                    <div style={{fontSize:"20px"}}>
                        Wah belum ada data di kategori ini.., ayo kamu tambahkan <Link to="/input" className="ex5" style={{color:"blue"}}>disini</Link>
                    </div>
                )
            }
        }
    
    renderCategory=()=>{
        console.log(this.state.selection)
        const {categoryname}=this.state
        return this.state.category.map((val, index)=>{
            return(
                <NavItem key={index} className="p-2">
                    <Button className={categoryname===val.nama ? "active" : null} size="sm" outline color="secondary" onClick={()=>{this.onFilter(val.nama)}}>{capitalFirst(val.nama)}</Button>&ensp;
                </NavItem>
            )
        })
    }

    toggle=()=>{
        this.setState({isOpen:!this.state.isOpen})
    }

    onFilter=(category)=>{
        // console.log(category)

        let hasilFilter=this.state.products.filter((val)=>{  
            // console.log(val.categorycategory)
            return (
                // akan mereturn true atau false 
                val.category.nama.includes(category)               
            )
        })
        this.setState({searchProducts:hasilFilter, limit:5, selection:!this.state.selection, categoryname:category})
    }

    onReset=()=>{
        this.setState((prevState)=>{
            return{
                searchProducts: prevState.products,
                categoryname: "semua"
            }
        })
    }

    render() {
        return (
            <div className="container">
                <Navbar color="light" light expand="md" className="mb-4">
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem className="p-2">
                                <Button outline size="sm" className={this.state.categoryname==="semua" ? "active" : null} color="secondary" onClick={()=>{this.onReset()}}>Semua</Button>&ensp;
                            </NavItem>
                            {
                                !this.state.loading ? 
                                this.renderCategory()                        
                                :
                                null                        
                            }
                        </Nav>
                    </Collapse>
                </Navbar>
                {
                    !this.state.loading ?
                    this.renderData()
                    :
                    <div className="loading">
                        <Loading />
                    </div>
                }
                <div className="mt-4">
                    <Button style={{display:this.state.limit>this.state.searchProducts.length?"none":"block"}} color="secondary" size="lg" height="5px" block onClick={this.onLoadMore}>Load More...</Button>
                </div>
            </div>
        )
    }

}

export default connect(null,{isHome, isNotHome}) (Community)