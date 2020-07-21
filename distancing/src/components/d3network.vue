<template>
	<div>
		<svg id="network"></svg>
		<!-- <h1>Current Selected Node {{currentNodeSelected}}</h1> -->
		<button @click="addNode()">add node</button>
		<button @click="addLink()">add link</button>
		<hr />
		{{ state.nodes }}
		<h3>links</h3>
		{{ state.links.length }}
		<hr />
		<h3>props</h3>
		{{ nodes_array }}
	</div>
</template>

<script lang="ts">
	import * as d3 from 'd3';

	import Vue from 'vue';
	import { defineComponent, ref, reactive, computed, onMounted, watchEffect, watch } from '@vue/composition-api';

	export default defineComponent({
		name: 'd3network',
		props: {
			nodes_array: Array as () => Array<any>,
			links_array: Array as () => Array<any>,
			nodeClick: Function,
			linkClick: Function,
		},
		setup(props, { root }) {
			interface State {
				nodes: any[];
				links: any[];
			}

			const state = reactive<State>({
				nodes: [
					{ id: 0, name: 'Finkler', sex: 'F' },
					{ id: 1, name: 'Peter', sex: 'M' },
					{ id: 2, name: 'Ashley', sex: 'F' },
					{ id: 3, name: 'Cricket', sex: 'M' },
				],
				links: [
					{ source: 0, target: 2 },
					{ source: 1, target: 0 },
				],
			});

			interface INodeObjectx {
				id: number;
				index?: number;
				name?: string;
				// vx?: number;
				// vy?: number;
				// x?: number;
				// y?: number;
				sex?: string;
			}
			const addNode = (): any => {
				let newNodeToAdd: INodeObjectx = {
					id: 4,
					sex: 'F',
					name: 'Paige',
				};
				state.nodes.push(newNodeToAdd);
			};

			interface ISimpleLink {
				source: number;
				target: number;
			}

			const addLink = () => {
				const link: ISimpleLink = {
					source: 3,
					target: 4,
				};
				state.links.push(link);
			};

			//Function to choose the line colour and thickness
			//If the link type is "A" return green
			//If the link type is "E" return red
			var width = 600;
			var height = 600;
      var radius = 10;

      
      const renderChart = () => {
        d3.select('svg').selectAll('*').remove();
      var simulation = d3.forceSimulation().nodes(state.nodes)//.id(function(d) { return d.id; });;
      var link_force = d3.forceLink(state.links).id(function(d) { return d.index; });;
      var charge_force = d3.forceManyBody().strength(-100);
      var center_force = d3.forceCenter(width / 2, height / 2);
      
				var svg = d3
					.select('svg')
					.attr('width', width)
					.attr('height', height);
				//set up the simulation and add forces

				simulation
					.force('charge_force', charge_force)
					.force('center_force', center_force)
					.force('links', link_force);

				//add tick instructions:
				simulation.on('tick', tickActions);

				//add encompassing group for the zoom
				var g = svg.append('g').attr('class', 'nodes_links');

				//draw lines for the links
				var link = g
					.append('g')
					.attr('class', 'links')
					.selectAll('line')
					.data(state.links)
					.enter()
					.append('line')
					.attr('stroke-width', 2)
					.attr('class', 'link');

				//draw circles for the nodes
				var node = g
					.append('g')
					.attr('class', 'nodes')
					.selectAll('circle')
					.data(state.nodes)
					.enter()
					.append('circle')
					.attr('r', radius)
					//.attr('fill', circleColor);

				node.on('click', function(d) {
          console.log(d);
					// return d.descendants().splice(1).indexOf(e) > -1
        });
        
     
				// This is the label for each node
				var text = g
					.selectAll('text')
					.data(state.nodes)
					.enter()
					.append('text')
					.attr('dx', 40)
					.attr('dy', 0.25)
					.text(function(d) {
						return d.name;
					})
					.attr('text-anchor', 'middle')
					// .attr('group', function(d) {
					// 	return d.group;
					// });

				function tickActions() {
					//update circle positions each tick of the simulation
					node.attr('cx', function(d) {
						return d.x;
					}).attr('cy', function(d) {
						return d.y;
					});

					link.attr('x1', function(d) {
						return d.source.x;
					})
						.attr('y1', function(d) {
							return d.source.y;
						})
						.attr('x2', function(d) {
							return d.target.x;
						})
						.attr('y2', function(d) {
							return d.target.y;
						});

					text.attr('x', function(d) {
						return d.x;
					}).attr('y', function(d) {
						return d.y;
					});
				}
				//Drag functions
				//d is the node
				function drag_start(d) {
					if (!d3.event.active) {
						simulation.alphaTarget(0.3).restart();
					}
					d.fx = d.x;
					d.fy = d.y;
				}
				//make sure you can't drag the circle outside the box
				function drag_drag(d) {
					d.fx = d3.event.x;
					d.fy = d3.event.y;
				}
				function drag_end(d) {
					if (!d3.event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				}
				//Zoom functions
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
				() => state.nodes,
				(newNodes, prevNodes) => {
          console.log(state.nodes)
     
          
          renderChart();
				}
			);
			watch(
				() => state.links,
				(newLinks, prevLinks) => {
          console.log(state.links)

          link_force = d3.forceLink(state.links);
				}
			);
			watch(
				() => props.nodes_array,
				(newNodes, oldNodes) => {
					// d3.select('svg').selectAll('*').remove();
					// renderChart();
					console.log(newNodes);
				}
			);

			return { addNode, addLink, state, renderChart };
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
