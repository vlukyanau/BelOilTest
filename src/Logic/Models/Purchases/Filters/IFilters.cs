namespace Logic.Models.Purchases.Filters
{
    public interface IFilters : IEntry
    {
        public OrderFilters OrderFilters { get; }
        public OrderItemFilters OrderItemFilters { get; }
        public ProviderFilters ProviderFilters { get; }
    }
}
