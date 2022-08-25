import React,{useState,useEffect} from 'react' 
import axios from "../axios";
import { useForm, Controller } from 'react-hook-form';
import { TextField, Grid } from "@mui/material";
import { useNavigate,Link } from "react-router-dom";
import {Container,Button,   Modal, Form,Col,Row,ListGroup} from 'react-bootstrap'
import {axiosAuthorize} from "../axios";
import Header from './Header';

const Signup = () => {
  const {register,handleSubmit,setError   ,formState:{errors}}=useForm();
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");



  const onSubmit =async(data)=>{
    console.log(data.phone_number,"99999999999999")
    const datas = {
      username:data.username,
      email:data.email,
      phone_number:data.phone_number,
      password:data.password,
      password2:data.password,
  
      role:data.role,

    }
    console.log(datas,"jjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
    try{
          const response = await axios.post(`task/register/`,data)
          console.log(response)
          navigate("/");
    }
    catch(error){
      console.log("@@@@@@@@@@@@@@@@@@@")
      console.log(error)
      if (error.response.data.username) {
        setError("username", { type: "server", message: error.response.data.username });
        }
        if (error.response.data.email) {
              setError("email", { type: "server", message: error.response.data.fullname });
        }
        if (error.response.data.password) {
              setError("password", { type: "server", message: error.response.data.password[0] });
        }
        if (error.response.data.phone_number) {
              setError("phone_number", { type: "server", message: error.response.data.phone_number[0] });
        }
          }
        }



  return (
    <div>
         <Header/>
    <Container sm={4}>
    <Grid
      container
      style={{
        backgroundColor: "white",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
     
      <div class="card mt-5">
        <div class="card-body">

      <Grid item >
        <h1 className="mx-3">Register</h1>
      <Form  onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
        <Row style={{marginTop:'2rem'}}>
            <Col sm={5}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
                {...register("username",{required:"username is required",minLength:{
                  value:6,
                  message:"Should contain 6 characters"
                }})}
                name="username"
                type="text" 
                placeholder="Enter username" 
                />
                <Form.Text className="text-muted">
                <span className='text-center'>{errors.username && (<small className='text-center text-danger'>{errors.username.message}</small>)}</span>
            </Form.Text>
                
            </Form.Group>
            </Col>
            <Col sm={5}>

            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Email</Form.Label>
            <Form.Control 
              {...register("email",{required:"name is required",minLength:{
                value:10,
                message:"Should contain 10 characters"
              }})}
                
            name="email"
                type="email" 
                placeholder="Enter email id" />
            <Form.Text className="text-muted">
            <span className='text-center'>{errors.email && (<small className='text-center text-danger'>{errors.email.message}</small>)}</span>
            </Form.Text>
  
       </Form.Group>


  
            </Col>
            </Row>
            <Row>
            <Col sm={5}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control 
                         type='number'
                         {...register("phone_number",{required:"phone_number is required",pattern:{
                           value:"^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$",
                           message:"Invalid phone id",
                           
                         },
                         minLength:{
                           value:'10',
                           message:'Should contain 10 numbers'
                         }, maxLength:{
                           value:'10',
                           message:'Should contain 10 numbers'
                         }
                       })}
                       onKeyPress={function (evt) {
                         if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
                         {
                             evt.preventDefault();
                         }
                     }}
                       onInput={function (evt) {
                         if (evt.which != 8 && evt.which != 0 && evt.which < 48 || evt.which > 57)
                         {
                             evt.preventDefault();
                         }
                     }}
                         name="phone_number"
                         minLength={10}
                       
                         
                         placeholder="Enter Mobile" />
                        <Form.Text className="text-muted">
                        <span className='text-center'>{errors.phone_number && (<small className='text-center text-danger'>{errors.phone_number.message}</small>)}</span>
                    </Form.Text>
                    </Form.Group>
            </Col>
            <Col sm={5}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter your role</Form.Label>

                            <select class="form-select " aria-label="Default select example"  {...register("role", { required: 'role is required' })}>
                                
                            <option  value="">Select the Driver </option>
                                

                                     <option value="staff">Staff</option>
                                     <option value="manager">Manager</option>
                                     <option value="admin">Admin</option>
                            
                              
                            </select>
                            <span className='text-center'>{errors.rola && (<small className='text-center text-danger'>{errors.rola  .message}</small>)}</span>
                    
                    </Form.Group>
            </Col>

            </Row>


            <Row>
            <Col sm>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Password</Form.Label>
            <Form.Control  {...register("password",{required:"password is required",minLength:{
                  value:6,
                  message:"Please Enter atleast 8 charecters"
                // },pattern:{
                //   // value:/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
                //   message:"Please Enter a strong password ,should contain letter charecter and number"
                }})}
                        
                name="password"
                onChange={e => setPassword(e.target.value)}
                type="password" 
                placeholder="Enter password" />
            <Form.Text className="text-muted">
            <span className='text-center'>{errors.password && (<small className='text-center text-danger'>{errors.password.message}</small>)}</span>
            </Form.Text>
            </Form.Group>
            </Col>
            <Col sm>
            <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control {...register("cpassword",{required:"confirmpassword is required",pattern:{
        
          
                      }})}
            
                name="cpassword"
                type="password" 
                onChange={e => setPassword2(e.target.value)}
                placeholder="confirm password" />
            <Form.Text className="text-muted">
            <p className='text-danger'>{password2 !== password ? "Passwords do not match" : ""}</p>
             <span className='text-center'>{errors.cpassword && (<small className='text-center text-danger'>{errors.cpassword.message}</small>)}</span>
            </Form.Text>
            </Form.Group>
            </Col>
            </Row>
            <Row>
            
            <Button as="input" type="submit" value="Resgister" />
            </Row>
            </Form>   
            <Link to="/">Login</Link>      
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

export default Signup