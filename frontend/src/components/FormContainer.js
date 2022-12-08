import React from 'react'
import { Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
    return (
        <Row className="vh-100">
            <Col md={3}></Col>

            <Col md={6}>
                {children}
            </Col>

            <Col md={3}></Col>
        </Row>
    )
}

export default FormContainer
