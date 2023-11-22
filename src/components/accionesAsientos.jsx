import { faPenToSquare, faScaleBalanced, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import axios from 'axios';
import { alert } from "@material-tailwind/react";


const baseURL = "http://localhost:3000/api";

export function DataTable(props){

    const [inputValueMonto, setInputMonto] = useState(props.resultadoMonto.toLocaleString('es-ES'));
    const [inputDisabled, setDisabledAsiento] = useState(true);

    function valueFormat(id) {
      const input = document.getElementById(id);
  
      if (input.value !== "") {
        const value = input.value.replace(/\D/g, '');
        const formattedValue = parseFloat(value).toLocaleString('es-ES');
        input.value = formattedValue;
        setInputMonto(input.value);
  
        if (input.value === "NaN") {
          Swal.fire({
            icon: 'error',
            title: 'Digitaste un dato no numérico',
            showConfirmButton: false,
            timer: 1500
          });
          setInputMonto(0);
        }
      }
    }
  

    const controllerEdit = (idAsiento, i, idRegistro) => {
        
        const button = document.getElementById("guardar" + i);
        document.getElementById("m" + i).style.border = "1.5px solid black";
        document.getElementById("m" + i).style.borderRadius = "2px";
        button.addEventListener("click", () => {
          handleEdit(i, idRegistro);
        });
        document.getElementById("editar" + i).style.display = "none";
        document.getElementById("guardar" + i).style.display = "block";
        document.getElementById('m' + i).disabled = false;
    
      };
      const handleEdit = (i, idRegistro) => {
        let nMonto = document.getElementById('m' + i).value;

    nMonto = parseFloat(nMonto);
        axios.put(`${baseURL}/registros/3`, {
            idRegistro: idRegistro,
            monto: nMonto
          })
          .then((response) => {
          })
          .catch((error) => {
            console.error("Error al buscar:", error);
    
          });
    
        document.getElementById('m' + i).style.border = "0px solid black";
        document.getElementById("guardar" + i).style.display = "none";
        document.getElementById("editar" + i).style.display = "block";
        document.getElementById('m' + i).disabled = true;
    
      };
    

    return(
        <>
    <tr key={`A${props.resultadoIdAsiento}${props.index}`} className="border-b dark:border-neutral-500">
                    <td className="px-6 py-4 whitespace-nowrap">{props.resultadoNombreCuenta}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><input type="text" id={`m${props.resultadoIdAsiento}${props.index}`} disabled={inputDisabled}
                       value={inputValueMonto}
                       onChange={(e) => {
                       setInputMonto(e.target.value);
                       valueFormat(`m${props.resultadoIdAsiento}${props.index}`);
                       }}/></td>
                    <td className="px-6 py-4 whitespace-nowrap">{props.resultadoMovimiento}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {props.resultadoIdCuentaFK}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* Botón con estilo y onClick */}
                      <button
                        className="hover:bg-green-200 p-2 rounded-full m-1"
                        id={`editar${props.resultadoIdAsiento}${props.index}`} // Utiliza template literals para concatenar el índice
                        style={{ backgroundColor: "transparent", color: "#FFC400" }}
                        onClick={() => { controllerEdit(props.resultadoIdAsiento, `${props.resultadoIdAsiento}${props.index}`, props.resultadoIdRegistro); setDisabledAsiento(false); }} // Define tu función handleClick aquí
                      >
                        <FontAwesomeIcon className="text-xl" icon={faPenToSquare} />
                      </button>
                      <button className="hover:bg-green-200 ... m-3" id={`guardar${props.resultadoIdAsiento}${props.index}`} style={{ display: "none", right: "80px", color: "#0257EB" }}><FontAwesomeIcon className="text-xl " icon={faCheck} /></button>
                    </td>
                  </tr>
        </>
    )
}

function format(){

}