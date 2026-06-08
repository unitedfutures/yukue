"use client";

import { BudgetItem } from "@/data/budget";
import { ChevronRight } from "lucide-react";

interface Props {
  path: BudgetItem[];
  onNavigate: (index: number) => void;
  yearLabel: string;
}

export default function Breadcrumb({ path, onNavigate, yearLabel }: Props) {
  return (
    <nav className="flex items-center gap-1 text-sm flex-wrap">
      <button
        onClick={() => onNavigate(-1)}
        className="text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
      >
        {yearLabel} 一般会計
      </button>
      {path.map((item, i) => (
        <span key={item.id} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-slate-400" />
          {i < path.length - 1 ? (
            <button
              onClick={() => onNavigate(i)}
              className="text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              {item.name}
            </button>
          ) : (
            <span className="text-slate-800 font-medium">{item.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
