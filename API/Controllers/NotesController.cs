using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Database;
using API.Dtos;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class NotesController : ControllerBase
    {
        private readonly DataContext _context;
        public NotesController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult> AddNote(AddNotesDto addNotesDto)
        {
            if(addNotesDto == null) return BadRequest("Notes cannot be null !");

            var notesToAdd = new Notes
            {
                UserId = addNotesDto.UserId,
                Note = addNotesDto.Note,
                Date = DateTime.Now.Date,
                Time = DateTime.Now.ToUniversalTime()
            };

            await _context.Notes.AddAsync(notesToAdd);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{noteId}")]
        public async Task<ActionResult<GetNotesDto>> DeleteNote(int noteId)
        {
            if(noteId <= 0) return BadRequest("Id cannot be less than 1");

            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == noteId);

            if(note == null) return NotFound("Note with id : " + noteId + " not found");

            _context.Notes.Remove(note);

            await _context.SaveChangesAsync();

            return new GetNotesDto
            {
                Id = note.Id,
                UserId = note.UserId,
                Note = note.Note,
                Date = note.Date,
                Time = note.Time
            };
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<GetNotesDto>> UpdateNote(int id, UpdateNotesDto updateNotesDto)
        {
            if(id <= 0) return BadRequest("Id cannot be less than 1");

            var note = await _context.Notes.FirstOrDefaultAsync(n => n.Id == id);

            if(note == null) return NotFound("Note with id : " + id + " not found");

            note.Note = updateNotesDto.Note;
            note.Date = DateTime.Now.Date;
            note.Time = DateTime.Now.ToUniversalTime();
            
            _context.Notes.Update(note);
            await _context.SaveChangesAsync();

            return new GetNotesDto
            {
                Id = note.Id,
                UserId = note.UserId,
                Note = note.Note,
                Date = note.Date,
                Time = note.Time
            };
        }
    }
}