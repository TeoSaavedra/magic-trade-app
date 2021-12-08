import React from 'react';
import { useForm, useFormState } from "react-hook-form";
import *  as Yup  from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import VerifyServices from '../../services/verify.services';

function validationSchema() {
    return Yup.object().shape({
      firstname: Yup.string()
        .required('Nombre es requerido')
        .max(20, 'El nombre no debe exceder los 20 caracteres'),
      lastname: Yup.string()
        .required('Apellido es requerido')
        .max(20, 'El apellido no debe exceder los 20 caracteres'),
      email: Yup.string()
        .required('Email es requerido')
        .email('Email es requerido')
        .test("emailExists", "El email ya existe", function (value) {
            return new Promise ((resolve, reject) => {
                VerifyServices.checkmail(value).then(response => {
                    if(response.status === 200) {
                        resolve(true);
                    }
                    resolve(false);
                }).catch(() => {
                    reject(true);
                });
            });
        }),
      password: Yup.string()
        .required('Contraseña es requerida')
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|]).{8,32}/,
            "Debe contener entre 8 a 30 caracteres con un minimo de una mayuscula, una minuscula, un numero y un caracter especial"
        ),
      confirmPassword: Yup.string()
        .required('Se requiere la confirmación de contraseña')
        .oneOf([Yup.ref('password'), null], 'La contraseña con coincide')
    });
}

function errorMessage(message) {
    if(message != null)
        return (
            <p className="fs-6 fw-lighter text-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle-fill me-1" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                </svg>
                {message}
            </p>
        );
}

function Form() {

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

    const { touchedFields } = useFormState({ 
        control
    });

    const onSubmit = data => console.log(data);

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
                        <label className="fs-6 fw-bold text-secondary m-1">Contraseña</label> 
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
                <div className="d-flex mb-3 justify-content-center ">
                    <button type="submit" className="btn btn-primary btn-lg">Registrarme</button>
                </div>
            </form>
        </>
    );
}

export default function Signup() {

    return(
        <React.Fragment>
            <div className="container-md py-5 px-3">
                <div className="d-flex justify-content-center">
                    <div className="bg-white shadow rounded p-3 p-md-d">
                        <Form/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}