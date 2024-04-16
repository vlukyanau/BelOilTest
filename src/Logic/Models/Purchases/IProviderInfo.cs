using System;


namespace Logic.Models.Purchases
{
    public interface IProviderInfo : IEntry
    {
        public Guid? Id { get; }
        public string Name { get; }
    }
}
