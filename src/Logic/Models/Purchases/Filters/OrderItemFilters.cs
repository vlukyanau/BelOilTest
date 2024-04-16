namespace Logic.Models.Purchases.Filters
{
    public sealed class OrderItemFilters : IOrderItemFilters
    {
        #region Properties
        public string Name { get; set; }
        public string Unit { get; set; }
        #endregion
    }
}
