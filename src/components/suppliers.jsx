import { useState, useEffect } from "react";
import { cerrar } from "./card2";
import values from "./card2";
import Swal from "sweetalert2";
import axios from "axios";
import { BalanceData } from "./balanceData";

const baseURL = "http://localhost:3000/api";



export function Proveedor() {
  sessionStorage.setItem("boolean", "true");
  const [cards, setCards] = useState([]);
  const [botonHabilitado, setBotonHabilitado] = useState(true);
 
  const insertarDatos = () => {
    axios.post(`${baseURL}/proveedores/2`, {
      nombre: document.getElementById("nombre").value,
      descripcion:document.getElementById("descripcion").value
    })
    alert("Se supone que ya")
  };
  
  useEffect(() => {
    const resultadoCerrar = cerrar(values);
    setBotonHabilitado(resultadoCerrar);
    
  });


  return (
    <>
      <div className="grid grid-cols-1 mt-12" style={{ width: '50%', marginLeft: '25%' }}>
      
        {/*First Column*/}
        <div className="bg-gray-200 p-1 m-4 w-100"> <strong>Datos Proveedor</strong><br/>
          <FacturasView />

          <div className="flex items-center justify-center">
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 m-5 rounded w-96"
              onClick={insertarDatos}
            >
              Guardar
            </button>
          </div>
        </div>
        <div>
          
          
        </div>
      </div>
      <TableBill></TableBill>
    </>
  );
}


function FacturasView() {
  return (
    <>
      <div>
        <div className="mb-4 mr-3 self-end">
        </div>
        <div className="mb-4 mr-3 self-end">
       
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            placeholder="Nombre"
          ></input><br /><br />
              <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="descripcion"
            type="text"
            placeholder="Descripción"
          ></input>
        </div>
        <div className="mb-4 mr-3 self-end"></div>
      </div>
    </>
  );
}


export function TableBill() {

  
  const eliminarProveedor = async (idProveedor) => {
    console.log(idProveedor);
     try {
      await axios.delete(`${baseURL}/proveedores/3`);
      buscar(); // Actualiza la lista de facturas después de pagar
    } catch (error) {
      console.error("Error al pagar la factura:", error);
    }
  };

  const [proveedor, setProveedor] = useState([]);


  const buscar = () => {
   axios.get(`${baseURL}/proveedores/1`)
      .then((response) => {
        setProveedor(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar:", error);
      });
  };

  useEffect(() => {
    buscar();

  },[proveedor]);


  return (
    <>
      <div className="overflow-x-auto p-24">
        <div className="w-auto relative rounded-md m-5 p-0 overflow-x-auto">
          <table className="min-w-full text-left text-sm font-ligh border border-black">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr className="bg-gray-800 text-white">
                <th scope="col" className="px-6  py-4">
                  IDProveedor
                </th>
                <th scope="col" className="px-10 py-4">
                  Nombre
                </th>
                <th scope="col" className="px-10 py-4">
                  Descripción
                </th>
                <th scope="col" className="px-10 py-4">
                  Acciones
                </th>

              </tr>
            </thead>
            <tbody className="">
                  {proveedor.map((resultado) => (
                    <tr key={resultado.idProveedor} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-7 py-4 ">{resultado.idProveedor}</td>
                    <td className="whitespace-nowrap px-7 py-4">{resultado.nombre}</td>
                    <td className="whitespace-nowrap px-7 py-4">{resultado.descripcion}</td>
                    <td className="whitespace-nowrap px-7 ">    
                    <button className='bg-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 m-5 rounded'
                      onClick={() => eliminarProveedor(resultado.idProveedor)}
                    >Eliminar</button></td>
                    </tr>
                  ))}
                </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
