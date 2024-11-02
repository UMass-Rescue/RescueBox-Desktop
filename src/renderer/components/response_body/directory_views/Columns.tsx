import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@shadcn/dropdown-menu';
import { Button } from '@shadcn/button';
import { DirectoryResponse } from 'src/shared/generated_models';

export type PathRow = {
  fullPath: string;
  fileName: string;
  parent: string;
};

export const fileColumns: ColumnDef<PathRow>[] = [
  {
    accessorKey: 'fileName',
    header: () => (
      <div className="font-bold text-black text-sm">File / Directory</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { fullPath } = row.original;

      return (
        <div className="flex items-center justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  window.fileSystem.showFileInExplorer({
                    path: fullPath,
                  })
                }
              >
                Reveal in Explorer
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => navigator.clipboard.writeText(fullPath)}
              >
                Copy Path
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const directoryColumns: ColumnDef<DirectoryResponse>[] = [
  {
    accessorKey: 'title',
    header: () => <div className="font-bold text-black">Title</div>,
  },
  {
    accessorKey: 'path',
    header: () => <div className="font-bold text-black">Directory</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const { path } = row.original;

      return (
        <div className="flex items-center justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  window.fileSystem.showFileInExplorer({
                    path,
                  })
                }
              >
                Reveal in Explorer
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => navigator.clipboard.writeText(path)}
              >
                Copy Path
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
