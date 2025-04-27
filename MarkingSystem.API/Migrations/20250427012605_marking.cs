using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MarkingSystem.API.Migrations
{
    /// <inheritdoc />
    public partial class marking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a3af7b29-b421-4b7a-a90b-5b604006bc38");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "acb8f4fd-fa6e-4fd2-acc3-fafdb7927779");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e85f3d9c-b878-4e49-aa3c-73d05cc45b84");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "3aaead72-3202-47ff-a14a-0191e816e7a7", "2", "Teacher", "TEACHER" },
                    { "47cce2a9-3274-462f-83f3-ca9f01be67ca", "1", "Admin", "ADMIN" },
                    { "59deb130-c107-4457-b178-e5c1b44484b1", "3", "Student", "STUDENT" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3aaead72-3202-47ff-a14a-0191e816e7a7");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "47cce2a9-3274-462f-83f3-ca9f01be67ca");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "59deb130-c107-4457-b178-e5c1b44484b1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a3af7b29-b421-4b7a-a90b-5b604006bc38", "2", "Teacher", "TEACHER" },
                    { "acb8f4fd-fa6e-4fd2-acc3-fafdb7927779", "1", "Admin", "ADMIN" },
                    { "e85f3d9c-b878-4e49-aa3c-73d05cc45b84", "3", "Student", "STUDENT" }
                });
        }
    }
}
