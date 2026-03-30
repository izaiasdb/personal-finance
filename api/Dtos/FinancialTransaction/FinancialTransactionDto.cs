using api.Models;

namespace api.Dtos.FinancialTransaction
{
    public class FinancialTransactionDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public decimal Value { get; set; }
        public TransactionType Type { get; set; }
        public int CategoryId { get; set; }
        public string CategoryDescription { get; set; } = string.Empty;
        public int PersonId { get; set; }
        public string PersonName { get; set; } = string.Empty;
    }
}
