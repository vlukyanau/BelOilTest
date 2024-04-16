using System;


namespace Core.Entities.Purchases
{
    public interface IOrderItem
    {
        public Guid Id { get; }
        public Guid OrderId { get; }
        public string Name { get; }
        public decimal Quantity { get; }
        public string Unit { get; }
    }
}
