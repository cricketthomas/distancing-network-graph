using Microsoft.EntityFrameworkCore.Migrations;

namespace covy.Migrations
{
    public partial class NetworkName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "networkName",
                table: "NetworkGraph",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "networkName",
                table: "NetworkGraph");
        }
    }
}
