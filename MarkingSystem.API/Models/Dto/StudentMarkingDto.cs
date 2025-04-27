namespace MarkingSystem.API.Models.Dto
{
    public class StudentMarkingDto
    {
    }

    public class StudentMarkingRequest
    {
        public string StudentId { get; set; } = string.Empty;
        public int TotalMarks { get; set; }
        public List<RubricScore> RubricScores { get; set; } = new();
    }

    public class RubricScore
    {
        public string RubricName { get; set; } = string.Empty;
        public int Score { get; set; }
    }

    public class StudentMarkingGroupedResponse
    {
        public string StudentId { get; set; } = string.Empty;
        public string MarkedBy { get; set; } = string.Empty;
        public List<RubricScoreDetail> FeedbackDetails { get; set; } = new();
    }

    public class RubricScoreDetail
    {
        public string RubricName { get; set; } = string.Empty;
        public int Score { get; set; }
    }
}
