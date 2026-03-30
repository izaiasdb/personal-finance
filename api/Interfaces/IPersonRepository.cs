using api.Dtos.Person;
using api.Models;

namespace api.Interfaces
{
    public interface IPersonRepository
    {
        Task<List<Person>> GetAllAsync();
        Task<Person?> GetByIdAsync(int id);
        Task<Person> CreateAsync(Person person);
        Task<Person?> UpdateAsync(int id, UpdatePersonDto updateDto);
        Task<Person?> DeleteAsync(int id);
    }
}
