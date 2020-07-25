using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace distancing.Models {
    public class Network {
        public Network() {
        }

        public class Node {
            public int id { get; set; }
            public string name { get; set; }
            public string sex { get; set; }
            public int index { get; set; }
            //public double x { get; set; }
            //public double y { get; set; }
            //public double vy { get; set; }
            //public double vx { get; set; }

        }

        public class Source {
            public int id { get; set; }
            public string name { get; set; }
            public string sex { get; set; }
            public int index { get; set; }
            //public double x { get; set; }
            //public double y { get; set; }
            //public double vy { get; set; }
            //public double vx { get; set; }

        }

        public class Target {
            public int id { get; set; }
            public string name { get; set; }
            public string sex { get; set; }
            public int index { get; set; }
            //public double x { get; set; }
            //public double y { get; set; }
            //public double vy { get; set; }
            //public double vx { get; set; }

        }

        public class Link {
            public Source source { get; set; }
            public Target target { get; set; }
            public int index { get; set; }

        }

        public class NodeLinks {
            public IList<Node> nodes { get; set; }
            public IList<Link> links { get; set; }

        }

        public class updateNetworkGraph {
            public string networkName { get; set; }
            public string shortId { get; set; }
            public NodeLinks schema { get; set; }
        }


        public class NetworkGraph {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public Guid Id { get; set; }
            public string networkName { get; set; }
            public string shortId { get; set; }
            public string schema { get; set; }
            public int? updateCount { get; set; }
        }

    }
}
