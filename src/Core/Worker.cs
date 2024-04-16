using System;
using Core.Repository;


namespace Core
{
    public interface IWorker
    {
        IOrdersRepository Orders { get; }
        IOrderItemsRepository OrderItems { get; }
        IProvidersRepository Providers { get; }

        int Save();
    }

    public class Worker : IWorker, IDisposable
    {
        #region Static
        public static IWorker New()
        {
            return new Worker();
        }
        #endregion

        #region Constructors
        private Worker()
        {
            ApplicationContext context = new ApplicationContext();

            this.context = context;

            this.Orders = OrdersRepository.New(context);
            this.OrderItems = OrderItemsRepository.New(context);
            this.Providers = ProvidersRepository.New(context);
        }
        #endregion

        #region Fields
        private readonly ApplicationContext context;
        #endregion

        #region Properties
        public IOrdersRepository Orders { get; }
        public IOrderItemsRepository OrderItems { get; }
        public IProvidersRepository Providers { get; }
        #endregion

        #region IWork
        int IWorker.Save()
        {
            return this.context.SaveChanges();
        }
        #endregion

        #region IDisposable
        void IDisposable.Dispose()
        {
            this.Dispose(true);

            GC.SuppressFinalize(this);
        }
        #endregion

        #region Methods
        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                this.context.Dispose();
            }
        }
        #endregion
    }
}
