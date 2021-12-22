import *  as Yup  from 'yup';
import verifyServices from '../services/verify.services';

export const validationSchema = () => {
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
        .test("emailExists", "El email ya existe", async (value) => {
            const response  = await verifyServices.checkEmail(value)
            if (response.data.status === "success") {
                return true
            } else {
                return false
            }
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

