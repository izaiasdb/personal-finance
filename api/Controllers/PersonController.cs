using api.Dtos.Person;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/person")]
    [ApiController]
    public class PersonController : ControllerBase
    {
        private readonly IPersonRepository _personRepository;

        public PersonController(IPersonRepository personRepository)
        {
            _personRepository = personRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var people = await _personRepository.GetAllAsync();
            return Ok(people.Select(p => p.ToPersonDto()));
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var person = await _personRepository.GetByIdAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            return Ok(person.ToPersonDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreatePersonDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = dto.ToPersonFromCreateDto();
            await _personRepository.CreateAsync(person);
            return CreatedAtAction(nameof(GetById), new { id = person.Id }, person.ToPersonDto());
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePersonDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = await _personRepository.UpdateAsync(id, dto);
            if (person == null)
            {
                return NotFound();
            }

            return Ok(person.ToPersonDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var person = await _personRepository.DeleteAsync(id);
            if (person == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
