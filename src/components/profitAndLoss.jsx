import { useState, useEffect } from "react";
import { BalanceData } from "./balanceData";
import axios from "axios";
import { BalancePerdidasYGanancias } from "./balancePerdidasYGanancias";

const baseURL = "http://localhost:3000/api";

export function ProfitAndLoss() {
  const [total, setTotal] = useState();
  const [datos, setDatos] = useState();
  const [perdidas, setPerdidas] = useState();
  const [ganancias, setGanancias] = useState();

  const extraerDatos = () => {
    axios
      .get(`${baseURL}/catalogos/4/9`)
      .then((response) => {
        console.log("data ", response.data);
        setDatos(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };
  const extraer = () => {
    axios
      .get(`${baseURL}/catalogos/4/10`)
      .then((response) => {
        console.log("Perdidas y ganancias ", response.data);
     
        setTotal(response.data[0]._retorno)
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };

  const sumaPerdidas = () => {
    axios
      .get(`${baseURL}/catalogos/4/12`)
      .then((response) => {
        console.log("SumaPerdidas ", response.data);

       setPerdidas(response.data[0].perdidas.toLocaleString("es-ES"))
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };
  const sumaGanancias = () => {
    axios
      .get(`${baseURL}/catalogos/4/11`)
      .then((response) => {
        console.log("SumaGanancias ", response.data);

        setGanancias(response.data[0].Ganancias.toLocaleString("es-ES"))
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };




  useEffect(() => {
    extraer();
    extraerDatos();
    sumaGanancias();
    sumaPerdidas();
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
                  <BalancePerdidasYGanancias
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

                <tr className={perdidas === ganancias ? '' : ''}>
                  <th scope="col" className="px-6 py-4">Total: </th>
                  <th scope="col" className="px-10 py-4">{perdidas}</th>
                  <th scope="col" className="px-10 py-4">{ganancias}</th>
               </tr>


              <tr className={total > 0 ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}>
              <th scope="col" className="px-6 py-4">
                {total <= 0 ? 'PÉRDIDAS' : 'GANANCIAS'}
              </th>

               <th scope="col" className="px-10 py-4 text-right">
               {total < 0 ? total.toLocaleString("es-Es") : ''}
               </th>
              
               <th scope="col" className="px-10 py-4 text-right">
               {total > 0 ? total.toLocaleString("es-ES") : ''}
               </th>
              </tr>


            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
