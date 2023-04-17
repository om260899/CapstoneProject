using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class GetNotesDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Note { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
    }
}