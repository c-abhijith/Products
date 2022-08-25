import React,{useState} from "react";
import { TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import {Container,Button,   Modal, Form,Col,Row,ListGroup} from 'react-bootstrap'
import { useNavigate,Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import {axiosAuthorize} from "../axios";


const Addproduct = () => {
  
    const [err, setErr] = useState();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

  

    const onSubmit = async(data) => {
      const datas = {
        Product_name:data.Product_name,
        Product_price:data.Product_price,
        Product_description:data.Product_description,
        inventory:data.inventory,
      }
      console.log(datas,"---------------------------------")
      try{
        const {data} =await axiosAuthorize.post(`http://127.0.0.1:8000/product/details/`,datas)
        console.log(data)
        navigate("/home");
      }
      catch(error){
 
        console.log(error)
        if (error.response.data.Product_name) {
          setErr("Product_name", { type: "server", message: error.response.data.Product_name });
        }
        if (error.response.data.Product_name) {
          setErr("Product_price", { type: "server", message: error.response.data.Product_price });
        }
        if (error.response.data.Product_name) {
          setErr("Product_description", { type: "server", message: error.response.data.Product_description });
        }
        if (error.response.data.Product_name) {
          setErr("inventory", { type: "server", message: error.response.data.inventory });
        }
     }
        
      }

      const Userlogout = () =>{
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        
        
        navigate('/ ')
    
      }

      
  return (
    <div>
       <nav className='navbar d-flex  justify-content-between'>
        <div>




        <Link to='/' className='navbar-logo' >
          Navbar
        </Link>
        </div>
        
        
        <div className="mb-3">
          <div className="mb-3"> <Button onClick={Userlogout} variant="primary mx-3">Logout</Button></div> 
        </div>
      </nav>
    <Container >
    <Grid
      container
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
     
      <div class="card mt-5 col-6 col-sm-8 col-md-5 ">
        <div class="card-body">

      <Grid item >
          <div style={{
    
        display: "flex",
        justifyContent: "space-around",
      }}>
       <p style={{color:"red",fontSize:"10px"}}>{err}</p>

         
                <h1 className="mx-3">Add product</h1>
          </div>
      <Form onSubmit={handleSubmit(onSubmit)}  enctype="multipart/form-data">
        
        <Row style={{marginTop:'2rem'}}>
            <Col sm={12}>
            <Form.Group    className="mb-3" controlId="formBasicEmail">
            
            <Form.Control
                    {...register("Product_name",{required:"Product_name is required",minLength:{
                        value:6,
                        message:"Should contain 6 characters"
                    }})}
            
                name="Product_name"
                type="Product_name" 
                placeholder="Enter Product_name" 
                />
                <Form.Text className="text-muted">
                <span className='text-center'>{errors.Product_name && (<small className='text-center text-danger'>{errors.Product_name.message}</small>)}</span>
            </Form.Text>
                
            </Form.Group>
            </Col>
            <Col sm={12}>
            <Form.Group    className="mb-3" controlId="formBasicEmail">
            
            <Form.Control
                    {...register("Product_price",{required:"Product_price is required",minLength:{
                        value:1,
                        // message:"Should contain 6 characters"
                    }})}
            
                name="Product_price"
                type="Product_price" 
                placeholder="Enter Product_price" 
                />
                <Form.Text className="text-muted">
                <span className='text-center'>{errors.Product_price && (<small className='text-center text-danger'>{errors.Product_price.message}</small>)}</span>
            </Form.Text>
                
            </Form.Group>
            </Col>

            <Col sm={12}>
            <Form.Group    className="mb-3" controlId="formBasicEmail">
            
            <Form.Control
                    {...register("Product_description",{required:"Product_description is required",minLength:{
                        value:6,
                        message:"Should contain 6 characters"
                    }})}
            
                name="Product_description"
                type="Product_description" 
                placeholder="Enter Product_description" 
                />
                <Form.Text className="text-muted">
                <span className='text-center'>{errors.Product_description && (<small className='text-center text-danger'>{errors.Product_description.message}</small>)}</span>
            </Form.Text>
                
            </Form.Group>
            </Col>

            <Col sm={12}>
            <Form.Group    className="mb-3" controlId="formBasicEmail">
            
            <Form.Control
                    {...register("inventory",{required:"inventory is required",minLength:{
                        value:1,
                        // message:"Should contain 1 characters"
                    }})}
            
                name="inventory"
                type="inventory" 
                placeholder="Enter inventory" 
                />
                <Form.Text className="text-muted">
                <span className='text-center'>{errors.inventory && (<small className='text-center text-danger'>{errors.inventory.message}</small>)}</span>
            </Form.Text>
                
            </Form.Group>
            </Col>





            </Row>
            


            <Row>
           
            </Row>
            <Row>
            <div class="d-grid gap-2 ">
            <Button as="input" type="submit" value="Submit" />
                </div>
            </Row>
            </Form>   
              
                </Grid>
                </div>
                </div>
                </Grid>
                <Modal
                
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                    Custom Modal Styling
                    </Modal.Title>
                </Modal.Header>
                
                </Modal>
        
       
            </Container>
            </div>
  )
}


export default Addproduct