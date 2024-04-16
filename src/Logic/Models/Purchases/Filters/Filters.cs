namespace Logic.Models.Purchases.Filters
{
    public class Filters : IFilters
    {
        public OrderFilters OrderFilters { get; set; }
        public OrderItemFilters OrderItemFilters { get; set; }
        public ProviderFilters ProviderFilters { get; set; }
    }
}
