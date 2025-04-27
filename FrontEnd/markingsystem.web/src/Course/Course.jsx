// //import React,{Fragment, useEffect,useState} from "react";
// import {Fragment, useEffect,useState} from "react";
// import axios from "axios";
// //import { useNavigate } from "react-router-dom"; // Import useNavigate
// import Table from 'react-bootstrap/Table';
// // for popup modal
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// //Row-Column
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// //for toastify
// //import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function Course(){

//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//  ///state variables
//    //for create
//    const[name, setName] = useState('');// here 'name' is variable and 'setName' is function
//    const[description, setDescription] = useState('');
//    const[startDate, setStartDate] = useState('');
//    const[endDate, setEndDate] = useState('');

//   //for edit
//    const[editId, setEditId] = useState('');
//    const[editName, setEditName] = useState('');
//    const[editDescription, setEditDescription] = useState('');
//    const[editStartDate, setEditStartDate] = useState('');
//    const[editEndDate, setEditEndDate] = useState('');
    
//   const[dataCourse, setData] = useState([]);
//   useEffect(() => {
//     getData();
// },[])

// const clear =()=>{
//     setName('');
//     setDescription('');
//     setStartDate('');
//     setEndDate('');
// }

// async function getData() {
//     try {
//      const response =  await axios.get("https://localhost:7084/api/course",
//       {
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//             "Content-Type": "application/json",
//         },
//     }
//     );
//     //console.log(response.data.result);
//       //const result = response.data.result;
//       setData(response.data.result)
//     } catch (err) {
//       alert(err);
//     }
//   }

//   async function handleSave(event) {
//     event.preventDefault();
//     try {
//     const token = localStorage.getItem("authToken");
//      const response =  await axios.post("https://localhost:7084/api/course", {
//         courseName: name,
//         description : description,
//         startDate : startDate,
//         endDate : endDate
//       },{
//         headers: {
//             Authorization: `Bearer ${token}`, 
//             "Content-Type": "application/json",
//         },
//       });
//       console.log(response);
//       getData()
//       clear();
//       toast.success('Saved Successfully');
//     } catch (err) {
//       alert(err);
//     }
//   }

//   async function handleEdit(id){
//     try {
//         handleShow();
//         const response =  await axios.get(`https://localhost:7084/api/course/${id}`,
//          {
//            headers: {
//                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//                "Content-Type": "application/json",
//            },
//        }
//        );
//        //console.log(response.data.result);
//          //setEditId(response.data.result.courseId);
//             setEditName(response.data.result.courseName);
//             setEditDescription(response.data.result.description);
//             // setEditStartDate(response.data.result.startDate);
//             // setEditEndDate(response.data.result.endDate);
//             setEditStartDate(response.data.result.startDate.split("T")[0]);
//             setEditEndDate(response.data.result.endDate.split("T")[0]);
//             setEditId(id);
//        } catch (err) {
//          alert(err);
//        }
//   }

//   async function handleUpdate(event) {
//     event.preventDefault();
//     try {
//     const token = localStorage.getItem("authToken");
//      await axios.put("https://localhost:7084/api/course", {
//         courseId :editId,
//         courseName: editName,
//         description : editDescription,
//         startDate : editStartDate,
//         endDate : editEndDate
//       },{
//         headers: {
//             Authorization: `Bearer ${token}`, 
//             "Content-Type": "application/json",
//         },
//       });
//       handleClose();
//       getData()
//       clear();
//       toast.success('updated Successfully');
//     } catch (err) {
//       alert(err);
//     }
//   }

//   async function handleDelete(id){
//     try {
//         if(window.confirm("Are you sure to delete this ?") == true){
//             const response =  await axios.delete(`https://localhost:7084/api/course/${id}`,
//                 {
//                   headers: {
//                       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//                       "Content-Type": "application/json",
//                   },
//               }
//               );
//             if(response.data.isSuccess == true)
//                 {
//                     toast.success('Deleted Successfully');
//                         getData();
//                 }
//                 //console.log(response);
//             }
//     } catch (err) {
//         alert(err);
//       }
//   }

//   return(
//     <Fragment>
//         <Container>
//             <Row>
//                 <Col>
//                 <label>Course Name </label>
//                     <input type="text" className="form-control" placeholder="Enter Course Name" 
//                     value={name} onChange={(e)=> setName(e.target.value)} required/>
//                 </Col>
//                 <Col>
//                 <label>Description </label>
//                 <textarea
//                     className="form-control"
//                     rows="4" 
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                     ></textarea>
//                 </Col>
//                 <Col>
//                 <label>StartDate </label>
//                     <input type="date" className="form-control" placeholder="Select StartDate" 
//                     value={startDate} onChange={(e)=> setStartDate(e.target.value)} />
//                 </Col>
//                 <Col>
//                 <label>EndDate </label>
//                     <input type="date" className="form-control" placeholder="Select EndDate" 
//                     value={endDate} onChange={(e)=> setEndDate(e.target.value)} />
//                 </Col>
//                 <Col>
//                     <button className="btn btn-primary" onClick={(e)=> handleSave(e)}>Submit</button>
//                 </Col>
//             </Row>
//             </Container>
//         <br></br>
//         <h3>Course List</h3>
//         <Table striped bordered hover>
//         <thead>
//                 <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Description</th>
//                 <th>StartDate</th>
//                 <th>EndDate</th>
//                 </tr>
//             </thead>
//             <tbody>
//             {
//                     dataCourse && dataCourse.length > 0 ?
//                     dataCourse.map((item, index) => {
//                         return(
//                             <tr key = {index}>
//                                 <td>{index + 1}</td>
//                                 <td>{item.courseName}</td>
//                                 <td>{item.description}</td>
//                                 {/* <td>{item.startDate}</td>
//                                 <td>{item.endDate}</td> */}
//                                 <td>{new Date(item.startDate).toLocaleString()}</td>
//                                 <td>{new Date(item.endDate).toLocaleString()}</td>
//                                 <td colSpan={2}>
//                                     <button className="btn btn-primary" onClick={()=> handleEdit(item.courseId)}>Edit</button> | 
//                                     <button className="btn btn-danger" onClick={()=> handleDelete(item.courseId)}>Delete</button>
//                                 </td>
//                             </tr>
//                         )
//                     })
//                     : 'Loading ...'
//                 }
//             </tbody>
//         </Table>


//         <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Update Course</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//         <Row>
//                 <Col>
//                     <input type="text" className="form-control" placeholder="Enter Course Name" 
//                     value={editName} onChange={(e)=> setEditName(e.target.value)} />
//                 </Col>
//                 <Col>
//                 <textarea
//                     className="form-control"
//                     rows="4" 
//                     value={editDescription}
//                     onChange={(e) => setEditDescription(e.target.value)}
//                     required
//                     ></textarea>
//                 </Col>
//                 <Col>
//                     <input type="date" className="form-control" placeholder="Select StartDate" 
//                     value={editStartDate} onChange={(e)=> setEditStartDate(e.target.value)} />
//                 </Col>
//                 <Col>
//                     <input type="date" className="form-control" placeholder="Select EndDate" 
//                     value={editEndDate} onChange={(e)=> setEditEndDate(e.target.value)} />
//                 </Col>
                
//             </Row>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={(e) => handleUpdate(e)}>
//             Update
//           </Button>
//         </Modal.Footer>
//       </Modal>

//     </Fragment>
//   )

// }

// export default Course;