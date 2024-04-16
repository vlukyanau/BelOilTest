using System;
using Core.Entities.Purchases;


namespace Logic.Models.Purchases
{
    public sealed class ProviderInfo : IProviderInfo
    {
        #region Static
        public static ProviderInfo New(IProvider provider)
        {
            ProviderInfo info = new ProviderInfo();
            info.Id = provider.Id;
            info.Name = provider.Name;

            return info;
        }
        #endregion

        #region Properties
        public Guid? Id { get; set; }
        public string Name { get; set; }
        #endregion
    }
}
