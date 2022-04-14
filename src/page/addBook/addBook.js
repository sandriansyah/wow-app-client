import React,{useState} from "react"
import {Modal, ModalBody} from "react-bootstrap"
import "./addBook.css"
import Navbarr from "../../component/navbar/navbar"
import {Form} from "react-bootstrap"
import IconFile from "../../media/Vector2.png"
import IconAddBook from "../../media/AddBook.png"
import Swal from "sweetalert2"

import {API} from "../../config/api"
import { useNavigate } from "react-router-dom"

function AddBook(){

    const navigate = useNavigate()
    const [showSuccess,setShowSuccess]= useState(false)
    const [showFailed,setShowFailed]= useState(false)

    const [form, setForm] = useState({ 
        title: "", 
        publicationDate: "", 
        pages: "", 
        author: "", 
        isbn: "", 
        about: "", 
        bookFile: "", 
        imgCover: ""
    }); 

    const handleCloseModal = () => {
        setShowSuccess(false);
        navigate("/home")
    }

    
    const handleChange = (e) => { 
        setForm({ 
        ...form, 
        [e.target.name]: 
            e.target.type === "file" ? e.target.files : e.target.value, 
        }); 
        console.log(form);
    }; 
    
    const handleSubmit = async (e) => { 
        try { 
        e.preventDefault(); 
          // Configuration Content-type 
        const config = { 
            headers: { 
            "Content-type": "multipart/form-data", 
            }, 
        };  
        console.log(form);
          // Data body 
        const formData = new FormData(); 
        formData.set("title", form.title); 
        formData.set("publicationDate", form.publicationDate); 
        formData.set("pages", form.pages); 
        formData.set("author", form.author); 
        formData.set("isbn", form.isbn); 
        formData.set("about", form.about); 
        formData.set("bookFile", form.bookFile[0], form.bookFile[0].name); 
        formData.set("imgCover", form.imgCover[0], form.imgCover[0].name); 
    
        
        console.log(formData); 
        const body = JSON.stringify(formData)
        console.log(body);
          // Insert data user to database 
        const response = await API.post("/book", formData, config); 

        console.log(response);

        if(response.status === 200){
            // setShowSuccess(true)
            Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
            )
        }
        
        // navigate("/addbook")
        } catch (error) { 
        console.log(error); 
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        
        } 

        
    };


    return(
        <div className="addBook">

            <Modal className="mt-5" show={showSuccess} onClick={handleCloseModal} onHide={handleCloseModal} >
                <ModalBody className=" fw-bold text-primary">
                selamat . . ! <br/>
                kamu sudah menambahkan buku baru
                </ModalBody>          
            </Modal>

            <Modal show={showFailed}>
                failed
            </Modal>


            <nav>
                <Navbarr/>
            </nav>
            <div className="formAddBook">
                <h1>Add Book</h1>
                <Form fluid="md" onSubmit={handleSubmit}>
                    <Form.Group size="lg" className="mb-3" >
                        <Form.Control className="bgInput" type="text" placeholder="Title" name="title" onChange={handleChange}  />
                    </Form.Group>

                    <Form.Group size="lg" className="mb-3" >
                        <Form.Control className="bgInput" type="text" placeholder="Publication Date" name="publicationDate" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group size="lg" className="mb-3" >
                        <Form.Control className="bgInput" type="text" placeholder="Pages" name="pages" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group size="lg" className="mb-3" >
                        <Form.Control className="bgInput" type="text" placeholder="Author" name="author" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group size="lg" className="mb-3" >
                        <Form.Control className="bgInput" type="text" placeholder="ISBN" name="isbn" onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Control className="bgInput" as="textarea" type="text" rows={3} placeholder="About This Book" name="about" onChange={handleChange}/>
                    </Form.Group>


                    <label className="me-4 text-danger">
                        Attache Book File
                        <input name="bookFile" type="file" onChange={handleChange} />
                        <img src={IconFile}  />
                    </label>

                    <label className="text-danger">
                        Attache Book Cover
                        <input name="imgCover" type="file" onChange={handleChange} />
                        <img src={IconFile}  />
                    </label>

                    <div className="btnFormAddBook ">
                        <button type="submit">Add Book <img src={IconAddBook} /></button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AddBook