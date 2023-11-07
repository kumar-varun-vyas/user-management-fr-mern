import React, { useEffect, useState, useContext } from 'react'
import './edit.css'


import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select'
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../components/Spiner/Spiner'
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleUser, updateUserApi } from '../../services/Apis';
import { BASE_URL } from '../../services/helper';
import { addData } from '../../context/ContextProvider';

const Edit = () => {
    const { id } = useParams()
    const { userUpdatecont, setUserUpdateCont } = useContext(addData)
    const navigate = useNavigate()
    const options = [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
    ]

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
    const [image, setImage] = useState('')
    const [preview, setPreview] = useState('')
    const [userProfile, setUserProfile] = useState()

    const [showSpin, setShowSpin] = useState(true)


    const getuserProfile = async () => {
        // console.log("userData")
        const userData = await getSingleUser(id)
        console.log(userData)
        if (userData.status == 200) {
            const data = userData.data
            setInputData(data)
            setUserProfile(data.profile)
            setStatus(data.status)
        }
        else {
            console.log("single user api err")
        }
    }

    const setInputChange = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputData, [name]: value })
    }
    const setStatusChange = (e) => {
        console.log(e.value)
        setStatus(e.value)
    }
    const setImageChange = (event) => {

        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    }
    console.log("input----", inputData)
    const onSubmit = async (e) => {
        e.preventDefault();
        const { fname, lname, mobile, email, gender, location } = inputData;
        console.log("ddddddd-------", email, status, 'i', image, 'p', userProfile)
        if (fname === '') {
            toast.error("First name is required")
        } else if (lname === '') {
            toast.error("Last name is required")
        } else if (email === '') {
            toast.error("Enter Email  ")
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
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
            data.append("user_profile", image || userProfile)
            const header = {
                "Content-Type": "multipart/form-data"
            }
            const response = await updateUserApi(id, data, header)
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
                setUserUpdateCont(response.data)
                navigate('/')
            }

        }

    }
    useEffect(() => {
        getuserProfile()
    }, [id])
    useEffect(() => {
        if (image) {
            setUserProfile('')
            setPreview(URL.createObjectURL(image))
        }


        setTimeout(() => {
            setShowSpin(false)

        }, 1200)
    }, [image])


    return (
        <>
            {showSpin ? <Spinner /> :

                <div className='container'>
                    <h2 className='text-center mt-1'>Update your details</h2>
                    <Card className='shadow m-3 p-3'>
                        <div className='profile_div text-center m-3'>
                            <img src={image ? URL.createObjectURL(image) : `${BASE_URL}/uploads/${userProfile}`} />
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
                                        checked={inputData.gender == 'Male' ? true : false}
                                    ></Form.Check>
                                    <Form.Check
                                        type='radio'
                                        label="Female"
                                        name='gender'
                                        value={'Female'}
                                        onChange={setInputChange}
                                        checked={inputData.gender == 'Female' ? true : false}

                                    ></Form.Check>
                                </Form.Group>
                                <Form.Group className="mb-3 col-lg-6" controlId="formBasicStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Select options={options} onChange={setStatusChange} defaultValue={inputData.status} />
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

export default Edit