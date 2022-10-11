import React from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const Buscador = () => {
  const history = useNavigate();
  <Toaster position='top-center' reverseOrder={false} />;

  const submitHandler = (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-lone-blocks
    {
      /* currentTargent me permite acceder a los inputs atravez de su atributo name
        en este caso el atributo name es keyword */
    }
    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      toast.error("Tienes que escribir una palabra clave.");
    } else if (keyword.length < 4) {
      toast.error("Tienes que escribir mas de 4 caracteres.");
    } else {
      e.currentTarget.keyword.value = "";
      history(`/resultados?keyword=${keyword}`);
    }
  };
  return (
    <div>
      <div>
        <Toaster />
      </div>
      <form onSubmit={submitHandler} className='d-flex aling-items-center'>
        <label className='form-label mb-0 mx-2 ' />
        <input
          className='form-control'
          type='text'
          name='keyword'
          placeholder='Escribe una palabra clave...'
        />
        <label />
        <button className='btn btn-success ' type='submit'>
          Buscar
        </button>
      </form>
    </div>
  );
};

export default Buscador;
