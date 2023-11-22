import { BalanceData } from "./balanceData";
import axios from "axios";

const baseURL = "http://localhost:3000/api";

export function BalanceSheet(){
  
  const extraer = () => {
    axios.get(`${baseURL}/catalogos/4/5`)
      .then((response) => {
      })
      .catch((error) => {
      });
  };
    return(
        <>

        <div className="overflow-x-auto">
          <div className="bg-gray-200 w-auto relative rounded-md m-5 p-4 overflow-x-auto">
          

            <table className="min-w-full text-left text-sm font-ligh">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">Tipo Cuenta</th>
                  <th scope="col" className="px-6 py-4">Debe</th>
                  <th scope="col" className="px-6 py-4">Haber</th>

                </tr>
              </thead>
              <tbody>
          
              <BalanceData
              />
              </tbody>

            </table>
          </div >
        </div >
        
        </>
    )
}