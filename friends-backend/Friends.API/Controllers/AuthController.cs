using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Friends.API.Dtos;
using Friends.API.Models;
using Friends.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Friends.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;

        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserForRegister userForRegister)
        {
            // Validate request 

            // Lowercase the username 
            userForRegister.Username = userForRegister.Username.ToLower();

            // Check if the user already exits.
            if (await _repo.UserExits(userForRegister.Username))
            {
                return BadRequest("User Name already exits.");
            }
            var user = new User
            {
                Username = userForRegister.Username
            };

            await _repo.Register(user, userForRegister.Password);

            return StatusCode(201);
        }

    }
}