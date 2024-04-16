using Core.Entities.Purchases;


namespace Core.Repository
{
    internal class OrderItemsRepository : Repository<OrderItem>, IOrderItemsRepository
    {
        #region Static
        public static OrderItemsRepository New(ApplicationContext context)
        {
            return new OrderItemsRepository(context);
        }
        #endregion

        #region Constructors
        private OrderItemsRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}
