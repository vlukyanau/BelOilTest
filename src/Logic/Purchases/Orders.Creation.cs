using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Core;
using Core.Entities.Purchases;
using Logic.Models.Purchases;


namespace Logic.Purchases
{
    public static partial class Orders
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
            public string Number { get; set; }
            public DateTime Date { get; set; }
            public ProviderInfo ProviderInfo { get; set; }
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

                if (this.ProviderInfo == null)
                    throw new ArgumentNullException(nameof(this.ProviderInfo));

                if (this.ProviderInfo.Id == null)
                    throw new ArgumentNullException(nameof(this.ProviderInfo.Id));

                if (string.IsNullOrWhiteSpace(this.Number) == true)
                    throw new ArgumentNullException(nameof(this.Number));
            }

            private async Task<IResult> Process()
            {
                Provider provider = await this.worker.Providers.GetId((Guid)this.ProviderInfo.Id);
                if (provider == null)
                    return Result.NotFound;

                Order order = Order.New((Guid)ProviderInfo.Id);
                order.Number = this.Number;
                order.Date = this.Date.ToUniversalTime();

                await this.worker.Orders.Add(order);

                this.worker.Save();

                IOrderInfo info = OrderInfo.New(order, provider);

                return Result.New(info, Result.Created);
            }
            #endregion
        }
    }
}
