using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Friends.API.Dtos
{
    public class UserForRegister
    {
        [Required]
        //[EmailAddress]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Password must be between 4 to 8 characters")]
        public string Password { get; set; }
    }
}
