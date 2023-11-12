import { React, useState} from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [ mensaje, setMensaje ] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();

        //* Validating form
        if (!Number(presupuesto) || Number(presupuesto < 0)) {
            setMensaje('No es un presupesto valido!');
            return
        }

        //* Reset mesaje if the value is right
        setMensaje('')
        setIsValidPresupuesto(true)

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form onSubmit={handlePresupuesto} className='formulario'>
            <div className='campo'>
                <label >Definir presupuesto $</label>
                <input
                    type="number"
                    className='nuevo-presupuesto'
                    placeholder='Añade tu Presupuesto'
                    value={presupuesto}
                    onChange={ e => setPresupuesto(Number(e.target.value))}
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