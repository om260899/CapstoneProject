namespace API.Entities
{
    public class Notes
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Note { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public User? User { get; set; }
    }
}