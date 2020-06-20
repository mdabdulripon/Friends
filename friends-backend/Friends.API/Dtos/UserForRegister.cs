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
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [StringLength(32, MinimumLength = 8, ErrorMessage = "Password must be between 4 to 32 characters")]
        public string Password { get; set; }
    }
}
