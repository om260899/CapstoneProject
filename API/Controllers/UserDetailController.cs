using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Database;
using API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class UserDetailController : ControllerBase
    {
        private readonly DataContext _context;
        public UserDetailController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<GetUserDto>> GetUserByUsername(string username)
        {
            if (username == null) return BadRequest("Username cannot be null !");

            var user = await _context.User.Include(u => u.Notes).FirstOrDefaultAsync(u => u.Username == username);

            var notes = new List<GetNotesDto>();
            user.Notes.ForEach(n =>
            {
                var item = new GetNotesDto
                {
                    Id = n.Id,
                    UserId = n.UserId,
                    Note = n.Note,
                    Date = n.Date,
                    Time = n.Time
                };
                notes.Add(item);
            });

            return new GetUserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Notes = notes
            };
        }

        [HttpPut("update/{username}")]
        public async Task<ActionResult<GetUserDto>> UpdateUser(string username, UpdateUserDto updateUserDto)
        {
            if (updateUserDto == null) return BadRequest("Update value cannot be null!");

            var user = await _context.User.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) return NotFound("User cannot be found with the username " + username);

            user.Username = updateUserDto.Username;
            user.Email = updateUserDto.Email;

            _context.User.Update(user);
            await _context.SaveChangesAsync();

            return new GetUserDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
            };
        }
    }
}