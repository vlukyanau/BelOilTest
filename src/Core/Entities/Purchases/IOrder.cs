using System;


namespace Core.Entities.Purchases
{
    public interface IOrder
    {
        public Guid Id { get; }
        public string Number { get; }
        public DateTime Date { get; }
        public Guid ProviderId { get; }
    }
}
