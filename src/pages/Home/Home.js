import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';
import './home.css'
import Table from '../../components/Table/Table';
import Spinner from '../../components/Spiner/Spiner'
import { addData } from '../../context/ContextProvider';
import Alert from 'react-bootstrap/Alert';
import { deleteUserApi, getUsersApi, exporttocsvApi } from '../../services/Apis';
import { toast } from 'react-toastify';

const Home = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState([])
    const { userAdd, setUserAdd, userUpdatecont, setUserUpdateCont, userDelete, setUserDelete } = useContext(addData)
    const [showSpin, setShowSpin] = useState(true)
    const [search, setSearch] = useState('')
    const [gender, setGender] = useState('All')
    const [status, setStatus] = useState('All')
    const [sort, setsort] = useState('New')
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0)


    const getUsersdata = async () => {
        const users = await getUsersApi(search, gender, status, sort, page)
        if (users.status == 200) {
            setUserData(users.data.userdata)
            setPageCount(users.data.pagination.pagecount)
        }
    }
    const deleteUser = async (id) => {
        const deleteUserDate = await deleteUserApi(id)
        if (deleteUserDate.status === 200) {
            setUserDelete("User Dleted !")
            getUsersdata()
        } else {
        }
    }

    const exportUser = async () => {
        const res = await exporttocsvApi()
        if (res.status === 200) {
            window.open(res.data.downloadUrl, "blank")
        } else {
            toast.error("Issue in csv file, Try again")
        }
    }

    useEffect(() => {
        getUsersdata();
        setTimeout(() => {
            setShowSpin(false)

        }, 1200)
    }, [search, gender, status, sort, page])
    const addUser = () => {
        navigate('/register')
    }

    // pagination 
    //prev btn
    const handlePrevBtn = () => {

        setPage(() => {
            if (page === 1) return page;
            else {
                return page - 1
            }
        })

    }
    //next btn
    const handleNextBtn = () => {
        setPage((page) => {
            if (page === pageCount) return page;
            else {
                return page + 1
            }
        })

    }
    return (
        <>
            {userAdd ? <Alert variant="success" onClose={() => setUserAdd('')} dismissible>
                {userAdd.fname.toUpperCase()} added successfully!
            </Alert> : ''}
            {userUpdatecont ? <Alert variant="success" onClose={() => setUserUpdateCont('')} dismissible>
                {userUpdatecont.fname.toUpperCase()} upadate successfully!
            </Alert> : ''}
            {userDelete ? <Alert variant="success" onClose={() => setUserUpdateCont('')} dismissible>
                {userDelete.toUpperCase()}!
            </Alert> : ''}
            <div className='continer m-4 p-4 '>
                <div className='main_div'>
                    {/* search add btn  */}
                    <div className='search_add mt-4 d-flex justify-content-between '>
                        <div className='search col-lg-4'>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button variant="success" className='search_btn'>Search</Button>
                            </Form>
                        </div>
                        <div className='add_btn'>
                            <Button variant='primary' onClick={addUser}><i class="fa-solid fa-plus"></i>&nbsp; Add User</Button>
                        </div>
                    </div>
                    {/* export , gender, status */}
                    <div className='filter_div mt-5 d-flex justify-content-between flex-wrap' >
                        <div className='export_csv'>
                            <Button className='export_btn' onClick={exportUser}>Export to Csv</Button>
                        </div>
                        <div className='filter_gender'>
                            <div className='filter'>
                                <h3>
                                    Filter By Gender
                                </h3>
                                <div className='gender d-flex justify-content-between'>
                                    <Form.Check
                                        type='radio'
                                        label="All"
                                        name='gender'
                                        value={'All'}
                                        defaultChecked
                                        onChange={e => setGender(e.target.value)}
                                    ></Form.Check>
                                    <Form.Check
                                        type='radio'
                                        label="Male"
                                        name='gender'
                                        value={'Male'}
                                        onChange={e => setGender(e.target.value)}
                                    ></Form.Check><Form.Check
                                        type='radio'
                                        label="Female"
                                        name='gender'
                                        value={'Female'}
                                        onChange={e => setGender(e.target.value)}
                                    ></Form.Check>
                                </div>
                            </div>
                        </div>
                        {/* short by value */}
                        <div className='filter_newold'>
                            <h3>Short By Value</h3>
                            <Dropdown className='text-center'>
                                <Dropdown.Toggle className='dropdown_btn bg-blue'>
                                    <i class="fa-solid fa-sort"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={e => setsort('New')}>New</Dropdown.Item>
                                    <Dropdown.Item onClick={e => setsort('Old')}>Old</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className='filter_status'>
                            <div className='status'>
                                <h3>
                                    Filter By status
                                </h3>
                                <div className='status d-flex justify-content-between'>
                                    <Form.Check
                                        type='radio'
                                        label="All"
                                        name='status'
                                        value={'All'}
                                        defaultChecked
                                        onChange={e => setStatus(e.target.value)}
                                    ></Form.Check>
                                    <Form.Check
                                        type='radio'
                                        label="Active"
                                        name='status'
                                        value={'Active'}
                                        onChange={e => setStatus(e.target.value)}
                                    ></Form.Check><Form.Check
                                        type='radio'
                                        label="Inactive"
                                        name='status'
                                        value={'Inactive'}
                                        onChange={e => setStatus(e.target.value)}
                                    ></Form.Check>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {showSpin ? <Spinner /> :
                    <Table
                        userData={userData}
                        deleteUser={deleteUser}
                        getUsersdata={getUsersdata}
                        handlePrevBtn={handlePrevBtn}
                        handleNextBtn={handleNextBtn}
                        page={page}
                        pageCount={pageCount}
                        setPage={setPage}

                    />}

            </div>
        </>
    )
}

export default Home