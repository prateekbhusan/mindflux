import React from 'react';

type MemoryGraphProps = {
    data: {
        nodes: Array<{
            id: string;
            label: string;
            group: number;
        }>;
        links: Array<{
            source: string;
            target: string;
            value: number;
        }>;
    };
};

export function MemoryGraph({ data }: MemoryGraphProps) {
    return (
        <div className="w-full h-[400px] bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
            <div className="text-white/90">
                <h3 className="text-xl font-semibold mb-4">AI Knowledge Graph</h3>
                <p className="text-sm text-white/60 mb-4">
                    {data.nodes.length} nodes and {data.links.length} connections in your personal knowledge graph
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data.nodes.map((node) => (
                        <div 
                            key={node.id}
                            className="bg-slate-800/50 border border-white/10 rounded-lg p-4 hover:border-blue-500/30 transition-all duration-300"
                        >
                            <div className="text-sm font-medium">{node.label}</div>
                            <div className="text-xs text-white/50 mt-1">Group {node.group}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}