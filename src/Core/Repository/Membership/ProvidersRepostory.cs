using Core.Entities.Purchases;


namespace Core.Repository
{
    internal class ProvidersRepository : Repository<Provider>, IProvidersRepository
    {
        #region Static
        public static ProvidersRepository New(ApplicationContext context)
        {
            return new ProvidersRepository(context);
        }
        #endregion

        #region Constructors
        private ProvidersRepository(ApplicationContext context) : base(context)
        {
        }
        #endregion
    }
}
