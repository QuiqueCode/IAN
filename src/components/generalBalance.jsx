import { useState, useEffect } from "react";
import { BalanceData } from "./balanceData";
import axios from "axios";
import { BalanceGeneral } from "./balanceGeneral";

const baseURL = "http://localhost:3000/api";

export function GeneralBalance() {

  const [datos, setDatos] = useState();
  const [debe, setDebe] = useState();
  const [haber, setHaber] = useState();

  const extraerDatos = () => {
    axios
      .get(`${baseURL}/catalogos/4/13`)
      .then((response) => {
        setDatos(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };


  const balanceGeneral = () => {
    axios
      .get(`${baseURL}/catalogos/4/14`)
      .then((response) => {
       setDebe(response.data[0].debe.toLocaleString('es-ES'));
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };

  const balanceGeneralHaber = () => {
    axios
      .get(`${baseURL}/catalogos/4/15`)
      .then((response) => {
       setHaber(response.data[0].haber.toLocaleString('es-ES'));
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };




  useEffect(() => {
    extraerDatos();
    balanceGeneral();
    balanceGeneralHaber();
  }, []);
  return (
    <>
      <div className="overflow-x-auto">
        <div className="w-auto relative rounded-md m-5 p-0 overflow-x-auto">
          <table className="min-w-full text-left text-sm font-ligh border border-black">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr className="bg-gray-800 text-white">
                <th scope="col" className="px-6 py-4">
                  Tipo Cuenta
                </th>
                <th scope="col" className="px-6 py-4">
                  Debe
                </th>
                <th scope="col" className="px-6 py-4">
                  Haber
                </th>
              </tr>
            </thead>
            <tbody>
              {datos ? (
                datos.map((data, index) => (
                  <BalanceGeneral
                    key={index}
                    id={data.idCuenta[0]}
                    nombreCuenta={data.nombreCuenta}
                    saldoNormal={data.saldoNormal}
                    saldo={data.saldo}
                  /> 
                ))
              ) : (
                <p>Cargando datos...</p> 
              )}
                <tr className={debe === haber ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}>
                  <th scope="col" className="px-6 py-4">Total: </th>
                  <th scope="col" className="px-10 py-4">{debe}</th>
                  <th scope="col" className="px-10 py-4">{haber}</th>
                </tr>
            </tbody>

          </table>
        </div>
      </div>
    </>
  );
}
