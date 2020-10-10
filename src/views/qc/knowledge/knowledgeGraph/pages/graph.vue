<template>
  <div>
    <div id="menu" class="menu" style="display:none">
      <ul>
        <li class="menu_item" @click="addNode"><i class="el-icon-plus" /> 添 加</li>
        <li class="menu_item" @click="editNode"><i class="el-icon-edit" /> 编 辑</li>
        <li class="menu_item" @click="deleteNode"><i class="el-icon-delete" /> 删 除</li>
      </ul>
    </div>
    <svg id="viz" />
  </div>
</template>
<script>
import * as d3 from 'd3'
import jsonData from '@/assets/json/miserables.json'
export default {
  name: 'FoceSimulation',
  data() {
    return {
      currentNode: null
    }
  },
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
    const adjlist = []
    graph.links.forEach(function(d) {
      adjlist[d.source.index + '-' + d.target.index] = true
      adjlist[d.target.index + '-' + d.source.index] = true
    })
    function neigh(a, b) {
      return a === b || adjlist[a + '-' + b]
    }
    const svg = d3.select('#viz').attr('width', width).attr('height', height)
    const container = svg.append('g')
    svg.call(
      d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', () => {
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
    // 给节点添加鼠标事件
    node.on('mouseover', focus)
      .on('mouseout', unfocus)
      .on('click', this.showMenu)
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
      d3.select('#menu')
        .style('left', d3.event.x + 20 + 'px')
        .style('top', d3.event.y + 160 + 'px')
    }
    function dragged(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
      d3.select('#menu')
        .style('left', d.x + 20 + 'px')
        .style('top', d.y + 160 + 'px')
    }
    function dragended(d) {
      if (!d3.event.active) {
        graphLayout.alphaTarget(0)
      }
      d.fx = d.x
      d.fy = d.y
      d3.select('#menu')
        .style('left', d3.event.x + 20 + 'px')
        .style('top', d3.event.y + 160 + 'px')
    }
    function focus() {
      const index = d3.select(d3.event.target).datum().index
      node.style('opacity', function(o) {
        return neigh(index, o.index) ? 1 : 0.1
      })
      labelNode.attr('display', function(o) {
        return neigh(index, o.node.index) ? 'block' : 'none'
      })
      link.style('opacity', function(o) {
        return o.source.index === index || o.target.index === index ? 1 : 0.1
      })
      linkText.style('opacity', function(o) {
        return o.source.index === index || o.target.index === index ? 1 : 0.1
      })
    }
    function unfocus() {
      labelNode.attr('display', 'block')
      node.style('opacity', 1)
      link.style('opacity', 1)
      linkText.style('opacity', 1)
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
    // function showMenu(d) {
    //   console.log(d3.event.x)
    //   console.log(d3.event.y)

    //   d3.select('#menu')
    //     .style('display', 'block')
    //     .style('left', d3.event.x - 200 + 'px')
    //     .style('top', d3.event.y + 0 + 'px')
    //   // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
    // }
  },
  methods: {
    showMenu(d) {
      console.log(d)
      this.currentNode = d
      d3.select('#menu')
        .style('display', 'block')
        .style('left', d3.event.x - 206 + 'px')
        .style('top', d3.event.y + 5 + 'px')
      // 给整个document添加监听鼠标事件，点击任何位置执行foo方法
    },
    foo() { // 取消鼠标监听事件 菜单栏
      this.menuVisible = false
      document.removeEventListener('click', this.foo) // 要及时关掉监听，不关掉的是一个坑，不信你试试，虽然前台显示的时候没有啥毛病，加一个alert你就知道了
    },
    addNode() {
      d3.select('#menu').style('display', 'none')
      console.log('源节点', this.currentNode)
    },
    editNode() {
      console.log('源节点', this.currentNode)
    },
    deleteNode() {
      d3.select('#menu').style('display', 'none')
      this.$confirm('确认删除该节点？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功')
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    }
  }

}
</script>
<style lang="scss" scoped>
    .menu_item {
        line-height: 20px;
        text-align: left;
        margin-top: 10px;
    }
    .menu {
        height: 100px;
        width: 80px;
        position: absolute;
        border-radius: 10px;
        border: 1px solid #999999;
        background-color: #f4f4f4;
    }
    ul{
      list-style:none;

    }
    li:hover {
        background-color: #1790ff;
        color: white;
    }
    li{
      margin-left: -36px;
      font-size:15px
      }

</style>
