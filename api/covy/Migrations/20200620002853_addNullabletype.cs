using Microsoft.EntityFrameworkCore.Migrations;

namespace covy.Migrations
{
    public partial class addNullabletype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "updateCount",
                table: "NetworkGraph",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "updateCount",
                table: "NetworkGraph",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);
        }
    }
}
