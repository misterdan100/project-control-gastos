import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { PencilSquareIcon } from '@heroicons/react/24/solid'

const ControlPresupuesto = ({ presupuesto, gastos, setPresupuesto, setGastos, setIsValidPresupuesto }) => {

    const [ porcentaje, setPorcentaje ] = useState(0)
    const [ disponible, setDisponible] = useState(0)
    const [ gastado, setGastado] = useState(0)


    useEffect(() => {
      const totalGastado = gastos.reduce( (total, gasto ) => Number(gasto.cantidad) + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        // Calculate the spended percent
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto ) * 100).toFixed(2);
        setPorcentaje(nuevoPorcentaje)

      setGastado(totalGastado)
      setDisponible( totalDisponible)
    }, [gastos])
    

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('Deseas reiniciar presupuesto y gastos?')
        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    const handleEditarPresupuesto = () => {
        setIsValidPresupuesto(false)
    }
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
                value={porcentaje}
                text={`${porcentaje} % \n Gastado`}
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                })}
            />
        </div>

        <div className='contenido-presupuesto'>
            <button className='reset-app'
                type='button'
                onClick={handleResetApp}
            >
                Resetear App
            </button>

            <p className='presupuesto'>
                <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                <PencilSquareIcon 
                    className='edit-icon'
                    onClick={handleEditarPresupuesto}    
                />
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span >Disponible: </span>{formatearCantidad(disponible)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto