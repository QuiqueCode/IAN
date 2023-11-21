import { faPenToSquare, faScaleBalanced, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Swal from "sweetalert2";



export function Card(props) {

  const [inputValueAsiento, setInputAsiento] = useState(props.asiento);
  const [inputValueMonto, setInputMonto] = useState(props.monto);
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

  return (
    <>
      <div className="flex m-7 gap-4 shadow-xl items-center bg-white h-16" id={props.id}>
        <div className="p-4 relative top-9 w-7 h-7  rounded-full flex items-center justify-center " style={{
          color: "white", top: "-25px", left: "-20px", marginLeft: "10px", backgroundColor: props.db == 0 ? "green" : "red"
        }}>
          <FontAwesomeIcon icon={faScaleBalanced} />
        </div>

        <input type="text" id="asi" className="text-black m-3 " disabled style={{ minWidth: "110px", maxWidth: "110px" }} value={inputValueAsiento}
          onChange={(e) => setInputAsiento(e.target.value)} />

        <p>$</p><input type="text" id={"monto" + props.id} className="text-black m-1" disabled={inputDisabled} style={{ minWidth: "100px", maxWidth: "90px" }} value={inputValueMonto}
          onChange={(e) => {
            setInputMonto(e.target.value);
            valueFormat("monto" + props.id);
          }} />

        <div className="flex">
          <div className="mr-10">
          </div>
          <button className="hover:bg-yellow-100 ... m-2" id={"editar" + props.id} onClick={(e) => { props.onEdit(); setDisabledAsiento(false); }} style={{ color: "#333" }}><FontAwesomeIcon className=" text-xl " icon={faPenToSquare} /></button>
          <button className="hover:bg-red-100 ..." id={"eliminar" + props.id} onClick={props.onDelete} style={{ right: "80px", color: "#901818" }}><FontAwesomeIcon className="text-xl " icon={faTrash} /></button>
          <button className="hover:bg-green-200 ... m-3" id={"guardar" + props.id} style={{ display: "none", right: "80px", color: "#0257EB" }}><FontAwesomeIcon className="text-xl " icon={faCheck} /></button>

        </div>
      </div>


    </>
  )
}
