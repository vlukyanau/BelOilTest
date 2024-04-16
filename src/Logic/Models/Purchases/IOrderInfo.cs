using System;


namespace Logic.Models.Purchases
{
    public interface IOrderInfo : IEntry
    {
        public Guid? Id { get; }
        public string Number { get; }
        public DateTime Date { get; }
        public ProviderInfo ProviderInfo { get; }
    }
}
