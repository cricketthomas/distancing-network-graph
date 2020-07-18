<template>
  <div>
    <svg id="network"></svg>
  </div>
</template>

<script lang="ts">
import * as d3 from "d3";

import Vue from "vue";
import {
  defineComponent,
  ref,
  reactive,
  computed,
  onMounted,
  watchEffect,
  watch
} from "@vue/composition-api";

export default defineComponent({
  name: "d3network",
  setup(props, { root }) {

      
    onMounted(() => {
    //   var svg = d3.select("#network"),
    //     width = + svg.attr("width"),
    //     height = + svg.attr("height");

    //   var simulation = d3.forceSimulation().force("link",
    //       d3.forceLink().id(function(d) {
    //         return d.id;
    //       })
    //     ).force("charge", d3.forceManyBody()
    //         .strength(-200)
    //         .theta(0.8)
    //         .distanceMax(150)
    //     ).force("center", d3.forceCenter(width / 2, height / 2));

    //   const graph = {
    //     nodes: [
    //       { id: "1", group: 2 },
    //       { id: "2", group: 2 },
    //       { id: "4", group: 3 },
    //       { id: "8", group: 4 },
    //       { id: "16", group: 5 },
    //       { id: "11", group: 1 },
    //       { id: "12", group: 2 },
    //       { id: "14", group: 3 },
    //       { id: "18", group: 4 },
    //       { id: "116", group: 5 }
    //     ],
    //     links: [
    //       { source: "1", target: "2", value: 3 },
    //       { source: "2", target: "4", value: 1 },
    //       { source: "4", target: "8", value: 1 },
    //       { source: "4", target: "8", value: 1 },
    //       { source: "8", target: "16", value: 1 },
    //       { source: "16", target: "1", value: 1 }
    //     ]
    //   };

    //   function run(graph) {
  
    //     var link = svg
    //       .append("g")
    //       .style("stroke", "#aaa")
    //       .selectAll("line")
    //       .data(graph.links)
    //       .enter()
    //       .append("line");

    //     var node = svg
    //       .append("g")
    //       .attr("class", "nodes")
    //       .selectAll("circle")
    //       .data(graph.nodes)
    //       .enter()
    //       .append("circle")
    //       .attr("r", 2)
    //       .call(
    //         d3
    //           .drag()
    //           .on("start", dragstarted)
    //           .on("drag", dragged)
    //           .on("end", dragended)
    //       );

    //     var label = svg
    //       .append("g")
    //       .attr("class", "labels")
    //       .selectAll("text")
    //       .data(graph.nodes)
    //       .enter()
    //       .append("text")
    //       .attr("class", "label")
    //       .text(function(d) {
    //         return d.id;
    //       });

    //     simulation.nodes(graph.nodes).on("tick", ticked);
    //     simulation.force("link").links(graph.links);

    //     function ticked() {
    //       link
    //         .attr("x1", function(d) {
    //           return d.source.x;
    //         })
    //         .attr("y1", function(d) {
    //           return d.source.y;
    //         })
    //         .attr("x2", function(d) {
    //           return d.target.x;
    //         })
    //         .attr("y2", function(d) {
    //           return d.target.y;
    //         });

    //       node
    //         .attr("r", 16)
    //         .style("fill", "#efefef")
    //         .style("stroke", "#424242")
    //         .style("stroke-width", "1px")
    //         .attr("cx", function(d) {
    //           return d.x + 5;
    //         })
    //         .attr("cy", function(d) {
    //           return d.y - 3;
    //         });

    //       label
    //         .attr("x", function(d) {
    //           return d.x;
    //         })
    //         .attr("y", function(d) {
    //           return d.y;
    //         })
    //         .style("font-size", "10px")
    //         .style("fill", "#333");
    //     }
    //   }

    //   function dragstarted(d) {
    //     if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    //     d.fx = d.x;
    //     d.fy = d.y;
    //     //  simulation.fix(d);
    //   }

    //   function dragged(d) {
    //     d.fx = d3.event.x;
    //     d.fy = d3.event.y;
    //     //  simulation.fix(d, d3.event.x, d3.event.y);
    //   }

    //   function dragended(d) {
    //     d.fx = d3.event.x;
    //     d.fy = d3.event.y;
    //     if (!d3.event.active) simulation.alphaTarget(0);
    //     //simulation.unfix(d);
    //   }

    //   run(graph);
    
    
    
//create somewhere to put the force directed graph
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
    
var radius = 15; 

var nodes_data =  [
    {name: "Finkler", sex: "F"},
    {name: "Gordon", sex: "M"},
    {name: "Sylvester", sex: "M"},
    {name: "Mary", sex: "F"},
    {name: "Peter", sex: "F"},
    {name: "Ashley", sex: "M"},
    ]

//Sample links data 
//type: A for Ally, E for Enemy
var links_data = [
    {source: "Finkler", target: "Ashley", type:"E"},
    {source: "Peter", target: "Finkler", type:"E"},
    {source: "Ashley", target: "Gordon", type:"E"},
    {source: "Sylvester", target: "Mary", type:"E"}
    
]


//set up the simulation and add forces  
var simulation = d3.forceSimulation()
					.nodes(nodes_data);
                              
var link_force =  d3.forceLink(links_data)
                        .id(function(d) { return d.name; });            
         
var charge_force = d3.forceManyBody()
    .strength(-100); 
    
var center_force = d3.forceCenter(width / 2, height / 2);  
                      
simulation
    .force("charge_force", charge_force)
    .force("center_force", center_force)
    .force("links",link_force)
 ;

        
//add tick instructions: 
simulation.on("tick", tickActions );

//add encompassing group for the zoom 
var g = svg.append("g")
    .attr("class", "everything");

//draw lines for the links 
var link = g.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(links_data)
    .enter().append("line")
      .attr("stroke-width", 2)
      .style("stroke", linkColour);        

//draw circles for the nodes 
var node = g.append("g")
        .attr("class", "nodes") 
        .selectAll("circle")
        .data(nodes_data)
        .enter()
        .append("circle")
        .attr("r", radius)
        .attr("fill", circleColor);


 
 	// This is the label for each node
	var text = g.selectAll("text")
		.data(nodes_data)
		.enter().append("text")
		.attr("dx",12)
		.attr("dy",.25)
		.text(function(d) { return d.name;})
		.attr("text-anchor", "middle")
	// .attr("group",function(d) {return d.group;} )	;
		
  node.append("title")
      .text(function(d) { return d.id; });




      
//add drag capabilities  
var drag_handler = d3.drag()
	.on("start", drag_start)
	.on("drag", drag_drag)
	.on("end", drag_end);	
	
drag_handler(node);


//add zoom capabilities 
var zoom_handler = d3.zoom()
    .on("zoom", zoom_actions);

zoom_handler(svg);     

/** Functions **/

//Function to choose what color circle we have
//Let's return blue for males and red for females
function circleColor(d){
	if(d.sex =="M"){
		return "blue";
	} else {
		return "pink";
	}
}

//Function to choose the line colour and thickness 
//If the link type is "A" return green 
//If the link type is "E" return red 
function linkColour(d){
	if(d.type == "A"){
		return "green";
	} else {
		return "red";
	}
}

//Drag functions 
//d is the node 
function drag_start(d) {
 if (!d3.event.active) simulation.alphaTarget(0.3).restart();
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
function zoom_actions(){
    g.attr("transform", d3.event.transform)
}

function tickActions() {
    //update circle positions each tick of the simulation 
       node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
        
    //update link positions 
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    text
	     .attr("x", function(d) { return d.x; })
	     .attr("y", function(d) { return d.y; });
} 
    });
  }
});
</script>

<style lang="scss">
.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  stroke: black	;
  stroke-width: 0px;
}
svg {
text-align: center;
  width: 600px;
  height: 600px;
}

</style>
