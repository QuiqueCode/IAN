import { useState, useEffect } from "react";
import { Card2, getData, insertValues } from "./card2";
import { Card } from "./card";
import { cerrar } from "./card2";
import values from "./card2";
import { DataCard } from "./dataCard";
import { emptyValidate } from "./card2";
import Swal from "sweetalert2";
import axios from "axios";
import { BalanceData } from "./balanceData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { faPieChart } from "@fortawesome/free-solid-svg-icons";
const baseURL = "http://localhost:3000/api";
import { FiltrarProveedor } from "./filtroProveedor";
import { resultadoFiltro } from "./filtroProveedor";
import { buscarFactura } from "./filtroProveedor";
export function Factura() {
  sessionStorage.setItem("boolean", "true");
  const [cards, setCards] = useState([]);
  const [botonHabilitado, setBotonHabilitado] = useState(true);
 
  function emptyValidate() {
    let nombre = document.getElementById("montoB").value;
    let monto = document.getElementById("descripcionB").value;
    let fecha = document.getElementById("fechaB").value;
    if (nombre == ""||monto==""||fecha=="" ) {
      return true;
    }
    else {
      return false;
    }
  }
    function clearInputs() {
    document.getElementById("montoB").value="";
   document.getElementById("descripcionB").value="";
    document.getElementById("fechaB").value="";
  }

  const insertarDatos = () => {

    if (emptyValidate()==true) {
       Swal.fire({
        icon: "error",
        title: "Existen campos vacios",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else{
      axios.post(`${baseURL}/facturas/1`, {
        monto: document.getElementById("montoB").value,
        idProveedorFK:document.getElementById("valorP").value,
        descripcion:document.getElementById("descripcionB").value,
        fecha:document.getElementById("fechaB").value,
        pago:0,
      })

      clearInputs();
      buscarFactura()
     
      Swal.fire({
        icon: "success",
        title: "Factura agregada",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    
  };
  
  
  useEffect(() => {
    const resultadoCerrar = cerrar(values);
    setBotonHabilitado(resultadoCerrar);
    buscarFactura()

  });

  const addCard = (val) => {
    const newCard = {
      asiento: val.name,
      monto: val.amount,
      db: val.data,
    };

    setCards([...cards, newCard]);
  };

 

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  ">
        {/*First Column*/}
        <div className="bg-gray-200 p-1 m-4 w-100">
          <FacturasView />
             <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
        Proveedor <br />
        <Selectsuppliers></Selectsuppliers>
          </label>
          <div className="flex items-center justify-center">
            <button
              className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 m-5 rounded w-96"
              onClick={insertarDatos}
            >
              Generar
            </button>
          </div>
        </div>
      </div>
      <TableBill></TableBill>
    </>
  );
}

export var datos = [];

export const extraerDatos = () => {
  axios
    .get(`${baseURL}/catalogos/4/7`)
    .then((response) => {
      datos = response.data;
      return <BalanceData datos={datos}></BalanceData>;
    })
    .catch((error) => {
      console.error("Error al buscar:", error);
    });
};

function FacturasView() {
  return (
    <>
      <div>
        <div className="mb-4 mr-3 self-end">
        </div>
        <div className="mb-4 mr-3 self-end">
       
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="montoB"
            type="text"
            placeholder="Monto"
            onChange={valueFormat}
          ></input><br /><br />
              <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="descripcionB"
            type="text"
            placeholder="Descripción"
            onChange={valueFormat}
          ></input>
        </div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Fecha de asiento
        </label>
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fechaB"
          type="date"
        ></input>

        <div className="mb-4 mr-3 self-end"></div>
      </div>
    </>
  );
}



  export const Selectsuppliers = () => {

    const [proveedor, setProveedor] = useState([]);

    const buscar = () => {
      axios.get(`${baseURL}/proveedores/1`)
        .then((response) => {
          setProveedor(response.data);

        })
        .catch((error) => {
         console.error("Error al buscar:", error);
  
        });
    };
    
    useEffect(() => {
      
      buscar();
    },[proveedor]);
  
    return( 
    <>
        <select className="p-3  text-sm  relative right-3 ml-3" name="" id="valorP">
        {proveedor.map((resultado) => (
        <option id="valor" value={resultado.idProveedor}>{resultado.nombre}</option>
    ))}
    </select>
    </>

  
      
  
  )};

function valueFormat() {
  const input = document.getElementById("montoB");

  if (input.value != "") {
    const value = input.value.replace(/\D/g, "");
    const formattedValue = parseFloat(value).toLocaleString("es-ES");
    input.value = formattedValue;

    if (input.value == "NaN") {
      Swal.fire({
        icon: "error",
        title: "Digitaste un dato no númerico",
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById("montoB").value = 0;
    }
  }
}
  
export function TableBill() {

  const pagarFactura = async (idFactura) => {
    try {
      await axios.put(`${baseURL}/facturas/5`, { _idFactura: idFactura });
      Swal.fire({
        icon: "success",
        title: "Pago generado",
        showConfirmButton: false,
        timer: 1500,
      });
      buscar(); // Actualiza la lista de facturas después de pagar
    } catch (error) {
      alert("Error al pagar la factura:", error);
    }
  };

  const [facturas, setFacturas] = useState([]);

  const buscar = () => {
    axios.get(`${baseURL}/facturas/4`)
      .then((response) => {
        setFacturas(response.data);
      })
      .catch((error) => {
        console.error("Error al buscar:", error);

      });
  };
  useEffect(() => {
    buscar();

  },[facturas]);


  return (
    <>
      <div className="overflow-x-auto">
        <div className="w-auto relative rounded-md m-5 p-0 overflow-x-auto">
          <table className="min-w-full text-left text-sm font-ligh border border-black">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr className="bg-gray-800 text-white">
                <th scope="col" className="px-6 py-4">
                  Factura
                </th>
                <th scope="col" className="px-10 py-4">
                  Fecha
                </th>
                <th scope="col" className="px-10 py-4">
                  Monto
                </th>
                <th scope="col" className="px-10 py-4">
                  Descripción
                </th>
                <th scope="col" className="px-10 py-4">
                  Proveedor
                </th>
                <th scope="col" className="px-10 py-4">
                  Acción
                </th>
                <th scope="col" className="px-5 py-2">
                <FiltrarProveedor></FiltrarProveedor>
                </th>
              </tr>
            </thead>
            {resultadoFiltro !== null && resultadoFiltro.length > 0 ? (
  // Renderizar la tabla con los resultados filtrados
  <tbody className="">
    {resultadoFiltro.map((resultado) => (
      <tr key={resultado.idCuenta} className="border-b dark:border-neutral-500">
        <td className="whitespace-nowrap px-7 ">{resultado.idFactura}</td>
        <td className="whitespace-nowrap px-7 ">{resultado.fecha}</td>
        <td className="whitespace-nowrap px-7 ">{resultado.monto}</td>
        <td className="whitespace-nowrap px-7 ">{resultado.descripcion}</td>
        <td className="whitespace-nowrap px-7 ">{resultado.nombreProveedor}</td>
        <td className="whitespace-nowrap px-7 ">
          <button
            className={`${
              resultado.pago === 1
                ? 'bg-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 m-5 rounded'
                : 'bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 m-5 rounded'
            }`}
            onClick={() => pagarFactura(resultado.idFactura)}
            disabled={resultado.pago === 1}
          >
            {resultado.pago === 1 ? 'Pagado' : 'Pagar'}
          </button>
        </td>
      </tr>
    ))}
  </tbody>
) : (
  
  <>
<h1>SIN DATOS</h1>
  </>
)}


          </table>
        </div>
      </div>
    </>
  );
}

