using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("People")]
    public class Person
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Range(0, 130)]
        public int Age { get; set; }

        public List<FinancialTransaction> Transactions { get; set; } = new List<FinancialTransaction>();
    }
}
