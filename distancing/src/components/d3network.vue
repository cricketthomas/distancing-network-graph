<template>
	<div>
		<svg id="network"></svg>
		<button @click="stop()">stop</button>
		<button @click="restart()">restart</button>
	</div>
</template>

<script lang="ts">
	import * as d3 from 'd3';

	import Vue from 'vue';
	import { defineComponent, onMounted, watch } from '@vue/composition-api';
	import { Node, Link } from '@/models/networkgraph';

	export default defineComponent({
		name: 'd3network',
		props: {
			nodes: Array as () => Array<Node>,
			links: Array as () => Array<Link>,
			nodeClick: Function,
			linkClick: Function,
		},
		setup(props, { root }) {
			
			var width = 600;
			var height = 600;
			var radius = 10;
			var simulation = d3.forceSimulation().nodes(props.nodes); //.id(function(d) { return d.id; });;
			var link_force = d3.forceLink(props.links).id(function(d: any) {
				return d.index;
			});
			var charge_force = d3.forceManyBody().strength(-30);
			var center_force = d3.forceCenter(width / 2, height / 2);

			const renderChart = () => {
				d3.select('svg')
					.selectAll('*')
					.remove();
				simulation
					.force('charge_force', charge_force)
					.force('center_force', center_force)
					.force('links', link_force);

				var svg = d3
					.select('svg')
					.attr('width', width)
					.attr('height', height);
				//set up the simulation and add forces

				//add tick instructions:
				simulation.on('tick', tickActions);

				//add encompassing group for the zoom
				var g = svg.append('g').attr('class', 'nodes_links');

				//draw lines for the links
				var link = g
					.append('g')
					.attr('class', 'links')
					.selectAll('line')
					.data(props.links)
					.enter()
					.append('line')
					.attr('stroke-width', 2)
					.attr('class', 'link');

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
					console.log(d);
					// return d.descendants().splice(1).indexOf(e) > -1
				});

				var text = g
					.selectAll('text')
					.data(props.nodes)
					.enter()
					.append('text')
					.attr('dx', 40)
					.attr('dy', 0.25)
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

				/** Functions **/
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
					simulation.nodes(newNodes);
					renderChart();
					//simulation.alpha(1).restart();
				}
			);
			watch(
				() => props.links,
				(newLinks, prevLinks) => {
					d3.forceLink(newLinks).id(function(d) {
						return d.index;
					});
					//simulation.alpha(1).restart();
					renderChart();
				}
			);

			const stop = () => simulation.alphaTarget(0.1).stop();
			const restart = () => simulation.alphaTarget(0.1).restart();

			return { renderChart,stop, restart };
		},
	});
</script>

<style lang="scss">
	.links line {
		stroke: navy;
		stroke-opacity: 0.6;
	}

	.nodes circle {
		stroke: rgba(0, 0, 0, 0.301);
		stroke-opacity: 0.5;
		stroke-width: 5px;
		fill: gray;
	}
	svg {
		text-align: center;
		width: 600px;
		height: 600px;
	}
</style>
