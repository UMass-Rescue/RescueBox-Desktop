/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Button } from './ui/button';

export default function SelectDirField({
  val,
  setVal,
}: {
  val: string;
  setVal: (val: string) => void;
}) {
  const handleSelectDirectory = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    await window.fileSystem.selectDirectory().then((newPath) => {
      setVal(newPath);
      return newPath;
    });
  };

  return (
    <div className="px-3 py-1 w-full h-min justify-start items-start border border-slate-400 rounded-lg">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col justify-start gap-0.5 w-full">
          <pre className="text-left">{val}</pre>
        </div>
        <Button
          className="hover:-translate-y-0.5 h-full transition-all rounded-lg"
          onClick={(e) => handleSelectDirectory(e)}
        >
          Browse
        </Button>
      </div>
    </div>
  );
}
