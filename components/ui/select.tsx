"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextType>({
  value: "",
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
});

function Select({
  children,
  value,
  onValueChange,
}: {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { open, setOpen } = React.useContext(SelectContext);

  return (
    <button
      type="button"
      className={cn(
        "flex h-8 w-full items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm",
        className
      )}
      style={style}
      onClick={() => setOpen(!open)}
    >
      {children}
      <svg
        className="h-4 w-4 opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext);

  return (
    <span className={cn(!value && "text-muted-foreground")}>
      {value || placeholder}
    </span>
  );
}

function SelectContent({ 
  children,
  className,
  style,
}: { 
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { open } = React.useContext(SelectContext);

  if (!open) return null;

  return (
    <div 
      className={cn("absolute z-50 mt-1 w-full min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-md", className)}
      style={style}
    >
      {children}
    </div>
  );
}

function SelectItem({
  children,
  value,
  className,
  style,
}: {
  children: React.ReactNode;
  value: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { value: selectedValue, onValueChange, setOpen } =
    React.useContext(SelectContext);

  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-pointer items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground",
        selectedValue === value && "bg-accent text-accent-foreground",
        className
      )}
      style={style}
      onClick={() => {
        onValueChange(value);
        setOpen(false);
      }}
    >
      {children}
    </button>
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
