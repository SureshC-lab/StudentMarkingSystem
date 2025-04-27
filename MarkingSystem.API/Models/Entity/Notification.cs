using System.ComponentModel.DataAnnotations;

namespace MarkingSystem.API.Models.Entity
{
    public class Notification : Common
    {
        [Key]
        public int NotificationId { get; set; }
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public string Message { get; set; }
        public bool IsRead { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
