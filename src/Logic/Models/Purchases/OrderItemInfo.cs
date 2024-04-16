using System;
using Core.Entities.Purchases;


namespace Logic.Models.Purchases
{
    public sealed class OrderItemInfo : IOrderItemInfo
    {
        #region Static
        public static OrderItemInfo New(IOrderItem orderItem)
        {
            OrderItemInfo info = new OrderItemInfo();
            info.Id = orderItem.Id;
            info.OrderId = orderItem.OrderId;
            info.Name = orderItem.Name;
            info.Quantity = orderItem.Quantity;
            info.Unit = orderItem.Unit;

            return info;
        }
        #endregion

        #region Properties
        public Guid? Id { get; set; }
        public Guid OrderId { get; set; }
        public string Name { get; set; }
        public decimal Quantity { get; set; }
        public string Unit { get; set; }
        #endregion
    }
}
