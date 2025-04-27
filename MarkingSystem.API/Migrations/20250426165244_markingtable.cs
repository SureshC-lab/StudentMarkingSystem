using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MarkingSystem.API.Migrations
{
    /// <inheritdoc />
    public partial class markingtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "StudentMarkings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalMarks = table.Column<int>(type: "int", nullable: false),
                    MarkedBy = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentMarkings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudentMarkingDetails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentMarkingId = table.Column<int>(type: "int", nullable: false),
                    RubricName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Score = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentMarkingDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentMarkingDetails_StudentMarkings_StudentMarkingId",
                        column: x => x.StudentMarkingId,
                        principalTable: "StudentMarkings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a3af7b29-b421-4b7a-a90b-5b604006bc38", "2", "Teacher", "TEACHER" },
                    { "acb8f4fd-fa6e-4fd2-acc3-fafdb7927779", "1", "Admin", "ADMIN" },
                    { "e85f3d9c-b878-4e49-aa3c-73d05cc45b84", "3", "Student", "STUDENT" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_StudentMarkingDetails_StudentMarkingId",
                table: "StudentMarkingDetails",
                column: "StudentMarkingId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentMarkingDetails");

            migrationBuilder.DropTable(
                name: "StudentMarkings");

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
                    { "04e8abfd-b476-490c-b86d-d6b316b02234", "2", "Teacher", "TEACHER" },
                    { "4ae0a9b5-e5a1-4727-ab71-6179a0eab708", "3", "Student", "STUDENT" },
                    { "97ca493b-d8cc-4754-912b-7ba01f2476ed", "1", "Admin", "ADMIN" }
                });
        }
    }
}
