using api.Models;

namespace api.Dtos.Category
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public CategoryPurpose Purpose { get; set; }
    }
}
