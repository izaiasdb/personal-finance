using api.Dtos.Reports;
using api.Models;

namespace api.Interfaces
{
    public interface IFinancialTransactionRepository
    {
        Task<List<FinancialTransaction>> GetAllAsync();
        Task<FinancialTransaction> CreateAsync(FinancialTransaction transaction);
        Task<List<PersonTotalsDto>> GetTotalsByPersonAsync();
        Task<List<CategoryTotalsDto>> GetTotalsByCategoryAsync();
    }
}
