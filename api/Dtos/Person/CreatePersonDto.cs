using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Person
{
    public class CreatePersonDto
    {
        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Range(0, 130)]
        public int Age { get; set; }
    }
}
