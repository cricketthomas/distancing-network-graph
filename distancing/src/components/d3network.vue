<template>
	<div>
		<svg id="network"></svg>
		<button @click="addNode()">add node</button>
		<button @click="addLink()">add link</button><hr>
    {{state.nodes}}
	</div>
</template>

<script lang="ts">
	import * as d3 from 'd3';

	import Vue from 'vue';
	import { defineComponent, ref, reactive, computed, onMounted, watchEffect, watch } from '@vue/composition-api';


	export default defineComponent({
		name: 'd3network',
		setup(props, { root }) {

interface State {
    nodes: INodeObjectx[];
    links: ILinkObjectxx[];
}

const state = reactive<State>({
    nodes: [
				{ name: 'Finkler', sex: 'F', id: 0 },
				{ name: 'Peter', sex: 'M', id: 1 },
				{ name: 'Ashley', sex: 'F', id: 2 },
      ],
      links:[
				{ source: 'Finkler', target: 'Ashley', type: 'A' },
				{ source: 'Peter', target: 'Finkler', type: 'E' },
			]
  })

			interface ILinkObjectxx {
				source: string;
				type: string;
				target: string;
			}



			interface INodeObjectx {
				id: number;
				index?: number;
				name?: string;
				vx?: number;
				vy?: number;
				x?: number;
				y?: number;
				sex?: string;
			}
			const addNode = (): any => {
				let newNodeToAdd: INodeObjectx = {
					id: 3,
					index: 3,
					sex: 'F',
					name: 'paige',
					vx: 0,
					vy: 0,
					x: 0,
					y: 0,
				};
				state.nodes.push(newNodeToAdd);
			};

			interface ILinkObjectx {
				index: number;
				type: string;
				source: SourceType;
				target: SourceType;
			}

			interface SourceType {
				id: number;
				index: number;
				name: string;
				vx?: number;
				vy?: number;
				x?: number;
				y?: number;
			}
			const addLink = () => {
				const newTarget: SourceType = {
					id: 3,
					index: 3,
					name: 'Paige',
					// vx: 0,
					// vy: 0,
					// x: 0,
					// y: 0,
				};
				const newSource: SourceType = {
					id: 0,
					index: 0,
					name: 'Finkler',
					// vx: 0.0002548009541004198,
					// vy: 0.0002548009541004198,
					// x: 0.0002548009541004198,
					// y: 0.0002548009541004198,
	       };
	       const newLink: ILinkObjectx = {
	         index: 2,
	         source: newSource,
	         target: newTarget,
	         type: "E"
	       }

	       state.links.push(newLink)
			};

			//Function to choose the line colour and thickness
			//If the link type is "A" return green
			//If the link type is "E" return red
			function linkColour(d) {
				if (d.type == 'A') {
					return 'green';
				} else {
					return 'red';
				}
			}

	     function renderChart(){
	     var svg = d3.select('svg'),
					width = +svg.attr('width'),
					height = +svg.attr('height');

				var radius = 15;

				//set up the simulation and add forces
				var simulation = d3.forceSimulation().nodes(state.nodes);
				var link_force = d3.forceLink(state.links).id(function(d) {
					return d.name;
				});
				var charge_force = d3.forceManyBody().strength(-100);
				var center_force = d3.forceCenter(width / 2, height / 2);

				simulation
					.force('charge_force', charge_force)
					.force('center_force', center_force)
					.force('links', link_force);

				//add tick instructions:
				simulation.on('tick', tickActions);

				//add encompassing group for the zoom
				var g = svg.append('g').attr('class', 'everything');

				//draw lines for the links
				var link = g
					.append('g')
					.attr('class', 'links')
					.selectAll('line')
					.data(state.links)
					.enter()
					.append('line')
					.attr('stroke-width', 2)
					.style('stroke', linkColour);

				//draw circles for the nodes
				var node = g
					.append('g')
					.attr('class', 'nodes')
					.selectAll('circle')
					.data(state.nodes)
					.enter()
					.append('circle')
					.attr('r', radius)
					.attr('fill', circleColor);

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
					.attr('group', function(d) {
						return d.group;
					});

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
				function circleColor(d) {
					if (d.sex == 'M') {
						return 'blue';
					} else {
						return 'pink';
					}
				}

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
	       }
			onMounted(() => {
        renderChart()
      });


watch(
  () => state.nodes,
  (count, prevCount) => {
    renderChart()
    console.log(count,prevCount)
  }
)



return { addNode, addLink, state, renderChart};
		},
	});
</script>

<style lang="scss">
	.links line {
		stroke: #999;
		stroke-opacity: 0.6;
	}

	.nodes circle {
		stroke: black;
		stroke-width: 0px;
	}
	svg {
		text-align: center;
		width: 600px;
		height: 600px;
	}
</style>
