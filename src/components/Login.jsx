import React from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Login = () => {
  const history = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || password === "") {
      toast.error("Los campos no pueden estar vacios.");
      return;
    }

    if (email !== "" && !regexEmail.test(email)) {
      toast.error("Debes escribir una direccion de correo valida.");
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      toast.error("Credenciales invalidas.");
      return;
    }
    // eslint-disable-next-line no-lone-blocks
    {
      /*nesecito enviarle 2 cosas, una URL del endPoint de la API
        a la cual me voy a conectar, y por otro lado en formato de objeto,
        los datos que la API espera*/
    }

    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((response) => {
        toast.success("Successfully toasted!");
        const tokenRecibido = response.data.token;
        // eslint-disable-next-line no-lone-blocks
        {
          /*setItem recibe 2 argumentos, el nombre de la propiedad donde queres guardar la informacion
            (tokenrecibido) y el segundo argumento es la informacion que quieres guardar en este momento */
        }
        sessionStorage.setItem("token", tokenRecibido);
        history("/listado");
      });
  };

  let token = sessionStorage.getItem("token");

  return (
    <>
      {token && <Navigate to='/listado' />}
      <div className='row'>
        <div className='col-6 offset-3'>
          <h2>Formulario de Login</h2>
          <form onSubmit={submitHandler}>
            <label className='form-label d-block mt-2' />
            <span>Correo electronico</span>
            <br />
            <input className='form-control' type='email' name='email' />
            <label />
            <label className='form-label d-block mt-2' />
            <span>Contraseña</span>
            <br />
            <input className='form-control' type='password' name='password' />
            <label />
            <button className='btn btn-success mt-2' type='submit'>
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
