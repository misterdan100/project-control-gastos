import { React, useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto}) => {

    const [ mensaje, setMensaje ] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();
        if (!Number(presupuesto) || Number(presupuesto < 0)) {
            setMensaje('No es un presupesto valido!');
        } else {
            setMensaje('Es un presupuesto valido!');
        }
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label >Definir presupuesto $</label>
                <input
                    type="text"
                    className='nuevo-presupuesto'
                    placeholder='Añade tu Presupuesto'
                    value={presupuesto}
                    onChange={ e => setPresupuesto(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value="Añadir"
            />

            {mensaje && <Mensaje
                tipo='error'
            >{mensaje}</Mensaje>}

        </form>
    </div>
  )
}

export default NuevoPresupuesto