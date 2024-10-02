import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { OpenDirectoryArgs } from '../main/handlers/file-system';
import { Button } from './components/ui/button';

const handleViewDirectory = (input: boolean) => {
  const path =
    document.getElementById(input ? 'input-path' : 'output-path')
      ?.textContent || '';
  window.fileSystem.openDirectory({ path } as OpenDirectoryArgs);
};

function JobViewDetails() {
  // const { jobId } = useParams();

  const modelUid = 'model-a1b2c3d4';

  return (
    <div className=" w-full mt-6">
      <h1 className="font-bold text-lg md:text-xl lg:text-3xl mb-4">
        Job Details
      </h1>
      <div className="text-md lg:text-lg w-full">
        <div className="">
          <h1 className="font-bold mb-4">Start</h1>
          <div className="p-2 border border-slate-400 bg-slate-200 rounded-lg w-full">
            {' '}
            1:34pm, September 18, 2024
          </div>
        </div>
        <div>
          <h1 className="font-bold my-4">Inputs</h1>
          <div className="flex flex-row border border-slate-400 rounded-lg w-full justify-between p-2">
            <div className="" id="input-path">
              C:/
            </div>
            <Button
              className="text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 px-2 rounded-lg"
              onClick={() => handleViewDirectory(true)}
            >
              View
            </Button>
          </div>
        </div>
        <div>
          <h1 className="font-bold my-4">Output</h1>
          <div className="flex flex-row border border-slate-400 rounded-lg w-full justify-between p-2">
            <div className="" id="output-path">
              C:/AppData
            </div>
            <Button
              className="text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 px-2 rounded-lg"
              onClick={() => handleViewDirectory(false)}
            >
              View
            </Button>
          </div>
        </div>
        <div>
          <h1 className="font-bold my-4">Model</h1>
          <div className="flex flex-row border border-slate-400 rounded-lg w-full justify-between p-2">
            <div className="">Image Super Resolution</div>
            <Link
              to={`/models/${modelUid}/details`}
              className="text-black text-base font-normal bg-slate-300 hover:-translate-y-0.5 hover:bg-slate-200 transition-all py-2 px-2 rounded-lg"
            >
              Inspect
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobViewDetails;
