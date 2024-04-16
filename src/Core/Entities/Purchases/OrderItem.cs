using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Core.Entities.Purchases
{
    [Index("Name", "Unit")]
    public sealed class OrderItem : Entity, IOrderItem
    {
        #region Static
        public static OrderItem New(Guid orderId)
        {
            OrderItem item = new OrderItem();
            item.Id = Guid.NewGuid();
            item.OrderId = orderId;

            return item;
        }
        #endregion

        #region Constructors
        private OrderItem()
        {
        }
        #endregion

        #region Properties
        [Required]
        public Guid Id { get; private set; }

        [Required]
        public Guid OrderId { get; private set; }

        [ForeignKey("OrderId")]
        public Order Order { get; private set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public decimal Quantity { get; set; }

        [Required]
        public string Unit { get; set; }
        #endregion
    }
}
