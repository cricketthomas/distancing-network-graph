<template>
	<div>
		<div id="network"></div>
	</div>
</template>

<script lang="ts">
	import * as d3 from "d3";

	import Vue from 'vue';
	import { defineComponent, ref, reactive, computed, onMounted, watchEffect, watch } from '@vue/composition-api';




	export default defineComponent({
	    name: 'd3network',
	    setup(props, { root }) {




	    onMounted(()=>{
   var width = 960,
			height = 500;

			var color = d3.scaleOrdinal(d3.schemeCategory10);

			var nodes = [],
			links = [];



			var simulation = d3.forceSimulation()
			.force("link", d3.forceLink().distance(200).strength(.6))
			.force("charge", d3.forceManyBody())
			// use forceX and forceY instead to change the relative positioning
			// .force("centering", d3.forceCenter(width/2, height/2))
			.force("x", d3.forceX(width/2))
			.force("y", d3.forceY(height/2))
			.on("tick", tick);


			var svg = d3.select("#network").append("svg")
			.attr("width", width)
			.attr("height", height);


		function tick() {
			var nodeElements = svg.selectAll(".node");
			var linkElements = svg.selectAll(".link");

			nodeElements.attr("cx", function(d,i) {return d.x; })
			.attr("cy", function(d) { return d.y; })

			linkElements.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });


		}


	    })
	},
	    components: {},
	});
</script>

<style lang="scss">
	.link {
		stroke: #aaa;
	}

	.node text {
		stroke: #333;
		cursor: pointer;
	}

	.node circle {
		stroke: #fff;
		stroke-width: 3px;
		fill: #555;
	}
</style>
