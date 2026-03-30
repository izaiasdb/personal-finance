using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models
{
    [Table("Categories")]
    public class Category
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(400)]
        public string Description { get; set; } = string.Empty;

        public CategoryPurpose Purpose { get; set; }

        public List<FinancialTransaction> Transactions { get; set; } = new List<FinancialTransaction>();
    }
}
