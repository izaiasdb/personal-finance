using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos.Category
{
    public class CreateCategoryDto
    {
        [Required]
        [MaxLength(400)]
        public string Description { get; set; } = string.Empty;

        [EnumDataType(typeof(CategoryPurpose))]
        public CategoryPurpose Purpose { get; set; }
    }
}
