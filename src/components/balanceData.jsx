
export function BalanceData(props){

    return(
        <>
         <tr className="border-b dark:border-neutral-500">

                    <td className="px-6 py-4 whitespace-nowrap">{props.nombreCuenta}</td>
                    <td className="px-10 py-4 whitespace-nowrap">{props.saldoNormal== 0 ? props.saldo.toLocaleString('es-ES') : ''}</td>
                    <td className="px-10 py-4 whitespace-nowrap">{props.saldoNormal == 1 ? props.saldo.toLocaleString('es-ES') : ''}</td>
            
        </tr>
     
        </>
    )
}