using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDBContext _context;

        public CategoryRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public Task<List<Category>> GetAllAsync()
        {
            return _context.Categories
                .OrderBy(c => c.Description)
                .ToListAsync();
        }

        public Task<Category?> GetByIdAsync(int id)
        {
            return _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
