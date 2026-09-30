'use client';

import React from 'react';
import { X, Cpu, Database, Bot, Box, Network, Shield, Zap } from 'lucide-react';

interface NodeModalProps {
  node: {
    title: string;
    category: string;
    description: string;
    icon: string;
  } | null;
  onClose: () => void;
}

export const NodeModal: React.FC<NodeModalProps> = ({ node, onClose }) => {
  if (!node) return null;

  const getIcon = () => {
    switch (node.icon) {
      case 'compute': return <Cpu className="h-8 w-8 text-[#01c1ac]" />;
      case 'storage': return <Database className="h-8 w-8 text-[#01c1ac]" />;
      case 'ai': return <Bot className="h-8 w-8 text-[#01c1ac]" />;
      case 'containers': return <Box className="h-8 w-8 text-[#01c1ac]" />;
      case 'networking': return <Network className="h-8 w-8 text-[#01c1ac]" />;
      case 'security': return <Shield className="h-8 w-8 text-[#01c1ac]" />;
      case 'serverless': return <Zap className="h-8 w-8 text-[#01c1ac]" />;
      default: return <Cpu className="h-8 w-8 text-[#01c1ac]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-md overflow-hidden bg-[#2c3746] border border-[#3a4759] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 grid h-9 w-9 place-items-center border border-[#3a4759] bg-[#222b38] text-[#64748b] hover:border-[#01c1ac]/40 hover:text-[#01c1ac] cursor-pointer transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center bg-[#222b38] border border-[#3a4759]">
            {getIcon()}
          </div>
          <div>
            <span className="font-tech text-[10px] uppercase tracking-widest text-[#01c1ac] bg-[#01c1ac]/10 px-2.5 py-1 border border-[#01c1ac]/20">
              {node.category}
            </span>
            <h3 className="text-xl font-bold text-white tracking-tight mt-2">{node.title} Node</h3>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[#64748b] bg-[#222b38] border border-[#3a4759] p-4">
          {node.description}
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#01c1ac] px-6 py-2.5 font-tech text-[11px] font-bold uppercase tracking-widest text-[#2c3746] hover:bg-[#00DF89] cursor-pointer transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
