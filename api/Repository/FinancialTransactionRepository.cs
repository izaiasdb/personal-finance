using api.Data;
using api.Dtos.Reports;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class FinancialTransactionRepository : IFinancialTransactionRepository
    {
        private readonly ApplicationDBContext _context;

        public FinancialTransactionRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<FinancialTransaction> CreateAsync(FinancialTransaction transaction)
        {
            await _context.FinancialTransactions.AddAsync(transaction);
            await _context.SaveChangesAsync();

            await _context.Entry(transaction).Reference(t => t.Person).LoadAsync();
            await _context.Entry(transaction).Reference(t => t.Category).LoadAsync();

            return transaction;
        }

        public Task<List<FinancialTransaction>> GetAllAsync()
        {
            return _context.FinancialTransactions
                .Include(t => t.Person)
                .Include(t => t.Category)
                .OrderByDescending(t => t.Id)
                .ToListAsync();
        }

        public async Task<List<PersonTotalsDto>> GetTotalsByPersonAsync()
        {
            var transactions = _context.FinancialTransactions.AsQueryable();

            var peopleWithTotals = await _context.People
                .Select(p => new PersonTotalsDto
                {
                    PersonId = p.Id,
                    PersonName = p.Name,
                    TotalIncome = transactions
                        .Where(t => t.PersonId == p.Id && t.Type == TransactionType.Income)
                        .Select(t => (decimal?)t.Value)
                        .Sum() ?? 0m,
                    TotalExpense = transactions
                        .Where(t => t.PersonId == p.Id && t.Type == TransactionType.Expense)
                        .Select(t => (decimal?)t.Value)
                        .Sum() ?? 0m
                })
                .OrderBy(x => x.PersonName)
                .ToListAsync();

            foreach (var item in peopleWithTotals)
            {
                item.Balance = item.TotalIncome - item.TotalExpense;
            }

            return peopleWithTotals;
        }

        public async Task<List<CategoryTotalsDto>> GetTotalsByCategoryAsync()
        {
            var transactions = _context.FinancialTransactions.AsQueryable();

            var categoriesWithTotals = await _context.Categories
                .Select(c => new CategoryTotalsDto
                {
                    CategoryId = c.Id,
                    CategoryDescription = c.Description,
                    TotalIncome = transactions
                        .Where(t => t.CategoryId == c.Id && t.Type == TransactionType.Income)
                        .Select(t => (decimal?)t.Value)
                        .Sum() ?? 0m,
                    TotalExpense = transactions
                        .Where(t => t.CategoryId == c.Id && t.Type == TransactionType.Expense)
                        .Select(t => (decimal?)t.Value)
                        .Sum() ?? 0m
                })
                .OrderBy(x => x.CategoryDescription)
                .ToListAsync();

            foreach (var item in categoriesWithTotals)
            {
                item.Balance = item.TotalIncome - item.TotalExpense;
            }

            return categoriesWithTotals;
        }
    }
}
