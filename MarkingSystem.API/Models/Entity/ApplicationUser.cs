using Microsoft.AspNetCore.Identity;

namespace MarkingSystem.API.Models.Entity
{
    //public enum UserRole { Teacher, Student }
    public class ApplicationUser : IdentityUser
    {
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public string FullName { get; set; }

        //public UserRole Role { get; set; }

        public string Role { get; set; }

        public ICollection<Course> Courses { get; set; }
        public ICollection<Booking> Bookings { get; set; }
        public ICollection<PeerAssignment> PeerAssignments { get; set; }
        public ICollection<Notification> Notifications { get; set; }
    }
}
