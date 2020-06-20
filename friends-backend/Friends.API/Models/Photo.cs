using System;

namespace Friends.API.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime AddedDate { get; set; }
        public bool IsMain { get; set; }
        // if we add this following information we can have cascade delete instance of restricted delete
        public User user { get; set; }
        public int UserId { get; set; }
    }
}