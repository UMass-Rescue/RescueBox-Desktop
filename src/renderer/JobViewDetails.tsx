import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { Button } from './components/ui/button';

function JobViewDetails() {
  // const { jobId } = useParams();

  const modelUid = 'model-a1b2c3d4';

  return (
    <div className=" w-full mt-6">
      <h1 className="font-bold text-lg md:text-xl lg:text-3xl mb-4">
        Job Details
      </h1>
      <div className="text-md md:text-sm lg:text-lg w-full">
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
            <div className="">F:/USB/</div>
            <Button className="bg-inherit text-black border border-black font-semibold hover:bg-slate-300">
              View
            </Button>
          </div>
        </div>
        <div>
          <h1 className="font-bold my-4">Output</h1>
          <div className="flex flex-row border border-slate-400 rounded-lg w-full justify-between p-2">
            <div className="">C:/user/</div>
            <Button className="bg-inherit text-black border border-black font-semibold hover:bg-slate-300">
              View
            </Button>
          </div>
        </div>
        <div>
          <h1 className="font-bold my-4">Model</h1>
          <div className="flex flex-row border border-slate-400 rounded-lg w-full justify-between p-2">
            <div className="">Image Super Resolution</div>
            <Button className="bg-inherit text-black border border-black font-semibold hover:bg-slate-300">
              <Link to={`/model/${modelUid}/details`}>Inspect</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobViewDetails;
