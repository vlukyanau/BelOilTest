using System;


namespace Logic.Models.Purchases.Filters
{
    public sealed class OrderFilters : IOrderFilters
    {
        #region Properties
        public string Number { get; set; }
        public Period Period { get; set; }
        public Guid? ProviderId { get; set; }
        #endregion
    }
}
