<template>
	<div>
		<svg id="network"></svg>
		<button @click="stop()">stop</button>
		<button @click="restart()">restart</button>
	</div>
</template>

<script lang="ts">
	import * as d3 from 'd3';
	import { defineComponent, onMounted, watch, watchEffect, toRefs } from 'vue';
	import { Node, Link } from '@/models/networkgraph';
	import { mouse } from 'd3';
import { set } from 'd3';

	export default defineComponent({
		name: 'd3network',
		props: {
			nodes: Array as () => Array<Node>,
			links: Array as () => Array<Link>	
			// nodeClick: Function,
			// linkClick: Function,
		},
		setup(props, context) {

			var width = 600;
			var height = 600;
			var radius = 10;
			var simulation = d3.forceSimulation().nodes(props.nodes); //.id(function(d) { return d.id; });;
			var link_force = d3.forceLink(props.links).id(function(d: any) {
				return d.index;
			});
			var charge_force = d3.forceManyBody().strength(-80);
			var center_force = d3.forceCenter(width / 2, height / 2);

			const renderChart = () => {
				d3.select('svg').selectAll('*').remove();
				simulation
					.force('charge_force', charge_force)
					.force('center_force', center_force)
					.force('links', link_force);

				var svg = d3
					.select('svg')
					.attr('width', width)
					.attr('height', height);

				simulation.on('tick', tickActions);

				var g = svg.append('g').attr('class', 'nodes_links');

				var link = g
					.append('g')
					.attr('class', 'links')
					.selectAll('line')
					.data(props.links)
					.enter()
					.append('line')
					.attr('stroke-width', 2)
					.attr('class', 'link');

				link.on('click', function(d: any) {
					context.emit('linkClick', d);
				});

				var node = g
					.append('g')
					.attr('class', 'nodes')
					.selectAll('circle')
					.data(props.nodes)
					.enter()
					.append('circle')
					.attr('r', radius);
				//.attr('fill', circleColor);

				node.on('click', function(d: any) {
					context.emit('nodeClick', {id: d.id, name: d.name, index: d.index});
				});

				var text = g
					.selectAll('text')
					.data(props.nodes)
					.enter()
					.append('text')
					.attr('dx', 40)
					.attr('dy', 0.25)
					.attr('class', 'linkText')
					.text(function(d: any) {
						return d.name;
					})
					.attr('text-anchor', 'middle');

				// .attr('group', function(d) {
				// 	return d.group;
				// });

				function tickActions() {
					//update circle positions each tick of the simulation
					node.attr('cx', function(d: any) {
						return d.x;
					}).attr('cy', function(d: any) {
						return d.y;
					});

					link.attr('x1', function(d: any) {
						return d.source.x;
					})
						.attr('y1', function(d: any) {
							return d.source.y;
						})
						.attr('x2', function(d: any) {
							return d.target.x;
						})
						.attr('y2', function(d: any) {
							return d.target.y;
						});

					text.attr('x', function(d: any) {
						return d.x;
					}).attr('y', function(d: any) {
						return d.y;
					});
					simulation.restart();
					simulation.tick();
				}
				function drag_start(d: any) {
					if (!d3.event.active) {
						simulation.alphaTarget(0.3).restart();
					}
					d.fx = d.x;
					d.fy = d.y;
				}
				function drag_drag(d: any) {
					d.fx = d3.event.x;
					d.fy = d3.event.y;
				}
				function drag_end(d) {
					if (!d3.event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				}
				function zoom_actions() {
					g.attr('transform', d3.event.transform);
				}

				// function circleColor(d) {
				// 	if (d.sex == 'M') {
				// 		return 'blue';
				// 	} else {
				// 		return 'pink';
				// 	}
				// }
				//add drag capabilities
				var drag_handler = d3
					.drag()
					.on('start', drag_start)
					.on('drag', drag_drag)
					.on('end', drag_end);

				drag_handler(node);
				//add zoom capabilities
				var zoom_handler = d3.zoom().on('zoom', zoom_actions);
				zoom_handler(svg);
			};
			onMounted(() => {
				renderChart();
			});

			watch(
				() => props.nodes,
				(newNodes, prevNodes) => {
					console.log("nodes", newNodes, props.nodes)
					// simulation.nodes(newNodes);
					// renderChart();
					// simulation.alpha(.01).restart();
					//simulation.restart();
				}
			);
			watch(
				() => props.links,
				(newLinks, prevLinks) => {
					console.log("links", newLinks)
					// link_force = d3.forceLink(newLinks).id(function(d) {
					// 	return d.id;
					// });
					// simulation.alpha(.01).restart();
					// renderChart();
				}
				
			);

			const stop = () => simulation.alphaTarget(0.1).stop();
			const restart = () => simulation.alpha(1);
			// const resetZoom = () => {
			// 		var svg = d3.select('.nodes_links')
			// 		d3.zoom().on('zoom', g.attr('transform', d3.event.transform))
			// 		d3.zoomIdentity.translate(0,0).scale(0.7);
			// }
			return { renderChart, stop, restart};
		},
	});
</script>

<style lang="scss"></style>
