namespace MarkingSystem.API.Models.Dto
{
    public class TeacherMarkDto
    {
        public int TeacherMarkId { get; set; }
        public string StudentId { get; set; }
        public int SlotId { get; set; }
        public int Score { get; set; }
    }
}
