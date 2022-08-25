import React ,{useState,useEffect} from 'react'
import { TextField, Grid } from "@mui/material";
import { useNavigate,Link } from "react-router-dom";
import {axiosAuthorize} from "../axios";
import jwt_decode from "jwt-decode";




import {Container,Button,Table,InputGroup,   Modal, Form,Col,Row,ListGroup} from 'react-bootstrap'
import Header from './Header';
const Home = () => {
    const navigate = useNavigate()

    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

   
    const [decod, setdecode] = useState();
    const [pname, setpname] = useState();
    const [pprice, setpprice] = useState();
    const [pdesc, setpdesc] = useState();
    const [inova, setinova] = useState();
  

    const [usersData, setuserData] = useState([]);
    const fecthdata=async()=>{
        const {data} = await axiosAuthorize.get(`http://127.0.0.1:8000/product/details/`);
        
        setuserData(data)
      }



      const Datas =(event) =>{
        setShowEdit(event)
        console.log(event,";;;;;;;;;;;;;;;;")
        setpname(event.Product_name)
        setpprice(event.Product_price)
        setinova(event.inventory)
        setpdesc(event.Product_description)
        // setinova(event.vehicleBook_image)
        
      }


      const onSubmit = async ()=>{
      
        console.log(pname,"++++++++++++++d+++++++++")
        console.log(pdesc,"++++++++g+++++++++++++++")
        console.log(pprice,"++++++++++++w+++++++++++")
        console.log(inova,"+++++++++wwwwww++++++++++++++")
        console.log("hai")
        const formData = new FormData() 
        formData.append("Product_name", pname);
        formData.append("Product_price", pprice);
        formData.append("inventory", inova);
        formData.append("Product_description", pdesc);
       
    
        const data = await axiosAuthorize.put(`http://127.0.0.1:8000/product/details/${showEdit.id}`,formData);
        // handleCloseloading()
        // console.log("0000")
        // fecthVehicles();
        
        fecthdata()
        handleCloseEdit();
        
        // navigate("/dashvehicles")
        
        
        navigate("/home")
        // formData.append("vehicle_Name", vehicle_Name);
    
      }

      useEffect(()=>{
        const token=localStorage.getItem("accessToken")
        const decode = jwt_decode(token)
        setdecode(decode.role)
        console.log(decode.role,"=======================+")
        fecthdata();
       
      },[]);
      
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
          <div className="mb-3"> <Button   onClick={Userlogout} variant="primary mx-3">Logout</Button></div> 
        </div>
      </nav>

    <Container sm={4}>
      {decod === "admin" ?
             <div className="text-justify text-end">
             
             <Link to="/home/addproduct" ><Button className="mt-3  text-center"  variant="primary">App Product</Button></Link>
             </div>
              : null}
            <Grid
            container
            style={{
                backgroundColor: "white",
                display: "flex",
                justifyContent: "space-around",
            }}
            >
              

            <div className=" d-flex  justify-content-between">
                <h1 className="mx-5 mt-4 ">Product Lists</h1>
                <div>  </div>
            </div>

             
            

                </Grid>
            <Grid item >
                   
        
                    <Row style={{marginTop:'2rem'}}>
                            <Col sm={12}>
                            








            
                            <div>
       <div className="chart">
        
          </div>
          
    
           
         <Table >
           <thead>
                <tr className="text-center">
                    <td>#</td>
                    <td>Product</td>
                    
                    <td> Price</td>
                    <td> Description</td>
                    <td> Status</td>
                    
                    <th>   </th>
                </tr>
           </thead>
           <tbody className='tablehead adminworkertable  text-center shadow-lg' striped bordered hover>
           {usersData && usersData.map((data,index)=>(
            
                    <tr>
                        <td>{index+1}</td>
                        <td>{data.Product_name}</td>
                        <td>{data.Product_price}</td>
                        <td>{data.Product_description}</td>
                        <td>{data.inventory}</td>
                
                        <td style={{ color: "green" }}>
                           <button className="btn btn-success bg-success" onClick={()=>{Datas(data)}} >Edit</button>
                      </td>
                        
                        
                        {/* <td style={{color:"blue" , cursor:"pointer"}} onClick={()=>{handleList(data)}}> views</td> */}

            
                    </tr>

                                            
                                ))
                                }











           

        
        </tbody>
        </Table>
        </div>


        { showEdit && <Modal show={showEdit} onHide={handleCloseEdit}>
                              <Modal.Header closeButton>
                                <Modal.Title>Edit</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                              <Form>
                                      <Form.Group className="mb-3" controlId="formBasicEmail">
                                           <Form.Control type="text" placeholder="Product Name" 
                                           defaultValue={pname}
                                           onChange={(e) =>setpname(e.target.value)}
                                           />
                                      </Form.Group>

                                      <Form.Group className="mb-3" controlId="formBasicEmail">
                                           <Form.Control type="text" placeholder="Product description" 
                                           defaultValue={pdesc}
                                           onChange={(e) =>setpdesc(e.target.value)}/>
                                      </Form.Group>

                                      
                                      <Form.Group className="mb-3" controlId="formBasicEmail">
                                           <Form.Control type="text" placeholder="vehicle price"
                                           defaultValue={pprice}
                                           onChange={(e) =>setpprice(e.target.value)}/>
                                      </Form.Group>
                                      <Form.Group className="mb-3" controlId="formBasicEmail">
                                           <Form.Control type="text" placeholder="inovation"
                                           defaultValue={inova}
                                           onChange={(e) =>setinova(e.target.value)}/>
                                      </Form.Group>
                                      
                                     
                                      
                                      


                                      <Button variant="primary"  onClick={()=>onSubmit()}>
                                        Submit
                                      </Button>
                                    </Form>
                              </Modal.Body>
                              
                            </Modal>
}










                        
                             </Col>
          
                        </Row>
     

  
            
            

     
    
                    </Grid>
       
            </Container>
            </div>
  )
}

export default Home