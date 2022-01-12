import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { verifyUser } from '../state/reducers/auth.reducer'

export default function Verify() {

    const dispatch = useDispatch()
    let params = useParams()
    const history = useNavigate()

    useEffect(() => {
        dispatch(verifyUser(params.hash)).then(
            history("/")
        )
    })

    return (
        <React.Fragment>
            <div className="container-md py-5 px-3">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Verificando...</span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}