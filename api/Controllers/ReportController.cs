using api.Dtos.Reports;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/report")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IFinancialTransactionRepository _transactionRepository;

        public ReportController(IFinancialTransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        [HttpGet("person-totals")]
        public async Task<IActionResult> GetTotalsByPerson()
        {
            var items = await _transactionRepository.GetTotalsByPersonAsync();
            var response = new ReportResponseDto<PersonTotalsDto>
            {
                Items = items,
                GrandTotal = new TotalsItemDto
                {
                    TotalIncome = items.Sum(x => x.TotalIncome),
                    TotalExpense = items.Sum(x => x.TotalExpense),
                    Balance = items.Sum(x => x.Balance)
                }
            };

            return Ok(response);
        }

        [HttpGet("category-totals")]
        public async Task<IActionResult> GetTotalsByCategory()
        {
            var items = await _transactionRepository.GetTotalsByCategoryAsync();
            var response = new ReportResponseDto<CategoryTotalsDto>
            {
                Items = items,
                GrandTotal = new TotalsItemDto
                {
                    TotalIncome = items.Sum(x => x.TotalIncome),
                    TotalExpense = items.Sum(x => x.TotalExpense),
                    Balance = items.Sum(x => x.Balance)
                }
            };

            return Ok(response);
        }
    }
}
