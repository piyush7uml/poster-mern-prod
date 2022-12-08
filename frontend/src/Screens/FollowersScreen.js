
import React, { useEffect } from 'react'
import Header from '../components/Header';
import User from '../components/User';
import { useDispatch, useSelector } from 'react-redux';
import { userFollowersAction } from '../actions/userActions';
import { USER_FOLLOWERS_RESET } from '../constants/userContstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col } from 'react-bootstrap'

const FollowersScreen = ({ history }) => {


    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin

    const userFollowers = useSelector(state => state.userFollowers)

    const { loading, users, error } = userFollowers

    const userDetails = useSelector(state => state.userDetails);

    const { loading: loadingUser, user: myInfo, error: errorUser } = userDetails


    useEffect(() => {
        if (user && user.name) {

            if (!users || users.length === 0) {
                dispatch(userFollowersAction());
            }


        } else {
            history.push("/login")
        }
    }, [history, dispatch, user, users])



    useEffect(() => {
        return () => {
            dispatch({
                type: USER_FOLLOWERS_RESET
            })
        }
    }, [])



    return (
        <Header compAdd={"/followers"}>

            {loading || loadingUser ? <Loader /> : error || errorUser ? <Message variant="danger">{error ? error : errorUser}</Message> : (
                <div style={{ paddingBottom: "1rem" }}>

                    <Row>
                        <Col md={2}></Col>
                        <Col md={8}>
                            <div className="posts-border user-border py-2">
                                {users.map((user) => {
                                    return <User key={user._id} profileDetails={user} myProfileDetails={myInfo} />
                                })}
                            </div>
                        </Col>
                        <Col md={2}></Col>
                    </Row>

                </div>
            )}
        </Header>
    )
}

export default FollowersScreen
