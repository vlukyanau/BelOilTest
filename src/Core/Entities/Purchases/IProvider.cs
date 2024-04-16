using System;


namespace Core.Entities.Purchases
{
    public interface IProvider
    {
        public Guid Id { get; }
        public string Name { get; }
    }
}
