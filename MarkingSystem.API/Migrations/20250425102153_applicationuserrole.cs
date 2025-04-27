using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MarkingSystem.API.Migrations
{
    /// <inheritdoc />
    public partial class applicationuserrole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4d9b9372-0da0-4dd7-b3af-5541989e3336");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5083a49e-8764-43d0-b9b1-750e2ed1bd32");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "87fe6a6f-11fc-4d64-a927-2659c6ea005e");

            migrationBuilder.AlterColumn<string>(
                name: "Role",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "04e8abfd-b476-490c-b86d-d6b316b02234", "2", "Teacher", "TEACHER" },
                    { "4ae0a9b5-e5a1-4727-ab71-6179a0eab708", "3", "Student", "STUDENT" },
                    { "97ca493b-d8cc-4754-912b-7ba01f2476ed", "1", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "04e8abfd-b476-490c-b86d-d6b316b02234");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4ae0a9b5-e5a1-4727-ab71-6179a0eab708");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "97ca493b-d8cc-4754-912b-7ba01f2476ed");

            migrationBuilder.AlterColumn<int>(
                name: "Role",
                table: "AspNetUsers",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4d9b9372-0da0-4dd7-b3af-5541989e3336", "3", "Student", "STUDENT" },
                    { "5083a49e-8764-43d0-b9b1-750e2ed1bd32", "1", "Admin", "ADMIN" },
                    { "87fe6a6f-11fc-4d64-a927-2659c6ea005e", "2", "Teacher", "TEACHER" }
                });
        }
    }
}
