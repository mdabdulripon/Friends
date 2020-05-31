using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Friends.API.Dtos;
using Friends.API.Models;
using Friends.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Friends.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
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

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLogin userForLogin)
        {
            // check if user is exits 
            var user = await _repo.Login(userForLogin.Username.ToLower(), userForLogin.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            // token will contains two claims one is user id and another one is username
            var claim = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            // Creating a security key 
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            // Creating the key to hash 
            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credential
            };

            var tokenHnadeler = new JwtSecurityTokenHandler();

            var token = tokenHnadeler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHnadeler.WriteToken(token)
            });
        }

    }
}