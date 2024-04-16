using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Core;
using Core.Entities.Purchases;
using Logic.Models.Purchases;


namespace Logic.Purchases
{
    public static partial class OrderItems
    {
        public sealed class Creation
        {
            #region Static
            public static Creation New()
            {
                return new Creation();
            }
            #endregion

            #region Constructors
            private Creation()
            {
                this.worker = Worker.New();
            }
            #endregion

            #region Fields
            private readonly IWorker worker;
            #endregion

            #region Properties
            public Guid? Id { get; set; }
            public Guid OrderId { get; set; }
            public string Name { get; set; }
            public decimal Quantity { get; set; }
            public string Unit { get; set; }
            #endregion

            #region Methods
            public async Task<IResult> Go()
            {
                try
                {
                    this.Verify();

                    IResult result = await this.Process();

                    return result;

                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception);

                    return Result.New(exception);
                }
            }
            #endregion

            #region Assistants
            private void Verify()
            {
                if (this.Id != null)
                    throw new ArgumentException($"{nameof(this.Id)} should be skip.");

                if (this.Quantity < 0)
                    throw new ArgumentException($"{nameof(this.Quantity)} should be less or equals to 0");

                if (string.IsNullOrWhiteSpace(this.Name) == true)
                    throw new ArgumentNullException(nameof(this.Name));

                if (string.IsNullOrWhiteSpace(this.Unit) == true)
                    throw new ArgumentNullException(nameof(this.Unit));
            }

            private async Task<IResult> Process()
            {
                OrderItem orderItem = OrderItem.New(this.OrderId);
                orderItem.Name = this.Name;
                orderItem.Quantity = this.Quantity;
                orderItem.Unit = this.Unit;

                await this.worker.OrderItems.Add(orderItem);

                this.worker.Save();

                IOrderItemInfo info = OrderItemInfo.New(orderItem);

                return Result.New(info, Result.Created);
            }

            #endregion
        }
    }
}
