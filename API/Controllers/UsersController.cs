using System.Security.Cryptography;
using System.Text;
using API.Database;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public UsersController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterUserDto registerUserDto) 
        {
            if(await UserExists(registerUserDto.Username!)) 
                return BadRequest("User with username " + registerUserDto.Username + " already exists");

            using var hmac = new HMACSHA512();

            var user = new User
            {
                Username = registerUserDto.Username,
                Email = registerUserDto.Email,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerUserDto?.Password!)),
                PasswordSalt = hmac.Key
            };

            _context.User!.Add(user);
            await _context.SaveChangesAsync();
            return new UserDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) 
        {
            var user = await _context.User.FirstOrDefaultAsync(user => user.Username!.ToLower() == loginDto.Username.ToLower());
            if(user == null) return Unauthorized("Invalid Username");
            using var hmac = new HMACSHA512(user.PasswordSalt!);
            var pass = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password!));

            for(int i=0; i<pass.Length; i++)
            {
                if(pass[i] != user.PasswordHash![i]) return Unauthorized("Invalid Password");
            }
            
            return new UserDto
            {
                Username = user.Username,
                Token = _tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username) 
        {
           return await _context.User!.AnyAsync(user => user.Username!.ToLower() == username.ToLower());
        }

    }
}