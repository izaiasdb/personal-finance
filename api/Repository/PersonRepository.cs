using api.Data;
using api.Dtos.Person;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private readonly ApplicationDBContext _context;

        public PersonRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Person> CreateAsync(Person person)
        {
            await _context.People.AddAsync(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task<Person?> DeleteAsync(int id)
        {
            var person = await _context.People.FirstOrDefaultAsync(x => x.Id == id);
            if (person == null)
            {
                return null;
            }

            _context.People.Remove(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public Task<List<Person>> GetAllAsync()
        {
            return _context.People
                .OrderBy(p => p.Name)
                .ToListAsync();
        }

        public Task<Person?> GetByIdAsync(int id)
        {
            return _context.People.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Person?> UpdateAsync(int id, UpdatePersonDto updateDto)
        {
            var person = await _context.People.FirstOrDefaultAsync(x => x.Id == id);
            if (person == null)
            {
                return null;
            }

            person.Name = updateDto.Name;
            person.Age = updateDto.Age;

            await _context.SaveChangesAsync();
            return person;
        }
    }
}
