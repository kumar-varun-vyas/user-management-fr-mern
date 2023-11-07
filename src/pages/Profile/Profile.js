import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './profile.css'
import Spinner from '../../components/Spiner/Spiner'
import { getSingleUser } from '../../services/Apis';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../services/helper';
import moment from 'moment'
const Profile = () => {
    const [showSpin, setShowSpin] = useState(true)
    const params = useParams()
    const { id } = params
    const [user, setUser] = useState()
    useEffect(() => {
        getuserProfile(id)
        setTimeout(() => {
            setShowSpin(false)

        }, 1200)
    }, [])
    const getuserProfile = async (id) => {
        const userData = await getSingleUser(id)
        if (userData.status == 200) {
            setUser(userData.data)
        }
        else {
            console.log("single user api err")
        }
    }
    return (
        <>
            {showSpin ? <Spinner /> :
                <div className='container'>
                    <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
                        <Card.Body>
                            <Row>
                                <div className='col'>
                                    <div className='card-profile-stats d-flex justify-content-center'>
                                        <img src={`${BASE_URL}/uploads/${user.profile}`} />
                                    </div>
                                </div>
                            </Row>
                            <div className='text-center'>
                                <h3>Varun Vyas</h3>
                                <h4><i class="fa-solid fa-envelope fa-fade"></i>&nbsp;:- <span> {user.email} </span></h4>
                                <h4><i class="fa-solid fa-mobile fa-fade"></i>&nbsp;:- <span>{user.mobile}  </span></h4>
                                <h4><i class="fa-solid fa-person fa-fade"></i>&nbsp;:- <span>{user.gender}  </span></h4>
                                <h4><i class="fa-solid fa-location-dot fa-fade"></i>&nbsp;:- <span> {user.location} </span></h4>
                                <h5><i class="fa-solid fa-flag fa-fade"></i>&nbsp;Status&nbsp;:- <span> {user.status} </span></h5>
                                <h5><i class="fa-solid fa-calendar-days fa-fade"></i>&nbsp;Date Created&nbsp;:- <span>{moment(user.createdAt).format('DD-MM-YYYY')}</span></h5>
                                <h5><i class="fa-solid fa-calendar-days fa-fade"></i>&nbsp;Date Updated&nbsp;:- <span>{moment(user.updatedAt).format('DD-MM-YYYY')}</span></h5>

                            </div>
                        </Card.Body >
                    </Card >
                </div >
            }
        </>
    )
}

export default Profile