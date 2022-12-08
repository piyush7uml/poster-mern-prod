
import React, { useEffect } from 'react'
import Header from '../components/Header';
import User from '../components/User';
import { useDispatch, useSelector } from 'react-redux';
import { userSearchAction } from '../actions/userActions';
import { USER_SEARCH_RESET } from '../constants/userContstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Row, Col } from 'react-bootstrap'

const SearchScreen = ({ history, match }) => {

    const keyword = match.params.keyword || " "

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin)
    const { user } = userLogin

    const userSearch = useSelector(state => state.userSearch)

    const { loading, users, error } = userSearch

    const userDetails = useSelector(state => state.userDetails);

    const { loading: loadingUser, user: myInfo, error: errorUser } = userDetails


    useEffect(() => {
        if (user && user.name) {

            dispatch(userSearchAction(keyword))

        } else {
            history.push("/login")
        }
    }, [dispatch, history, keyword])


    useEffect(() => {
        return () => {
            dispatch({
                type: USER_SEARCH_RESET
            })
        }
    }, [])



    return (
        <Header compAdd={"/search"}>

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

export default SearchScreen
