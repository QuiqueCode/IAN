
export function BalanceGeneral(props){
    return(
        <>
         <tr className="border-b dark:border-neutral-500">

                    <td className="px-6 py-4 whitespace-nowrap">{props.nombreCuenta}</td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">{props.id ==1 ? props.saldo.toLocaleString('es-ES') : ''}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{props.id == 2 || props.id == 3 ? props.saldo.toLocaleString('es-ES') : ''}</td> 
            
        </tr>
     
        </>
    )
}