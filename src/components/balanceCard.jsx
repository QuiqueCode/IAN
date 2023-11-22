import { BalanceData } from "./balanceData";
import { useState,useEffect } from "react";
import axios from "axios";


const baseURL = "http://localhost:3000/api";


export function BalanceCard(){

  const [debe,setDebe]=useState();
  const [haber,setHaber]=useState();
  const [datos,setDatos]=useState();

  const extraerDatos = () => {
    axios.get(`${baseURL}/catalogos/4/7`)
      .then((response) => {
        setDatos(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };
  const extraer = () => {
    axios.get(`${baseURL}/catalogos/4/8`)
      .then((response) => {

      setDebe(response.data.debe.toLocaleString('es-ES') )
      setHaber(response.data.haber.toLocaleString('es-ES') )
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };
  
  useEffect(() => {
    extraer();
    extraerDatos();

    
  }, [],);

    return (<>
    

    
        <div className="overflow-x-auto">
          <div className="w-auto relative rounded-md m-5 p-0 overflow-x-auto">
          

            <table className="min-w-full text-left text-sm font-ligh border border-black">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="bg-gray-800 text-white">
                  <th scope="col" className="px-6 py-4">Tipo Cuenta</th>
                  <th scope="col" className="px-10 py-4">Debe</th>
                  <th scope="col" className="px-10 py-4">Haber</th>

                </tr>
              </thead>
              <tbody>
            
              {datos ? (
  datos.map((data, index) => (
    <BalanceData key={index} 
    nombreCuenta={data.nombreCuenta}
    saldoNormal={data.saldoNormal}
    saldo={data.saldo}
    /> // Asegúrate de pasar los datos a BalanceData
  ))
) : (
  <p>Cargando datos...</p> // Puedes mostrar un mensaje de carga mientras se obtienen los datos
)}
           <tr className={debe === haber ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}>
            <th scope="col" className="px-6 py-4">Total: </th>
            <th scope="col" className="px-10 py-4">{debe}</th>
            <th scope="col" className="px-10 py-4">{haber}</th>
          </tr>



              </tbody>

            </table>
          </div >
        </div >

    </>)
}