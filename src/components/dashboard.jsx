import { DashCard } from "./asientos";

export function Dashboard() {
  return (
    <>
      <div className="flex justify-center items-center mt-14 ">
      <div className="bg-slate-500 w-auto relative rounded-lg overflow-x-auto">
          <div className='flex rounded-lg bg-slate-300 items-center  m-7 '>
            <p className="text-black m-2 relative font-bold">Asientos</p>
          </div>
          <DashCard></DashCard>
        </div>
        
      </div>

    </>
  );
}

