import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useStore } from '../store/stores/useStore';
import { useShallow } from 'zustand/react/shallow';

const COLOR_MAP: Record<string, string> = {
  red: '#f87171',
  blue: '#60a5fa',
  green: '#34d399',
  yellow: '#fbbf24',
  purple: '#c084fc',
  brown: '#fb923c',
  black: '#1c1917',
};

export function GraphTab({ showTitle = true }: { showTitle?: boolean }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { blocks, activeWorkId, chapters, scenes } = useStore(useShallow(state => ({
    blocks: state.blocks,
    activeWorkId: state.activeWorkId,
    chapters: state.chapters,
    scenes: state.scenes
  })));

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !activeWorkId) return;

    // Filter blocks to only include those belonging to the active work
    const workChapters = chapters.filter(c => c.workId === activeWorkId);
    const workScenes = scenes.filter(s => workChapters.some(c => c.id === s.chapterId));
    const workDocumentIds = new Set([...workChapters.map(c => c.id), ...workScenes.map(s => s.id)]);
    
    const lensBlocks = blocks.filter(b => b.isLens && workDocumentIds.has(b.documentId));
    const nodes = lensBlocks.map(b => ({ 
      id: b.id, 
      content: (b.content || '').substring(0, 20) + '...',
      color: b.lensColor || 'red'
    }));
    const links: { source: string, target: string }[] = [];
    
    lensBlocks.forEach(b => {
      if (b.linkedLensIds) {
        b.linkedLensIds.forEach(targetId => {
          if (lensBlocks.find(lb => lb.id === targetId)) {
            links.push({ source: b.id, target: targetId });
          }
        });
      }
    });

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 600;

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 2);

    const nodeGroup = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(d3.drag<any, any>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    nodeGroup.append('circle')
      .attr('r', 8)
      .attr('fill', (d: any) => COLOR_MAP[d.color] || '#8b5e3c')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    nodeGroup.append('text')
      .text((d: any) => d.content)
      .attr('x', 12)
      .attr('y', 4)
      .attr('font-size', '10px')
      .attr('fill', '#64748b')
      .attr('class', 'pointer-events-none select-none');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
      
      nodeGroup
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, [blocks, activeWorkId, chapters, scenes]);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col">
      {showTitle && <h2 className="text-xl font-bold mb-4">关系图</h2>}
      <svg ref={svgRef} className="flex-1 w-full h-full border border-stone-200 rounded-lg bg-white" />
    </div>
  );
}
