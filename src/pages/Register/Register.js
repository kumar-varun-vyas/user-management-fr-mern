import React, { useContext, useEffect, useState } from 'react'
import './register.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spiner/Spiner';
import { getSingleUser, registerApi } from '../../services/Apis';
import { useNavigate, useParams } from 'react-router-dom'
import { addData } from '../../context/ContextProvider';


const Register = () => {

    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ]
    const navigate = useNavigate()
    const { userAdd, setUserAdd } = useContext(addData)
    const [inputData, setInputData] = useState(
        {
            fname: '',
            lname: '',
            mobile: '',
            email: '',
            gender: '',
            location: '',
        }
    )
    const [status, setStatus] = useState("");
    const [image, setImage] = useState("")

    const [showSpin, setShowSpin] = useState(true)

    useEffect(() => {

        setTimeout(() => {
            setShowSpin(false)

        }, 1200)
    }, [])




    const setInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }
    const setStatusChange = (e) => {
        setStatus(e.value)
    }
    const setImageChange = (e) => {
        setImage(e.target.files[0])
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        const { fname, lname, mobile, email, gender, location } = inputData;
        if (fname === '') {
            toast.error("First name is required")
        } else if (lname === '') {
            toast.error("Last name is required")
        } else if (email === '') {
            toast.error("Enter Email  ")
        } else if (! /^\S+@\S+$/.test(email)) {
            toast.error("Enter valid Email  ")
        } else if (mobile === '') {
            toast.error("Mobile  is required")
        } else if (mobile?.length < 10) {
            toast.error("Mobile is invalid ")
        } else if (location === '') {
            toast.error("location is required")
        } else if (gender === '') {
            toast.error("Gender is required")
        }
        else if (status === '') {
            toast.error("Status is required")
        } else if (image === '') {
            toast.error("Profile is required")
        } else {
            console.log(fname, lname, mobile, email, gender, location, status, image)
            const data = new FormData()
            data.append("fname", fname)
            data.append("lname", lname)
            data.append("email", email)
            data.append("mobile", mobile)
            data.append("status", status)
            data.append("gender", gender)
            data.append("location", location)
            data.append("user_profile", image)
            const header = {
                "Content-Type": "multipart/form-data"
            }

            const response = await registerApi(data, header)
            console.log(response)
            if (response.status === 200) {
                setInputData({
                    fname: '',
                    lname: '',
                    mobile: '',
                    email: '',
                    gender: '',
                    location: '',
                })
                setImage('')
                setStatus('')
                setUserAdd(response.data)
                navigate('/')
            }
            else {
                toast.error("Error")
            }

        }




    }


    return (
        <>

            {showSpin ? <Spinner /> :
                <div className='container'>
                    <h2 className='text-center mt-1'>Register your details</h2>
                    <Card className='shadow m-3 p-3'>
                        <div className='profile_div text-center m-3'>
                            <img src={image ? URL.createObjectURL(image) : '/logo192.png'} />
                        </div>
                        <Form >
                            <Row>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicfname">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name='fname' placeholder='Enter FirstName' onChange={setInputChange} value={inputData.fname} />

                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasiclname">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name='lname' placeholder='Enter LastName' onChange={setInputChange} value={inputData.lname} />

                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name='email' placeholder='Enter Email' onChange={setInputChange} value={inputData.email} />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicMobile">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control type="text" name='mobile' placeholder='Enter Mobile no.' onChange={setInputChange} value={inputData.mobile} />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicGender">
                                    <Form.Label>Select Your Gender</Form.Label>
                                    <Form.Check
                                        type='radio'
                                        label="Male"
                                        name='gender'
                                        value={'Male'}
                                        onChange={setInputChange}
                                    ></Form.Check>
                                    <Form.Check
                                        type='radio'
                                        label="Female"
                                        name='gender'
                                        value={'Female'}
                                        onChange={setInputChange}
                                    ></Form.Check>
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Select options={options} onChange={setStatusChange} />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicFile">
                                    <Form.Label>Enter Your Profile</Form.Label>
                                    <Form.Control type="file" name='user_profile' onChange={setImageChange} placeholder='Enter profile.' />
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicLocation">
                                    <Form.Label>Enter Your Location</Form.Label>
                                    <Form.Control type="text" name='location' placeholder='Enter Location' onChange={setInputChange} value={inputData.location} />
                                </Form.Group>
                            </Row>


                            <Button variant="primary" type="submit" onClick={onSubmit}>
                                Submit
                            </Button>
                        </Form>


                    </Card>
                    <ToastContainer position="top-center" />
                    {/* Same as */}
                </div>
            }
        </>
    )
}

export default Register