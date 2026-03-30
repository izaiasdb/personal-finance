namespace api.Dtos.Reports
{
    public class PersonTotalsDto : TotalsItemDto
    {
        public int PersonId { get; set; }
        public string PersonName { get; set; } = string.Empty;
    }
}
