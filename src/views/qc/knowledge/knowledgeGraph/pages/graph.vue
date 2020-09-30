<template>
  <div>
    <svg id="viz" />
  </div>
</template>
<script>
import * as d3 from 'd3'
import jsonData from '@/assets/json/miserables.json'
export default {
  name: 'FoceSimulation',
  mounted() {
    const width = 1850
    const height = 800
    const color = d3.scaleOrdinal(d3.schemeCategory10)
    const graph = jsonData
    const label = {
      'nodes': [],
      'links': []
    }
    graph.nodes.forEach(function(d, i) {
      label.nodes.push({ node: d })
      label.nodes.push({ node: d })
      label.links.push({
        source: i * 2,
        target: i * 2 + 1
      })
    })
    const labelLayout = d3.forceSimulation(label.nodes)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('link', d3.forceLink(label.links).distance(0).strength(2))

    const graphLayout = d3.forceSimulation(graph.nodes)
      .force('charge', d3.forceManyBody().strength(-3000))
      .force('center', d3.forceCenter(width / 3, height / 2))
      .force('x', d3.forceX(width / 2).strength(1))
      .force('y', d3.forceY(height / 2).strength(1))
      .force('link', d3.forceLink(graph.links).id(function(d) { return d.id }).distance(50).strength(1))
      .on('tick', ticked)
    const svg = d3.select('#viz').attr('width', width).attr('height', height)
    const container = svg.append('g')
    svg.call(
      d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', function() {
          container.attr('transform', d3.event.transform)
        })

    )
    const link = container.append('g').attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter()
      .append('line')
      .attr('stroke', '#aaa')
      .attr('stroke-width', '1px')
    const node = container.append('g').attr('class', 'nodes')
      .selectAll('g')
      .data(graph.nodes)
      .enter()
      .append('circle')
      .attr('r', 15)
      .attr('fill', function(d) { return color(d.group) })

    node.call(
      d3.drag()
        .on('start', dragsarted)
        .on('drag', dragged)
        .on('end', dragended)
    )
    const labelNode = container.append('g').attr('class', 'labelNodes')
      .selectAll('text')
      .data(label.nodes)
      .enter()
      .append('text')
      .text(function(d, i) { return i % 2 === 0 ? '' : d.node.id })
      .style('fill', '#555')
      .style('font-family', 'Arial')
      .style('font-size', 12)
      .style('pointer-events', 'none')
    const linkText = container.append('g')
      .selectAll('text')
      .data(graph.links)
      .enter()
      .append('text')
      .text(function(d, i) {
        return i
      })
    function dragsarted(d) {
      d3.event.sourceEvent.stopPropagation()
      if (!d3.event.active) {
        graphLayout.alphaTarget(0.3).restart()
      }
      d.fx = d.x
      d.fy = d.y
    }
    function dragged(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }
    function dragended(d) {
      if (!d3.event.active) {
        graphLayout.alphaTarget(0)
      }
      d.fx = d.x
      d.fy = d.y
    }
    function ticked() {
      node.call(updateNode)
      link.call(updateLink)
      linkText.call(updateLinkdText)
      labelLayout.alphaTarget(0.3).restart()
      labelNode.each(function(d, i) {
        if (i % 2 === 0) {
          d.x = d.node.x
          d.y = d.node.y
        } else {
          const b = this.getBBox()
          const diffX = d.x - d.node.x
          const diffY = d.y - d.node.y
          const dist = Math.sqrt(diffX * diffX + diffY * diffY)
          let shiftX = b.width * (diffX - dist) / (dist * 2)
          shiftX = Math.max(-b.width, Math.min(0, shiftX))
          const shiftY = 16
          this.setAttribute('transform', 'translate(' + shiftX + ',' + shiftY + ')')
        }
      })
      labelNode.call(updateNode)
    }
    function fixna(x) {
      if (isFinite(x)) {
        return x
      }
      return 0
    }
    function updateNode(node) {
      node.attr('transform', function(d) {
        return 'translate(' + fixna(d.x) + ',' + fixna(d.y) + ')'
      })
    }
    function updateLink(link) {
      link.attr('x1', function(d) { return fixna(d.source.x) })
        .attr('y1', function(d) { return fixna(d.source.y) })
        .attr('x2', function(d) { return fixna(d.target.x) })
        .attr('y2', function(d) { return fixna(d.target.y) })
    }
    function updateLinkdText(text) {
      text.attr('x', function(d) { return (d.source.x + d.target.x) / 2 })
        .attr('y', function(d) { return (d.source.y + d.target.y) / 2 })
    }
  }
}
</script>
