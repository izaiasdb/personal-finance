using api.Dtos.FinancialTransaction;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/transaction")]
    [ApiController]
    public class FinancialTransactionController : ControllerBase
    {
        private readonly IFinancialTransactionRepository _transactionRepository;
        private readonly IPersonRepository _personRepository;
        private readonly ICategoryRepository _categoryRepository;

        public FinancialTransactionController(
            IFinancialTransactionRepository transactionRepository,
            IPersonRepository personRepository,
            ICategoryRepository categoryRepository)
        {
            _transactionRepository = transactionRepository;
            _personRepository = personRepository;
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transactions = await _transactionRepository.GetAllAsync();
            return Ok(transactions.Select(t => t.ToFinancialTransactionDto()));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateFinancialTransactionDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var person = await _personRepository.GetByIdAsync(dto.PersonId);
            if (person == null)
            {
                return BadRequest("Pessoa informada nao existe.");
            }

            var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
            if (category == null)
            {
                return BadRequest("Categoria informada nao existe.");
            }

            if (person.Age < 18 && dto.Type == TransactionType.Income)
            {
                return BadRequest("Para menores de idade, apenas transacoes do tipo despesa sao permitidas.");
            }

            if (!IsCategoryAllowedForTransactionType(category.Purpose, dto.Type))
            {
                return BadRequest("Finalidade da categoria incompativel com o tipo da transacao.");
            }

            var transaction = dto.ToFinancialTransactionFromCreateDto();
            var created = await _transactionRepository.CreateAsync(transaction);
            return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created.ToFinancialTransactionDto());
        }

        private static bool IsCategoryAllowedForTransactionType(CategoryPurpose purpose, TransactionType type)
        {
            if (purpose == CategoryPurpose.Both)
            {
                return true;
            }

            return (type == TransactionType.Expense && purpose == CategoryPurpose.Expense)
                || (type == TransactionType.Income && purpose == CategoryPurpose.Income);
        }
    }
}
