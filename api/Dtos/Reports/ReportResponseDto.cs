namespace api.Dtos.Reports
{
    public class ReportResponseDto<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public TotalsItemDto GrandTotal { get; set; } = new TotalsItemDto();
    }
}
