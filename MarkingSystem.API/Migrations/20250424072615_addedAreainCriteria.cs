using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MarkingSystem.API.Migrations
{
    /// <inheritdoc />
    public partial class addedAreainCriteria : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "19f17742-63ee-4ef5-87ca-964cd5bb8aad");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1dff4352-6b75-43a3-9f27-8bd92dd70ece");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "20b2c6d8-c79a-4928-9d40-c88782ee476c");

            migrationBuilder.AddColumn<string>(
                name: "Area",
                table: "RubricCriteria",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Area",
                table: "RubricCriteria");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "19f17742-63ee-4ef5-87ca-964cd5bb8aad", "2", "Teacher", "TEACHER" },
                    { "1dff4352-6b75-43a3-9f27-8bd92dd70ece", "1", "Admin", "ADMIN" },
                    { "20b2c6d8-c79a-4928-9d40-c88782ee476c", "3", "Student", "STUDENT" }
                });
        }
    }
}
