using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace covy.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NetworkGraph",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    schema = table.Column<string>(nullable: true),
                    updateCount = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NetworkGraph", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NetworkGraph");
        }
    }
}
