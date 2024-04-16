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
                OrderItem orderItem = await this.worker.OrderItems.GetId(this.Id);
                if (orderItem == null)
                    return Result.NotFound;

                this.worker.OrderItems.Delete(orderItem);

                this.worker.Save();

                return Result.Ok;
            }
            #endregion
        }
    }
}
