import axios from 'axios';
import React, { useEffect, useState } from 'react';

const baseURL = "http://localhost:3000/api";

export function DataCard() {

  const [buscarTexto, setbuscarTexto] = useState("1");
  
  const [buscarResultados, setbuscarResultados] = useState([]);

  const buscar = (buscarTexto) => {
    axios.get(`${baseURL}/catalogos/4/2?categoria=${buscarTexto}`)
      .then((response) => {
        setbuscarResultados(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };

  useEffect(() => {
    buscar(buscarTexto);
  }, [buscarTexto]);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontWeight: 'bold' }}>CATÁLOGO DE CUENTAS</h2>
      </div>

      <div className="flex flex-col">
        <div className="mb-4 flex justify-end">
          <div className="relative">
            <select className="block w-full p-3 mb-6 text-sm mr-4 relative right-3 top-8" name="" id="" onChange={(e) => {
              const nuevoValor = e.target.value;
              setbuscarTexto(nuevoValor);
              buscar(nuevoValor);
            }}>

              <option value="1">Activos</option>
              <option value="2">Pasivos</option>
              <option value="3">Capital Social</option>
              <option value="4">Gastos</option>
              <option value="5">Ingresos</option>
            </select>
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">

            </div>
          </div>
        </div>
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">Código del asiento</th>
                    <th scope="col" className="px-6 py-4">Nombre del asiento</th>
                  </tr>
                </thead>
                <tbody>
                  {buscarResultados.map((resultado) => (
                    <tr key={resultado.idCuenta} className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap px-6 py-4 font-medium cursor-pointer " onClick={(e) => {
                        document.getElementById('nombre').value = resultado.idCuenta;
                      }}>{resultado.idCuenta}</td>
                      <td className="whitespace-nowrap px-6 py-4">{resultado.nombreCuenta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}