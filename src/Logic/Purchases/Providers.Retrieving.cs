using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using Core;
using Core.Entities.Purchases;
using Logic.Models.Purchases;


namespace Logic.Purchases
{
    public static partial class Providers
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
                IReadOnlyList<Provider> providers = await this.worker.Providers.GetAll().ToListAsync();

                List<IProviderInfo> infos = new List<IProviderInfo>();

                foreach (Provider provider in providers)
                {
                    IProviderInfo info = ProviderInfo.New(provider);

                    infos.Add(info);
                }

                return Result.New(infos);
            }
            #endregion
        }
    }
}
