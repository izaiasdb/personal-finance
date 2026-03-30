using api.Dtos.Category;
using api.Models;

namespace api.Mappers
{
    public static class CategoryMapper
    {
        public static CategoryDto ToCategoryDto(this Category model)
        {
            return new CategoryDto
            {
                Id = model.Id,
                Description = model.Description,
                Purpose = model.Purpose
            };
        }

        public static Category ToCategoryFromCreateDto(this CreateCategoryDto dto)
        {
            return new Category
            {
                Description = dto.Description,
                Purpose = dto.Purpose
            };
        }
    }
}
