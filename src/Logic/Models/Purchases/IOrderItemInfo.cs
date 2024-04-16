using System;


namespace Logic.Models.Purchases
{
    public interface IOrderItemInfo : IEntry
    {
        public Guid? Id { get; }
        public Guid OrderId { get; }
        public string Name { get; }
        public decimal Quantity { get; }
        public string Unit { get; }
    }
}
