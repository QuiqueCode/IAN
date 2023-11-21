import { BalanceCard } from "./balanceCard"
import { ProfitAndLoss } from "./profitAndLoss"
import { GeneralBalance } from "./generalBalance"

export function Balance() {
  return (
    <div className="flex justify-center mt-14">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-lg overflow-x-auto w-full">
        <div className="flex rounded-lg items-center">
          <p className="text-black m-2 relative font-bold text-center ml-44">BALANZA DE COMPROBACIÓN</p>
        </div>
        <BalanceCard />
      </div>
  
      <div className="grid grid-cols-1 w-full">
        <div className="rounded-lg overflow-x-auto">
          <div className="flex rounded-lg items-center">
            <p className="text-black m-2 relative font-bold text-center ml-44">PÉRDIDAS Y GANANCIAS</p>
          </div>
          <ProfitAndLoss />
        </div>
        <div className="rounded-lg overflow-x-auto">
          <div className="flex rounded-lg items-center">
            <p className="text-black m-2 relative font-bold text-center ml-48">BALANCE GENERAL</p>
          </div>
          <GeneralBalance />
        </div>
      </div>
    </div>
  </div>
  

  
  );
}





