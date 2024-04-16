using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Core;
using Core.Entities;
using Core.Entities.Purchases;
using Logic.Models;
using Logic.Models.Purchases;
using Logic.Models.Purchases.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;


namespace Logic.Purchases
{
    public static partial class Orders
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

            #region Properties
            public Filters Filters { get; set; }
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
            public async Task<IResult> Go(Guid id)
            {
                try
                {
                    IResult result = await this.Process(id);

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
                IReadOnlyList<Order> orders = await this.GetOrders();

                IReadOnlyList<Guid> orderIds = orders.Ids(item => item.ProviderId);

                IReadOnlyList<Provider> providers = await this.worker.Providers.Where(item => orderIds.Contains(item.Id)).ToListAsync();

                List<IOrderInfo> infos = new List<IOrderInfo>();

                foreach (Order order in orders)
                {
                    Provider provider = providers.FirstOrDefault(item => item.Id == order.ProviderId);
                    if (provider == null)
                        return Result.NotFound;

                    IOrderInfo info = OrderInfo.New(order, provider);

                    infos.Add(info);
                }

                return Result.New(infos);
            }
            private async Task<IResult> Process(Guid id)
            {
                Order order = await this.worker.Orders.GetId(id);
                if (order == null)
                    return Result.NotFound;

                IReadOnlyList<Provider> providers = await this.worker.Providers.Where(item => item.Id == order.ProviderId).ToListAsync();

                Provider provider = providers.FirstOrDefault(item => item.Id == order.ProviderId);
                if (provider == null)
                    return Result.NotFound;

                IOrderInfo info = OrderInfo.New(order, provider);

                return Result.New(info);
            }

            private async Task<IReadOnlyList<Order>> GetOrders()
            {
                IQueryable<Order> orders = this.worker.Orders.GetAll();

                if (this.Filters != null)
                {
                    IQueryable<OrderItem> orderItems = this.worker.OrderItems.GetAll();
                    IQueryable<Provider> providers = this.worker.Providers.GetAll();

                    var query = from order in orders
                                join orderItem in orderItems
                                    on order.Id equals orderItem.OrderId into orderItemResult
                                from x in orderItemResult.DefaultIfEmpty()
                                join provider in providers
                                    on order.ProviderId equals provider.Id into oroviderResult
                                from y in oroviderResult.DefaultIfEmpty()
                                select new
                                {
                                    Order = order,
                                    OrderItem = x,
                                    Provider = y
                                };

                    // OrderFilter
                    OrderFilters orderFilters = this.Filters.OrderFilters;

                    if (orderFilters != null)
                    {
                        if (string.IsNullOrEmpty(orderFilters.Number) == false)
                            query = query.Where(item => item.Order.Number.Contains(orderFilters.Number));

                        Period period = this.GetFilterPeriod();

                        query = query.Where(item => item.Order.Date >= period.From && item.Order.Date <= period.Till);

                        if (orderFilters.ProviderId != null)
                            query = query.Where(item => item.Order.ProviderId == orderFilters.ProviderId);
                    }

                    // OrderItemFilter
                    OrderItemFilters orderItemFilters = this.Filters.OrderItemFilters;
                    if (orderItemFilters != null)
                    {
                        if (string.IsNullOrEmpty(orderItemFilters.Name) == false)
                            query = query.Where(item => item.OrderItem.Name.Contains(orderItemFilters.Name));


                        if (string.IsNullOrEmpty(orderItemFilters.Unit) == false)
                            query = query.Where(item => item.OrderItem.Unit.Contains(orderItemFilters.Unit));
                    }

                    // ProviderFilter
                    ProviderFilters providerFilters = this.Filters.ProviderFilters;
                    if (providerFilters != null)
                    {
                        if (string.IsNullOrEmpty(providerFilters.Name) == false)
                            query = query.Where(item => item.Provider.Name.Contains(providerFilters.Name));
                    }

                    return await query.Select(item => item.Order).ToListAsync();
                }

                return await orders.ToListAsync();
            }

            private Period GetFilterPeriod()
            {
                DateTime from = DateTime.MinValue;
                DateTime till = DateTime.MaxValue;

                if (this.Filters.OrderFilters == null || this.Filters.OrderFilters.Period == null)
                    return (from, till);

                Period period = this.Filters.OrderFilters.Period;

                if (period.From != null)
                    from = ((DateTime)period.From).ToUniversalTime();

                if (period.Till != null)
                    till = ((DateTime)period.Till).ToUniversalTime();

                return (from, till);
            }
            #endregion
        }
    }
}
