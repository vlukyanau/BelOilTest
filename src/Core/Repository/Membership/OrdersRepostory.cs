using Core.Entities.Purchases;


namespace Core.Repository
{
    internal class OrdersRepository : Repository<Order>, IOrdersRepository
    {
        #region Static
        public static OrdersRepository New(ApplicationContext context)
        {
            return new OrdersRepository(context);
        }
        #endregion

        #region Constructors
        private OrdersRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}
