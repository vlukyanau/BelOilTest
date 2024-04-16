using System;


namespace Logic.Models.Purchases.Filters
{
    public interface IProviderFilters : IEntry
    {
        public string Name { get; }
    }
}
