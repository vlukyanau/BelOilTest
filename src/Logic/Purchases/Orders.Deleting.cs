using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Core;
using Core.Entities.Purchases;


namespace Logic.Purchases
{
    public static partial class Orders
    {
        public sealed class Deleting
        {
            #region Static
            public static Deleting New()
            {
                return new Deleting();
            }
            #endregion

            #region Constructors
            private Deleting()
            {
                this.worker = Worker.New();
            }
            #endregion

            #region Fields
            private readonly IWorker worker;
            #endregion

            #region Properties
            public Guid Id { get; set; }
            #endregion

            #region Methods
            public async Task<IResult> Go()
            {
                try
                {
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
            private async Task<IResult> Process()
            {
                Order order = await this.worker.Orders.GetId(this.Id);
                if (order == null)
                    return Result.NotFound;

                IReadOnlyList<OrderItem> orderItems = await this.worker.OrderItems.Where(item => item.OrderId == order.Id).ToListAsync();

                this.worker.OrderItems.Delete(orderItems);
                this.worker.Orders.Delete(order);

                this.worker.Save();

                return Result.Ok;
            }
            #endregion
        }
    }
}
