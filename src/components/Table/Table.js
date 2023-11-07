import React from 'react'
import './table.css'
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import { BASE_URL } from '../../services/helper';
import { NavLink } from 'react-router-dom';
import { deleteUserApi, statusUpdateApi } from '../../services/Apis';
import { ToastContainer, toast } from 'react-toastify';
import PaginationComp from '../Pagination/Pagination';

const Tables = ({ userData, deleteUser, getUsersdata, handlePrevBtn, handleNextBtn, page, pageCount, setPage }) => {
    const handleChange = async (id, status) => {
        const res = await statusUpdateApi(id, status)
        if (res.status == 200) {
            toast.success("Status updated!")
            getUsersdata()
        } else {
            toast.error("Status not updated!")
        }
        console.log(res)
    }
    return (
        <>
            <div className='container'>
                <Row>
                    <div className='col'>
                        <Card className='shadow mt-2'>
                            <Table className='align-items-center ' responsive='sm'>
                                <thead className='thead-dark'>
                                    <tr className='thead-dark' >
                                        <th>Id</th>
                                        <th>FullName</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>Status</th>
                                        <th>Profile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {userData?.length > 0 ? userData.map((ele, index) => (
                                        <tr className=' text-align-itemss-center'>
                                            <td>{index + 1 + (page - 1) * 4}</td>
                                            {/* 4= pageCount */}
                                            <td>{`${ele.fname} ${ele.lname}`} </td>
                                            <td>{ele.email}</td>
                                            <td>{ele.gender == "Male" ? "M" : "F"}</td>
                                            <td className='d-flex align-items-center'>
                                                <Dropdown className='text-center'>
                                                    <Dropdown.Toggle className='dropdown_btn bg-blue'>
                                                        <Badge bg={ele.status == "Active" ? "primary" : 'danger'}> {ele.status}<i class="fa-solid fa-angle-down"></i></Badge>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => handleChange(ele._id, "Active")} >Active</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => handleChange(ele._id, "Inactive")} >Inactive</Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                            <td className='img-parent'>
                                                <img src={`${BASE_URL}/uploads/${ele.profile}`} alt='profile' />
                                            </td>
                                            <td >
                                                <Dropdown className='text-center'>
                                                    <Dropdown.Toggle variant='light' className='action dropdown_btn '>
                                                        <i class="fa-solid fa-ellipsis-vertical"></i>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item >
                                                            <NavLink to={`userprofile/${ele._id}`} className='text-decoration-none'>
                                                                <i class="fa-solid fa-eye" style={{ color: "green" }}></i> <span>View</span>
                                                            </NavLink>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item >
                                                            <NavLink to={`edit/${ele._id}`} className='text-decoration-none'>
                                                                <i class="fa-solid fa-pencil" style={{ color: "blue" }}></i> <span>Edit</span>
                                                            </NavLink></Dropdown.Item>
                                                        <Dropdown.Item>
                                                            <div onClick={() => deleteUser(ele._id)} ><i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span></div> </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    )) :
                                        <div className='no_data text center'> No Data Found</div>
                                    }


                                </tbody>

                            </Table>
                            <PaginationComp handleNextBtn={handleNextBtn} handlePrevBtn={handlePrevBtn} page={page} pageCount={pageCount} setPage={setPage} />
                        </Card>

                    </div>


                </Row >
                <ToastContainer position="top-right" />
            </div >

        </>
    )
}

export default Tables