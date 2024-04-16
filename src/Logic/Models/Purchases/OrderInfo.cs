using System;
using Core.Entities.Purchases;


namespace Logic.Models.Purchases
{
    public sealed class OrderInfo : IOrderInfo
    {
        #region Static
        public static OrderInfo New(IOrder order, IProvider provider)
        {
            OrderInfo info = new OrderInfo();
            info.Id = order.Id;
            info.Number = order.Number;
            info.Date = order.Date;
            info.ProviderInfo = ProviderInfo.New(provider);

            return info;
        }
        #endregion

        #region Properties
        public Guid? Id { get; set; }
        public string Number { get; set; }
        public DateTime Date { get; set; }
        public ProviderInfo ProviderInfo { get; set; }
        #endregion
    }
}
