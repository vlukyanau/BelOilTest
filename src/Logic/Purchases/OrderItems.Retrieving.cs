using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Core;
using Core.Entities;
using Core.Entities.Purchases;
using Logic.Models.Purchases;
using Microsoft.EntityFrameworkCore;


namespace Logic.Purchases
{
    public static partial class OrderItems
    {
        public sealed class Retrieving
        {
            #region Static
            public static Retrieving New()
            {
                return new Retrieving();
            }
            #endregion

            #region Constructors
            private Retrieving()
            {
                this.worker = Worker.New();
            }
            #endregion

            #region Fields
            private readonly IWorker worker;
            #endregion

            #region Propertie
            public Guid? OrderId { get; set; }
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
            public async Task<IResult> Go(Guid orderId)
            {
                try
                {
                    IResult result = await this.Process(orderId);

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
                IQueryable<OrderItem> queryable = this.worker.OrderItems.GetAll();

                if (this.OrderId != null)
                    queryable = queryable.Where(item => item.OrderId == (Guid)this.OrderId);

                IReadOnlyList<OrderItem> orderItems = await queryable.ToListAsync();

                List<IOrderItemInfo> infos = new List<IOrderItemInfo>();

                foreach (OrderItem orderItem in orderItems)
                {
                    IOrderItemInfo info = OrderItemInfo.New(orderItem);

                    infos.Add(info);
                }

                return Result.New(infos);
            }

            private async Task<IResult> Process(Guid id)
            {
                OrderItem orderItem = await this.worker.OrderItems.GetId(id);

                IOrderItemInfo info = OrderItemInfo.New(orderItem);

                return Result.New(info);
            }
            #endregion
        }
    }
}
