using System;
using Microsoft.EntityFrameworkCore;
using static distancing.Models.Network;

namespace distancing.Infastructure.Data {


    public class NetworkContext : DbContext {
        public NetworkContext(DbContextOptions<NetworkContext> options)
       : base(options) { }

        public DbSet<NetworkGraph> NetworkGraph { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
           => optionsBuilder.UseSqlite("Data Source=Data.db");
    }

}
