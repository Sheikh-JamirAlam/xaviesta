"use client";

import { useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type Props = {
  files: File[];
  setFiles: (files: File[]) => void;
};

export function ImageMultiPicker({ files, setFiles }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setFiles([...files, ...Array.from(e.target.files)]);
  }

  function remove(index: number) {
    setFiles(files.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">Upload your images or files</p>

      <div className="flex flex-wrap gap-3">
        {/* Browse button */}
        <button type="button" onClick={() => inputRef.current?.click()} className="flex h-24 w-24 items-center justify-center rounded-md border border-dashed text-sm">
          Browse
        </button>

        <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={onSelect} />

        {/* Preview thumbnails */}
        {files.map((file, i) => (
          <div key={i} className="relative h-24 w-24 overflow-hidden rounded-md border">
            <Image src={URL.createObjectURL(file)} alt="preview" fill className="object-cover" />

            <button type="button" onClick={() => remove(i)} className="absolute right-1 top-1 rounded-full bg-white p-1">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
