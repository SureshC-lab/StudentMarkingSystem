using MarkingSystem.API.Models.Entity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MarkingSystem.API.DataBaseContext
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {
        }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Rubric> Rubrics { get; set; }
        public DbSet<RubricCriteria> RubricCriteria { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<PeerAssignment> PeerAssignments { get; set; }
        public DbSet<PeerMark> PeerMarks { get; set; }
        public DbSet<TeacherMark> TeacherMarks { get; set; }
        public DbSet<FinalMark> FinalMarks { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<StudentMarking> StudentMarkings { get; set; }
        public DbSet<StudentMarkingDetail> StudentMarkingDetails { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            this.SeedRoles(modelBuilder);

            //modelBuilder.Entity<Booking>()
            //.HasIndex(b => new { b.SlotId, b.StudentId })
            //.IsUnique();

            //modelBuilder.Entity<PeerAssignment>()
            //    .HasIndex(pa => new { pa.StudentId, pa.PeerId, pa.SlotId })
            //    .IsUnique();

            modelBuilder.Entity<PeerAssignment>()
        .HasOne(pa => pa.Student)  // Student (the student doing the marking)
        .WithMany(u => u.PeerAssignments)  // ApplicationUser has many PeerAssignments
        .HasForeignKey(pa => pa.StudentId)  // Foreign key in PeerAssignment to ApplicationUser
        .OnDelete(DeleteBehavior.Cascade);  // Optional, specify cascade delete behavior if needed

            modelBuilder.Entity<PeerAssignment>()
                .HasOne(pa => pa.Peer)  // Peer (the student being marked)
                .WithMany()  // Peer does not have navigation property to PeerAssignments (inverse side)
                .HasForeignKey(pa => pa.PeerId)  // Foreign key to ApplicationUser
                .OnDelete(DeleteBehavior.Restrict);  // Optional, specify delete behavior for Peer

            modelBuilder.Entity<PeerMark>()
        .HasOne(pm => pm.RubricCriteria)  // Reference to RubricCriteria
        .WithMany()  // RubricCriteria does not have navigation to PeerMarks
        .HasForeignKey(pm => pm.RubricCriteriaId)  // Foreign key in PeerMarks
        .OnDelete(DeleteBehavior.Restrict);  // Prevent cascading deletes

            modelBuilder.Entity<StudentMarkingDetail>()
        .HasOne(d => d.StudentMarking)
        .WithMany(m => m.FeedbackDetails)
        .HasForeignKey(d => d.StudentMarkingId)
        .OnDelete(DeleteBehavior.Cascade);

        }



        private void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData(
                new IdentityRole() { Id = Guid.NewGuid().ToString(), Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "ADMIN" },
                new IdentityRole() { Id = Guid.NewGuid().ToString(), Name = "Teacher", ConcurrencyStamp = "2", NormalizedName = "TEACHER" },
                new IdentityRole() { Id = Guid.NewGuid().ToString(), Name = "Student", ConcurrencyStamp = "3", NormalizedName = "STUDENT" }
                );
        }
    }
}
