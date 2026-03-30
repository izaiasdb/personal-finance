namespace api.Dtos.Reports
{
    public class CategoryTotalsDto : TotalsItemDto
    {
        public int CategoryId { get; set; }
        public string CategoryDescription { get; set; } = string.Empty;
    }
}
