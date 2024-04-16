using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Core.Entities.Purchases
{
    [Index("Number", "Date")]
    public sealed class Order : Entity, IOrder
    {
        #region Static
        public static Order New(Guid providerId)
        {
            Order order = new Order();
            order.Id = Guid.NewGuid();
            order.ProviderId = providerId;

            return order;
        }
        #endregion

        #region Constructors
        private Order()
        {
        }
        #endregion

        #region Properties
        [Required]
        public Guid Id { get; private set; }

        [Required]
        public string Number { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public Guid ProviderId { get; set; }

        [ForeignKey("ProviderId")]
        public Provider Provider { get; set; }
        #endregion
    }
}
