using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("FinancialTransactions")]
    public class FinancialTransaction
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(400)]
        public string Description { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        [Range(typeof(decimal), "0.01", "9999999999999999")]
        public decimal Value { get; set; }

        public TransactionType Type { get; set; }

        public int CategoryId { get; set; }
        public Category Category { get; set; } = null!;

        public int PersonId { get; set; }
        public Person Person { get; set; } = null!;
    }
}
