import React, { useState, useEffect, useRef } from 'react'
import { Col, Row, Image, Button, Spinner } from 'react-bootstrap'
import io from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux'
import { USER_DETAILS_SUCCESS, USER_DETAILS_RESET, USER_OTHER_RESET } from '../constants/userContstants';
import { userDetailsAction } from '../actions/userActions';
import { withRouter } from 'react-router-dom'



const User = ({ profileDetails, myProfileDetails, history }) => {

    const [profile, setProfile] = useState({})
    const [myDetails, setMyDetails] = useState({})
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)

    const { whoToFollow } = userDetails


    const socket = useRef()


    useEffect(() => {

        if (!socket.current) {
            socket.current = io("https://poster-cjlq.onrender.com")
        }

        setProfile(profileDetails)
        setMyDetails(myProfileDetails)
    }, [])


    const followHandler = () => {
        setLoading(true)
        socket.current.emit('follow', { myId: myDetails._id, userId: profile._id })
        socket.current.on('followed', ({ myProfile, newWhoToFollow }) => {
            setMyDetails(myProfile)
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: { user: myProfile, whoToFollow: newWhoToFollow }
            })

            setLoading(false)
        })
    }


    const userRedirect = () => {

        if (profile._id === myDetails._id) {
            history.push(`/myposts`)
        } else {


            history.push(`/userDetails/${profile._id}`)
        }


    }

    return (
        <div
            className='nav-border last-card-item'
        >
            <Row className='mx-1 mt-2 mb-1'>
                <Col md={8} onClick={userRedirect} className="curserPointer">
                    <Row>
                        <Col md={2}>
                            <Image
                                src={
                                    profile.photo
                                        ? profile.photo
                                        : '/images/blank.png'
                                }
                                roundedCircle
                                style={{
                                    display: 'inline-block',
                                    height: '40px',
                                    width: '40px',
                                    marginTop: '5px',

                                }}

                            />
                        </Col>

                        <Col md={9} className='pt-1 ml-3' >
                            <h5 className='d-inline-block mb-0' >
                                {' '}
                                {profile.name} {profile.lastName}
                            </h5>
                            <p className='grey-color mt-0'>
                                @{profile.userName}
                            </p>
                        </Col>
                    </Row>
                </Col>


                <Col md={4}>
                    {loading ? <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span className="sr-only">Loading...</span>
                    </Button> : (myDetails.following && myDetails._id !== profile._id) && (
                        <Button
                            variant='button'
                            className='btn btn-primary'
                            onClick={followHandler}
                        >

                            {myDetails.following.includes(profile._id) ? "Following" : "Follow"}

                        </Button>
                    )}
                </Col>




            </Row>
        </div>
    )
}

export default withRouter(User)
