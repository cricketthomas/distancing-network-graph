﻿using System;
using System.Text.Json;
using System.Threading.Tasks;
using distancing.Infastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using static distancing.Models.Network;

namespace distancing.Controllers {
    [ApiController]
    [Route("[controller]")]
    public class NetworkController : ControllerBase {

        private readonly ILogger<NetworkController> _logger;
        private readonly NetworkContext _db;
        private readonly IConfiguration _configuration;

        public NetworkController(ILogger<NetworkController> logger, IConfiguration configuration, NetworkContext db) {
            _logger = logger;
            _configuration = configuration;
            _db = db;
        }

        [HttpGet]
        public async Task<ActionResult<NetworkGraph>> Get(string shortId) {
            var datum = await _db.NetworkGraph.FirstOrDefaultAsync(n => n.shortId == shortId);
            if (shortId == null || datum == null) {
                return NotFound();
            }
            return Ok(datum);
        }



        [HttpPost]
        public async Task<ActionResult<NetworkGraph>> Post([FromBody] NodeLinks NodeLinks) {
            if (NodeLinks.nodes != null) {
                JsonSerializerOptions options = new JsonSerializerOptions();
                options.WriteIndented = true;
                var newNetworkGraph = new NetworkGraph {
                    schema = JsonSerializer.Serialize(NodeLinks, options),
                    shortId = Guid.NewGuid().ToString().Substring(0, 8)
                };
                await _db.NetworkGraph.AddAsync(newNetworkGraph);
                await _db.SaveChangesAsync();
                return CreatedAtAction(nameof(Get), new NetworkGraph {
                    Id = newNetworkGraph.Id,
                    shortId = newNetworkGraph.shortId,
                    schema = newNetworkGraph.schema,
                    updateCount = newNetworkGraph.updateCount
                });
            }
            return BadRequest("Node Object was null");
        }

        [HttpPut("{shortId}")]
        public async Task<ActionResult<NetworkGraph>> Update([FromBody] updateNetworkGraph networkGraph, string shortId) {

            var networkToUpdate = await _db.NetworkGraph.FirstOrDefaultAsync(n => n.shortId == shortId);
            if (null != networkToUpdate) {
                networkToUpdate.networkName = networkGraph.networkName;
                networkToUpdate.schema = JsonSerializer.Serialize(networkGraph.schema);
                await _db.SaveChangesAsync();

                //var datum = _db.NetworkGraph.FirstOrDefaultAsync(n => n.shortId == shortId);
                return Ok(networkToUpdate);

            }
            return NotFound($"Id of {shortId} was not found");

        }


    }
}
