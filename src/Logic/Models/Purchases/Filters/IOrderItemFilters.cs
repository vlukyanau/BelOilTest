using System;


namespace Logic.Models.Purchases.Filters
{
    public interface IOrderItemFilters : IEntry
    {
        public string Name { get; }
        public string Unit { get; }
    }
}
