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
        public sealed class Updating
        {
            #region Static
            public static Updating New()
            {
                return new Updating();
            }
            #endregion

            #region Constructors
            private Updating()
            {
                this.worker = Worker.New();
            }
            #endregion

            #region Fields
            private readonly IWorker worker;
            #endregion

            #region Properties
            public Guid Id { get; set; }
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
                if (this.ProviderInfo == null)
                    throw new ArgumentNullException(nameof(this.ProviderInfo));

                if (this.ProviderInfo.Id == null)
                    throw new ArgumentNullException(nameof(this.ProviderInfo.Id));

                if (string.IsNullOrWhiteSpace(this.Number) == true)
                    throw new ArgumentNullException(nameof(this.Number));
            }

            private async Task<IResult> Process()
            {
                Order order = await this.worker.Orders.GetId(this.Id);
                if (order == null)
                    return Result.NotFound;

                Provider provider = await this.worker.Providers.GetId((Guid)this.ProviderInfo.Id);
                if (provider == null)
                    return Result.NotFound;

                order.Number = this.Number;
                order.Date = this.Date;
                order.ProviderId = provider.Id;

                this.worker.Orders.Update(order);

                this.worker.Save();

                IOrderInfo info = OrderInfo.New(order, provider);

                return Result.New(info, Result.Ok);
            }
            #endregion
        }
    }
}
