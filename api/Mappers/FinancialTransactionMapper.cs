using api.Dtos.FinancialTransaction;
using api.Models;

namespace api.Mappers
{
    public static class FinancialTransactionMapper
    {
        public static FinancialTransactionDto ToFinancialTransactionDto(this FinancialTransaction model)
        {
            return new FinancialTransactionDto
            {
                Id = model.Id,
                Description = model.Description,
                Value = model.Value,
                Type = model.Type,
                CategoryId = model.CategoryId,
                CategoryDescription = model.Category.Description,
                PersonId = model.PersonId,
                PersonName = model.Person.Name
            };
        }

        public static FinancialTransaction ToFinancialTransactionFromCreateDto(this CreateFinancialTransactionDto dto)
        {
            return new FinancialTransaction
            {
                Description = dto.Description,
                Value = dto.Value,
                Type = dto.Type,
                CategoryId = dto.CategoryId,
                PersonId = dto.PersonId
            };
        }
    }
}
