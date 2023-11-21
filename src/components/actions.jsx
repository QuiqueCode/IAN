import { useState, useEffect } from 'react'
import { Card2, getData, insertValues } from './card2'
import { Card } from './card';
import { cerrar } from './card2';
import values from './card2';
import { DataCard } from './dataCard';
import { emptyValidate } from './card2';
import Swal from "sweetalert2";
import axios from 'axios';
import { BalanceData } from './balanceData';


const baseURL = "http://localhost:3000/api";



export function Acciones() {
  sessionStorage.setItem('boolean', 'true')
  const [cards, setCards] = useState([]);
  const [botonHabilitado, setBotonHabilitado] = useState(true);


  useEffect(() => {
    const resultadoCerrar = cerrar(values);
    //console.log(resultadoCerrar);
    setBotonHabilitado(resultadoCerrar);
  });

  const handleCerrarClick = () => {
    if (botonHabilitado) {
      axios.post(`${baseURL}/asientos/1`, {
        descripcion: document.getElementById('descripcion').value,
        fecha: document.getElementById('fecha').value
      })
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Asiento introducido',
            text: 'Se cerró el asiento',
          })
      for (let i = 0; i < cards.length; i++) {
        axios.post(`${baseURL}/registros/1`, {
          monto: parseFloat(cards[i].monto.replace(/\./g, '')),
          movimiento: parseInt(cards[i].db),
          idCuentaFK: cards[i].asiento
        })
      }
      document.getElementById('cartas').innerHTML="";
      setCards([])
      
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal',
        text: 'Intentelo de nuevo',
      })
  })
}

};


  const addCard = (val) => {
    const newCard = {
      asiento: val.name,
      monto: val.amount,
      db: val.data,
    };

    setCards([...cards, newCard]);
    console.log("Soy card", cards)

  };

  const handleDelete = (indexToDelete) => {
    sessionStorage.setItem('boolean', 'false');
    const updatedCards = [...cards];
    updatedCards.splice(indexToDelete, 1);
    setCards(updatedCards);

    values.splice(indexToDelete, 1);

  };


  const controllerEdit = (i, monto) => {

    const button = document.getElementById('guardar' + i);

    document.getElementById('monto' + i).style.border = "1.5px solid black";
    document.getElementById('monto' + i).style.borderRadius = "2px";

    button.addEventListener("click", () => {
      handleEdit(i, monto);
    });
    document.getElementById("guardar" + i).style.display = "block";
    document.getElementById("editar" + i).style.display = "none";
    document.getElementById("eliminar" + i).style.display = "none";
    document.getElementById('monto' + i).disabled = false;

  };



  const handleEdit = (i) => {


    document.getElementById('monto' + i).style.border = "0px solid black";

    document.getElementById("guardar" + i).style.display = "none";
    document.getElementById("editar" + i).style.display = "block";
    document.getElementById("eliminar" + i).style.display = "block";
    document.getElementById('monto' + i).disabled = true;



    let monto = document.getElementById('monto' + i).value;


    const updatedCards = [...cards];

    const cardToUpdate = updatedCards[i];
    cardToUpdate.monto = monto;
    setCards(updatedCards);
    values[i].amount = monto;
    sessionStorage.setItem('boolean', 'true');
    console.log("Soy values de metodo", values);
  };


  return (<>

    <div className='grid grid-cols-1 md:grid-cols-2 '>

      {/*First Column*/}
      <div className='bg-gray-200 p-1 m-4 w-100'>
          <Card2></Card2>

        <div className='flex items-center justify-center'>
          <button
            onClick={() => {
              if (emptyValidate()) {
                Swal.fire({
                  icon: 'error',
                  title: 'ERROR...',
                  text: 'Por favor llene todos los campos correspondientes',
                })

              } else {
                const val = insertValues();
                addCard(val);
                getData();
              }

            }}
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 m-5 rounded w-96">
            Generar
          </button>
        </div>
      </div>

      {/*Second Column*/}
      <div className='bg-gray-200 p-1 m-4'>
        <div className="mb-4 mr-3 self-end mx-auto">
        <label className="block text-gray-700 text-sm font-bold mb-2 descripcion" htmlFor="username">
            Descripción
          </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline m5" id="descripcion" type="text" placeholder="Descripción" ></input>
        </div>
        <div className="mb-4 mr-3 self-end">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Fecha de asiento
          </label>
          <input className="shadow appearance-none border rounded w-1/2 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fecha" type="date"></input>

        </div>
        <div className='flex rounded-lg bg-slate-300 items-center  m-7 gap-24 '>
          <p className="text-black m-2 relative left-12 font-bold">Tipo de Cuenta</p>
          <p className="text-black m-2 relative right-2 font-bold">Monto</p>
          <p className="text-black m-2 relative right-2 font-bold">Descripción</p>
        </div>
        <div className="max-h-40 overflow-y-auto" id="cartas">
        {
          values.map((card, index) => (
            <div key={index}>
              <Card
                id={index}
                asiento={card.name}
                monto={card.amount}
                db={card.data}
                onDelete={() => handleDelete(index)}
                onEdit={() => controllerEdit(index, card.amount)}
              />
            </div>
          ))}

          
          </div>

        <div className="relative flex items-center justify-end">
            <div className='absolute h-6 w-20 hidden ' id='animate'>
            <span className="absolute inline-flex h-6 w-20 bg-green-600 opacity-75  animate-ping right-9 "></span>
            </div>
          <button
            className={`transition-colors duration-100 ease-linear relative m-3 font-bold ${botonHabilitado
              ? 'bg-green-600 hover:bg-green-800 '
              : 'bg-gray-400 cursor-not-allowed'
              } w-32 rounded-sm text-white p-1`}
            onClick={() => {

              if (format()) {
                if (botonHabilitado) {
                  handleCerrarClick();
                }
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'ERROR...',
                  text: 'Por favor llene todos los campos correspondientes',
                })
              }
             
            }
          
          }
            disabled={!botonHabilitado}
          >
            Cerrar Asiento
          </button>

        </div>
      </div>

      {/*Third*/}
      <div className='bg-gray-200 w-lg m-5'>
      <DataCard />
    </div>
    </div>

  </>)

}


function format(){
  let fecha=document.getElementById("fecha").value;
  let descripcion=document.getElementById("descripcion").value;

  if (fecha==""||descripcion=="") {
 
    return false;
  }
  return true;
  
}

function hideInput(){
 let animate= document.getElementById("animate");
 animate.hidden=false;
}

export var datos=[];

export const extraerDatos = () => {
  axios.get(`${baseURL}/catalogos/4/7`)
    .then((response) => {
      datos=response.data;
      return <BalanceData
        datos={datos}
        >
      </BalanceData>
    })
    .catch((error) => {
      console.error("Error al buscar:", error);
    });
};

