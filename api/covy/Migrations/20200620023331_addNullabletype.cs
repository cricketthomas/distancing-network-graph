using Microsoft.EntityFrameworkCore.Migrations;

namespace distancing.Migrations {
    public partial class addNullabletype : Migration {
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<string>(
                name: "shortId",
                table: "NetworkGraph",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropColumn(
                name: "shortId",
                table: "NetworkGraph");
        }
    }
}
