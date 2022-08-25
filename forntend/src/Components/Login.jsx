import React,{useState} from "react";
import { TextField, Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import {Container,Button,   Modal, Form,Col,Row,ListGroup} from 'react-bootstrap'
import { useNavigate,Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";
import Header from "./Header";


const Login = () => {
    const [err, setErr] = useState();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

  

    const onSubmit = async(data) => {
        
        try {
          const datas = {
            email:data.email,
            
            password:data.password
          }
          console.log(datas,"ooooooooooooooooooooooooooo")
          const response = await axios.post(`http://127.0.0.1:8000/task/login/` ,datas)
          console.log(response,"---------------------------------------------")
          console.log(response.data.access,"888888888888888888888888888")
          const access_token = localStorage.setItem('accessToken',response.data.access)
          const refresh_token = localStorage.setItem('refreshToken',response.data.refresh)
          const token =localStorage.getItem("accessToken")
          console.log("zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
          
  
          if(token){
            const decode = jwt_decode(token)
          console.log(decode.role)
          if(decode.role=="admin" ){
            navigate("/home")
          }
          else if(decode.role=="manager"){
            navigate("/home");
          }
          else if(decode.role=="staff"){
            navigate("/home");
          }
          else{
            navigate("/register");
          }
  
          }
        }
        
    
         catch (error) {
          console.log(error.response.data.detail)
          setErr(error.response.data.detail)
        }
      }
      
  return (
    <div>
     <Header/>
   
    <Container >
    <Grid
      container
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
     
      <div class="card mt-5 col-6 col-sm-6 col-md-4">
        <div class="card-body">

      <Grid item >
          <div style={{
    
        display: "flex",
        justifyContent: "space-around",
      }}>
       <p style={{color:"red",fontSize:"10px"}}>{err}</p>

         
                 <h1 className="mx-5">Login</h1>
          </div>
      <Form onSubmit={handleSubmit(onSubmit)}  enctype="multipart/form-data">
        
        <Row style={{marginTop:'2rem'}}>
            <Col sm={12}>
            <Form.Group    className="mb-3" controlId="formBasicEmail">
            
            <Form.Control
                    {...register("email",{required:"username is required",minLength:{
                        value:6,
                        message:"Should contain 6 characters"
                    }})}
            
                name="email"
                type="email" 
                placeholder="Enter email" 
                />
                <Form.Text className="text-muted">
                <span className='text-center'>{errors.email && (<small className='text-center text-danger'>{errors.email.message}</small>)}</span>
            </Form.Text>
                
            </Form.Group>
            </Col>
            <Col sm={12}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label> Email</Form.Label> */}
            <Form.Control 
                    {...register("password", {
                        required: "password is required"
                    })}
                        
                name="password"
                type="text" 
                placeholder="Enter password" />
            <Form.Text className="text-muted">
            <span className='text-center'>{errors.password && (<small className='text-center text-danger'>{errors.password.message}</small>)}</span>
            </Form.Text>
  
       </Form.Group>


  
            </Col>
            </Row>
            


            <Row>
           
            </Row>
            <Row>
            <div class="d-grid gap-2 ">
            <Button as="input" type="submit" value="Signin" />
                </div>
            </Row>
            </Form>   
            <Link to="/register">Register</Link>      
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

export default Login