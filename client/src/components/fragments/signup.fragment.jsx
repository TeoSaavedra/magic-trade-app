import React, { useState, useRef, useEffect } from 'react'
import { useForm, useFormState } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { registerUser } from '../../state/reducers/auth.reducer'
import { validationSchema } from '../../validation/schema'


function Form() {

    const [sending, setSending] = useState(false)
    const history = useNavigate()
    const dispatch = useDispatch()
    const tooltipSvg = useRef(null)

    useEffect(() => {
        new window.bootstrap.Tooltip(tooltipSvg.current,{boundary: document.body})
    })

    const { register, handleSubmit, formState:{ errors }, control } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema()),
        defaultValues: {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
            confirmPassword: null
        }
    })

    const { touchedFields } = useFormState({ control });

    const onSubmit = data => {
        setSending(true)
        dispatch(registerUser(data)).then(
            history("/")
        )
    }

    function errorMessage(message) {
        if(message != null)
            return (
                <span className="fs-6 fw-lighter text-danger text-break">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle-fill me-1" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                    </svg>
                    {message}
                </span>
            )
    }

    return (
        <>
            <div className="row">
                <div className="col p-5">
                    <h3 className="text-center">Bienvenidos a MTG Gems</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="fs-4 fw-bold text-primary">Nueva Cuenta</label>
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mb-3">
                    <div className="col-6">
                        <label className="fs-6 fw-bold text-secondary m-1">Nombre</label> 
                        <input className={`form-control ${ touchedFields.firstname ? ( errors.firstname ? "is-invalid": "is-valid" ) : "" } `} {...register("firstname")}/>
                        {errorMessage(errors.firstname?.message)}
                    </div>
                    <div className="col-6">
                        <label className="fs-6 fw-bold text-secondary m-1">Apellido</label> 
                        <input className={`form-control ${ touchedFields.lastname ? ( errors.lastname ? "is-invalid": "is-valid" ) : "" } `} {...register("lastname")}/>
                        {errorMessage(errors.lastname?.message)}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="fs-6 fw-bold text-secondary m-1">E-mail</label> 
                        <input className={`form-control ${ touchedFields.email ? ( errors.email ? "is-invalid": "is-valid" ) : "" } `} {...register("email")}/>
                        {errorMessage(errors.email?.message)}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="fs-6 fw-bold text-secondary m-1">
                            <span>Contraseña </span>
                            <span ref={tooltipSvg} data-bs-toggle="tooltip" data-bs-placement="right" title="La contraseña debe contener entre 8 a 30 caracteres con un minimo de una mayuscula, una minuscula, un numero y un caracter especial">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                                </svg>
                            </span>
                        </label> 
                        <input type="password" className={`form-control ${ touchedFields.password ? ( errors.password ? "is-invalid": "is-valid" ) : "" } `} {...register("password")}/>
                        {errorMessage(errors.password?.message)}
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="fs-6 fw-bold text-secondary m-1">Confirmar contraseña</label> 
                        <input type="password" className={`form-control ${ touchedFields.confirmPassword ? ( errors.confirmPassword ? "is-invalid": "is-valid" ) : "" } `} {...register("confirmPassword")}/>
                        {errorMessage(errors.confirmPassword?.message)}
                    </div>
                </div>
                <div className="d-flex mb-3 justify-content-center">
                    <button type="submit" className="btn btn-primary btn-lg">
                        {sending ? 
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div> 
                            : "Registrarme"}
                    </button>
                </div>
            </form>
        </>
    )
}

export default function Signup() {

    return(
        <React.Fragment>
            <div className="container-md py-5 px-3">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-10 col-lg-8 col-xl-6 col-xxl-4">
                        <div className="bg-white shadow rounded p-3 p-md-d">
                            <Form/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}