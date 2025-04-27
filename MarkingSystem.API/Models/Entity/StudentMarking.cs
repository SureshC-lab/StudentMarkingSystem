namespace MarkingSystem.API.Models.Entity
{
    public class StudentMarking
    {
        public int Id { get; set; }
        public string StudentId { get; set; } = string.Empty;
        public int TotalMarks { get; set; }
        public string MarkedBy {  get; set; }
        public ICollection<StudentMarkingDetail> FeedbackDetails { get; set; } = new List<StudentMarkingDetail>();
    }

    public class StudentMarkingDetail
    {
        public int Id { get; set; }
        public int StudentMarkingId { get; set; } // Foreign Key
        public string RubricName { get; set; } = string.Empty;
        public int Score { get; set; }

        public StudentMarking StudentMarking { get; set; } = null!;
    }
}
