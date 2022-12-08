import React from 'react'
import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner animation="border" role="status" style={{ display: 'block', margin: "1rem auto" }}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default Loader
