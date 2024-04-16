using System;


namespace Logic.Models.Purchases.Filters
{
    public interface IOrderFilters : IEntry
    {
        public string Number { get; }
        public Period Period { get; }
        public Guid? ProviderId { get; }
    }
}
