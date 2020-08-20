using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(UserForRegister userForRegister)
        {
            // Validate request 

            // Lowercase the User name 
            userForRegister.Email = userForRegister.Email.ToLower();

            // Check if the user already exits.
            if (await _repo.UserExits(userForRegister.Email))
            {
                return BadRequest("User Name already exits.");
            }
            var user = new User
            {
                Email = userForRegister.Email
            };

            await _repo.Register(user, userForRegister.Password);

            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLogin userForLogin)
        {
            // throw new Exception("Something went wrong!");
            // check if user is exits 
            var user = await _repo.Login(userForLogin.Email.ToLower(), userForLogin.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            // token will contains two claims one is user id and another one is User name
            var claim = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
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

            var userInfo = _mapper.Map<UserListDto>(user);

            return Ok(new
            {
                token = tokenHnadeler.WriteToken(token),
                userInfo
            });
        }

    }
}