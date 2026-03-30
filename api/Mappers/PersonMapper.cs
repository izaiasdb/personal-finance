using api.Dtos.Person;
using api.Models;

namespace api.Mappers
{
    public static class PersonMapper
    {
        public static PersonDto ToPersonDto(this Person model)
        {
            return new PersonDto
            {
                Id = model.Id,
                Name = model.Name,
                Age = model.Age
            };
        }

        public static Person ToPersonFromCreateDto(this CreatePersonDto dto)
        {
            return new Person
            {
                Name = dto.Name,
                Age = dto.Age
            };
        }
    }
}
