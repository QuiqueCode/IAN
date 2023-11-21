import { faScaleBalanced } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import { useState } from "react";
import Swal from "sweetalert2";
import InputMask from 'react-input-mask';

export function Card2() {
  const [maskedValue, setMaskedValue] = useState('');

  const handleInputChange = (event) => {
    // Obtiene el valor actual del campo de entrada con máscara
    const maskedInputValue = event.target.value;

    // Actualiza el estado con el valor del campo de entrada con máscara
    setMaskedValue(maskedInputValue);
  };
  return (


    <div>
      <div className="mb-4 mr-3 self-end">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Nombre de asiento
        </label>
        <InputMask
          mask="9-99-999"

          onChange={handleInputChange}
          placeholder="1-11-111"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="nombre"

        />
      </div>
      <div className="mb-4 mr-3 self-end">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Monto
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="monto" type="text" placeholder="Monto" onChange={valueFormat}></input>
      </div>


      <div className="mb-4 mr-3 self-end">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Tipo de cuenta
        </label>
        <Selection></Selection>
      </div>
    </div>
);

}

var values = [];
var data;

export default values;
export function getData() {
  //const id = uuidv4();
  let valuesObj = {
    // id,
    name: document.getElementById('nombre').value,
    amount: document.getElementById('monto').value,
    data
  };
  values.push(valuesObj);
  console.log(values);
  resetValue();

  return values.length - 1;
}

export function cerrar(values) {
  let debe = 0;
  let haber = 0;
  let entro = false;

  for (let index = 0; index < values.length; index++) {
    const amount = parseFloat(values[index].amount.replace(/\./g, ''));
    if (values[index].data == 0) {
      debe += amount;
      console.log("DEBEEEEEEEEEEEEEEE",debe)
    } else {
      haber += amount;
      console.log("haaaaaaabeeeeeeeeeerrrrrrrrr",haber)
    }

    entro = true;
  }

  if (!entro && debe === haber) {
    return false;
  } else if (entro && debe === haber) {
    return true;
  } else {
    return false;
  }
}


function resetValue() {
  console.log("hola")
  document.getElementById('nombre').value = "";
  document.getElementById('monto').value = "";



}

const options = [
  {
    value: "0",
    label: (
      <div>
        <FontAwesomeIcon icon={faScaleBalanced} style={{ color: "green" }} /> Debe
      </div>
    ),
  },
  {
    value: "1",
    label: (
      <div>
        <FontAwesomeIcon icon={faScaleBalanced} style={{ color: "red" }} /> Haber
      </div>
    ),
  },
];

export const Selection = () => {

  const [selectedValue, setSelectedValue] = useState(options[0]);
  const handleSelectChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };
  data = selectedValue.value;

  return <Select
    className="w-100 ml-3"
    id="selection"
    options={options}
    defaultValue={options[0]}
    value={selectedValue}
    onChange={handleSelectChange}
  />

    ;

};

export function insertValues() {
  let val = {
    name: document.getElementById('nombre').value,
    amount: document.getElementById('monto').value,
    data
  };
  return val;
}

export function emptyValidate() {
  let nombre = document.getElementById("nombre").value;
  let monto = document.getElementById("monto").value;


  const nuevaCadena = nombre.replace(/[-_]/g, "");

  if (nombre == "" || monto == "" || nuevaCadena.length != 6) {
    return true;
  }
  else {
    return false;
  }
}


function valueFormat() {
  const input = document.getElementById("monto");

  if (input.value != "") {
    const value = input.value.replace(/\D/g, '');
    const formattedValue = parseFloat(value).toLocaleString('es-ES');
    input.value = formattedValue;

    if (input.value == "NaN") {
      Swal.fire({

        icon: 'error',
        title: 'Digitaste un dato no númerico',
        showConfirmButton: false,
        timer: 1500
      });
      document.getElementById("monto").value = 0;
    }
  }
}