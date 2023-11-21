
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { DataTable } from "./accionesAsientos";

const baseURL = "http://localhost:3000/api";

export function DashCard() {

  const [buscarResultados, setBuscarResultados] = useState([]);
  const [extraerResultados, setextraerResultados] = useState([]);
  const [inputDisabled, setDisabledAsiento] = useState(true);
  const [inputValueMonto, setInputMonto] = useState("");


  const buscar = () => {
    axios.get(`${baseURL}/asientos/4/2`)
      .then((response) => {
        console.log();
        response.data[0].monto = response.data[0].monto
        setBuscarResultados(response.data);
        console.log("hola");
      })
      .catch((error) => {
        console.error("Error al buscar:", error);

      });
  };


  const extraer = (idAsiento) => {
    axios.get(`${baseURL}/asientos/4/3?idAsiento=${idAsiento}`)
      .then((response) => {
        console.log('aaaaaaa ', response.data);
        setextraerResultados(prevResults => ({
          ...prevResults,
          [idAsiento]: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };



  useEffect(() => {
    buscar();
  }, []);

  useEffect(() => {
    // Llama a extraer para cada idAsiento en buscarResultados
    buscarResultados.forEach(resultado => {
      extraer(resultado.idAsiento);
    });
  }, [buscarResultados]);

  const asientosAgrupados = buscarResultados.reduce((acc, resultado) => {
    const { idAsiento } = resultado;
    if (!acc[idAsiento]) {
      acc[idAsiento] = [];
    }
    acc[idAsiento].push(resultado);
    return acc;
  }, {});




  return (
    <>
    {console.log(asientosAgrupados)},
      {Object.keys(asientosAgrupados).map((idAsiento) => (

        <div key={idAsiento} className="overflow-x-auto">
          <div className="bg-gray-200 w-auto relative rounded-md m-5 p-4 overflow-x-auto">
            <h2>ID Asiento: {idAsiento}</h2><br />

            {extraerResultados[idAsiento] && (
              <>
                {extraerResultados[idAsiento].map((resultado, index) => (
                  <div key={index}>
                    <h2>Fecha: {resultado.fecha}</h2> <br />
                    <h2>Descripcion: {resultado.descripcion}</h2>
                  </div>
                ))}
              </>
            )}

            <table className="min-w-full text-left text-sm font-ligh">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Cuenta</th>
                  <th scope="col" className="px-6 py-4">Monto</th>
                  <th scope="col" className="px-6 py-4">Movimiento</th>
                  <th scope="col" className="px-6 py-4">ID Cuenta</th>
                  <th scope="col" className="px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {asientosAgrupados[idAsiento].map((resultado, index) => (

                  <DataTable
                    resultadoIdAsiento={resultado.idAsiento}
                    index={index}
                    resultadoNombreCuenta={resultado.nombreCuenta}
                    resultadoMovimiento={resultado.movimiento}
                    resultadoIdCuentaFK={resultado.idCuentaFK}
                    resultadoIdRegistro={resultado.idRegistro}
                    resultadoMonto={resultado.monto}
                  />

                ))}
              </tbody>

            </table>
          </div >
        </div >
      ))
      }
    </>
  )
}