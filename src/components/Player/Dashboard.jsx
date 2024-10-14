import React, { useState, useEffect } from 'react'
import { Col, Container, Image, Modal, Row, Table, Button, Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import {useFormik} from 'formik'
import * as Yup from 'yup'
export default function Dashboard() {
    const [api, setAPI] = useState([])
   const baseURL = `https://65e0222ad3db23f7624859a6.mockapi.io/test`
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const categories = [
    {id: 'Dendrobium', name:'Dendrobium'},
    {id: 'Brassavola', name:'Brassavola'},
    {id:'Cattleya', name:'Cattleya'}
   ]
   const fetchAPI = ()=>{
     fetch(baseURL + '?sortBy=id&order=desc')
    .then(resp => resp.json())
    .then(data => setAPI(data))
    .catch(err=> console.error(err))
   }
   useEffect(() => {
     fetchAPI()
   }, [])
   const handleDelete = (id)=>{
    fetch(baseURL + '/'+ id, {method: 'DELETE'})
    .then(()=>{
        fetchAPI()
        toast.success('Delete successfully!')
    }
    )
   
   }
   const formik = useFormik({
    initialValues:{
      orchidName:'',
      description:'',
      image:'',
      category:'',
      isNatural: false,
      isAttractive: false
    },
    onSubmit: values =>{
      //alert(JSON.stringify(values))
      fetch(baseURL,{method:'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
          },
          credentials: 'same-origin'
      
      })
      .then(()=>{
        handleClose()
        toast.success('Create successfully')
        fetchAPI()
      })
    },
     validationSchema : Yup.object({
      name: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),
      description: Yup.string().required("Required.").min(10, "Must be 10 characters or more"),
      image: Yup.string().required("Required.").min(2, "Must be 2 characters or more"),

    })
   })
  return (
    <Container>
        <Row className='py-5'>
            <ToastContainer/>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Orchid name"
                autoFocus name='orchidName' value={formik.values.orchidName} onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Orchid name"
                autoFocus name='image'
                value={formik.values.image} onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name='description'
              value={formik.values.description} onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group>
            <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Natural"
        name='isNatural'
        value={formik.values.isNatural} onChange={formik.handleChange}
      />
            </Form.Group>
            <Form.Group>
            <Form.Select aria-label="Default select example" name='category'
            value={formik.values.category} onChange={formik.handleChange}
            >
      {categories.map((c)=>(
        <option value={c.id}>{c.name}</option>
      ))}
      
      
    </Form.Select>
            </Form.Group>
            <Form.Group>
            <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Famous"
        name='isAttractive' value={formik.values.isAttractive} onChange={formik.handleChange}
      />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type='submit' onClick={formik.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

            <Col>
            <Table striped bordered hover>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Natural</th>
          <th>Category</th>
          <th>Attractive</th>
          <th>Actions  | <i onClick={handleShow} className="bi bi-plus-circle-fill"></i></th>
        </tr>
      </thead>
      <tbody> 
        {api.map((a)=>(
            <tr key={a.id}>
            <td><Image src={a.image} thumbnail style={{ width: 50}}/></td>
            <td>{a.orchidName}</td>
            <td>{a.isNatural ? <i className="bi bi-house-slash-fill"></i>: <i className="bi bi-house-check"></i>}</td>
            <td>{a.category}</td>
            <td>{a.isAttractive && <i className="bi bi-balloon-heart-fill"></i>}</td>
            <td>Edit | <i className="bi bi-trash3-fill" onClick={()=> {if(confirm('Do you wanna delete?')) handleDelete(a.id)}}></i></td>
          </tr>
        ))}
        
       
      </tbody>
    </Table>
            </Col>
        </Row>
    </Container>
  )
}
