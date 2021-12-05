import React from 'react';
import { useForm, useFormState } from "react-hook-form";
import *  as Yup  from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function validationSchema() {
    return Yup.object().shape({
      firstname: Yup.string()
        .required('Nombre es requerido')
        .max(20, 'El nombre no debe exceder los 20 caracteres'),
      lastname: Yup.string()
        .required('Apellido es requerido')
        .max(20, 'El apellido no debe exceder los 20 caracteres'),
      email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
      password: Yup.string()
        .required('Contraseña es requerida')
        .matches(
            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+-=|]).{8,32}/,
            "Debe contener entre 8 a 30 caracteres con un minimo de una mayuscula, una Minuscula, un unumero y un caracter especial"
        ),
      confirmPassword: Yup.string()
        .required('Se requiere la confirmación de contraseña')
        .oneOf([Yup.ref('password'), null], 'La contraseña con coincide')
    });
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
                        <p>{errors.firstname?.message}</p>
                    </div>
                    <div className="col-6">
                        <label className="fs-6 fw-bold text-secondary m-1">Apellido</label> 
                        <input className={`form-control ${ touchedFields.lastname ? ( errors.lastname ? "is-invalid": "is-valid" ) : "" } `} {...register("lastname")}/>
                        <p>{errors.lastname?.message}</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="fs-6 fw-bold text-secondary m-1">E-mail</label> 
                        <input className={`form-control ${ touchedFields.email ? ( errors.email ? "is-invalid": "is-valid" ) : "" } `} {...register("email")}/>
                        <p>{errors.email?.message}</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="fs-6 fw-bold text-secondary m-1">Contraseña</label> 
                        <input type="password" className={`form-control ${ touchedFields.password ? ( errors.password ? "is-invalid": "is-valid" ) : "" } `} {...register("password")}/>
                        <p>{errors.password?.message}</p>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <label className="fs-6 fw-bold text-secondary m-1">Confirmar contraseña</label> 
                        <input type="password" className={`form-control ${ touchedFields.confirmPassword ? ( errors.confirmPassword ? "is-invalid": "is-valid" ) : "" } `} {...register("confirmPassword")}/>
                        <p>{errors.confirmPassword?.message}</p>
                    </div>
                </div>
                <div className="d-flex mb-3 justify-content-center ">
                    <button type="submit" className="btn btn-primary btn-lg">Registrarme</button>
                </div>
            </form>
        </>
    );
}

export default function Signin() {

    return(
        <React.Fragment>
            <div className="container-md p-5">
                <div className="d-flex justify-content-center">
                    <div className="bg-white shadow rounded p-3 p-md-d">
                        <Form/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}