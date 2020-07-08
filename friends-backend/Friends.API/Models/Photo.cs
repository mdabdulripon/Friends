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
        public string PublicId { get; set; }
        // if we add this following information we can have cascade delete instance of restricted delete
        // cascade delete: if user is delete then the photos will be delete 
        // restricted delete: Even though the user is deleted but picture won't be delete. 
        public User user { get; set; }
        public int UserId { get; set; }
    }
}