using System.ComponentModel.DataAnnotations;
using api.Models;

namespace api.Dtos.FinancialTransaction
{
    public class CreateFinancialTransactionDto
    {
        [Required]
        [MaxLength(400)]
        public string Description { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "Valor deve ser maior que zero.")]
        public decimal Value { get; set; }

        [EnumDataType(typeof(TransactionType))]
        public TransactionType Type { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }

        [Range(1, int.MaxValue)]
        public int PersonId { get; set; }
    }
}
