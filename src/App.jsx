import { useState, useEffect } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers";
import Filtros from "./components/Filtros";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [ modal, setModal ] = useState(false);
  const [ animarModal, setAnimarModal ] = useState(false)

  const [ gastos, setGastos ] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );

  const [ gastoEditar, setGastoEditar ] = useState({});

  const [ filtro, setFiltro ] = useState('');
  const [ gastosFiltrados, setGastosFiltrados ] = useState([])



  useEffect(() => {
    if(Object.keys(gastoEditar).length) {
      setModal(true)
      
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
    
  }, [gastoEditar]);

  // Setting Local Storage
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

    // Save Spences on Local Storage
    useEffect( () => {
      localStorage.setItem('gastos', JSON.stringify(gastos) ?? []) 
    }, [gastos])
  
  useEffect( () => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if( presupuestoLS > 0 ) {
      setIsValidPresupuesto(true)
    }
  }, [])

  useEffect( () => {
    if( filtro ) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])


  
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  };

  const guardarGasto = gasto => {
    if(gasto.id) {
      //Apdate
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // Save gastos
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setGastoEditar({})
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false);
    }, 500);
  };

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
        <main>

          <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
          />

          <ListadoGastos
            gastos={gastos}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            gastosFiltrados={gastosFiltrados}
            filtro={filtro}
          />
        </main>
        
        <div className="nuevo-gasto">
          <img
            src={IconoNuevoGasto}
            alt="icono nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
        </>
      )}

      {modal && <Modal
                  setModal={setModal}
                  animarModal={animarModal}
                  setAnimarModal={setAnimarModal}
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                />}

      <span className="credits">Developed by <a href="https://github.com/misterdan100" target="_blank">Daniel Caceres</a></span>
    </div>


  );
}

export default App;
