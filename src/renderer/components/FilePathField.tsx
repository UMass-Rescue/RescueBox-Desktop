import { Button } from './ui/button';

export default function FilePathField({
  path,
  label,
  key,
}: {
  path: string;
  label: string;
  key: any;
}) {
  const handleViewDirectory = () => {
    window.fileSystem.openDirectory({ path });
  };

  return (
    <div
      key={key}
      className="px-3 py-1 w-full h-min justify-start items-start border border-slate-400 rounded-lg"
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-start gap-0.5 w-full">
          <h1 className="text-sm font-bold text-left">{label}</h1>
          <pre className="text-left">{path}</pre>
        </div>
        <Button
          className="hover:-translate-y-0.5 h-full transition-all rounded-lg"
          onClick={() => handleViewDirectory()}
        >
          Browse
        </Button>
      </div>
    </div>
  );
}
