using System;
using Microsoft.EntityFrameworkCore;
using static covy.Models.Network;

namespace covy.Infastructure.Data {


    public class NetworkContext : DbContext {
        public NetworkContext(DbContextOptions<NetworkContext> options)
       : base(options) { }

        public DbSet<NetworkGraph> NetworkGraph { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
           => optionsBuilder.UseSqlite("Data Source=Data.db");
    }

}
