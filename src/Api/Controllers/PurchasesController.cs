using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Api.Results;

using Logic;
using Logic.Purchases;
using Logic.Models.Purchases;
using Logic.Models.Purchases.Filters;


namespace Api.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class PurchasesController : ControllerBase
    {
        #region Orders
        [HttpGet("api/purchases/orders")]
        public async Task<IActionResult> GetOrders()
        {
            Orders.Retrieving retrieving = Orders.Retrieving.New();

            IResult result = await retrieving.Go();

            return new OutputResult(result);
        }

        [HttpPost("api/purchases/orders/search")]
        public async Task<IActionResult> SerachOrders([FromBody] Filters filters)
        {
            Orders.Retrieving retrieving = Orders.Retrieving.New();
            retrieving.Filters = filters;

            IResult result = await retrieving.Go();

            return new OutputResult(result);
        }

        [HttpGet("api/purchases/orders/{id}")]
        public async Task<IActionResult> GetOrders(Guid id)
        {
            Orders.Retrieving retrieving = Orders.Retrieving.New();

            IResult result = await retrieving.Go(id);

            return new OutputResult(result);
        }

        [HttpPost("api/purchases/orders/")]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInfo info)
        {
            Orders.Creation creation = Orders.Creation.New();
            creation.Id = info.Id;
            creation.Number = info.Number;
            creation.Date = info.Date;
            creation.ProviderInfo = info.ProviderInfo;

            IResult result = await creation.Go();

            return new OutputResult(result);
        }

        [HttpPut("api/purchases/orders/")]
        public async Task<IActionResult> UpdateOrder([FromBody] OrderInfo info)
        {
            Orders.Updating updating = Orders.Updating.New();
            updating.Id = (Guid)info.Id;
            updating.Number = info.Number;
            updating.Date = info.Date;
            updating.ProviderInfo = info.ProviderInfo;

            IResult result = await updating.Go();

            return new OutputResult(result);
        }

        [HttpDelete("api/purchases/orders/{id:guid}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            Orders.Deleting deleting = Orders.Deleting.New();
            deleting.Id = id;

            IResult result = await deleting.Go();

            return new OutputResult(result);
        }
        #endregion

        #region OrderItems
        [HttpGet("api/purchases/orderitems")]
        public async Task<IActionResult> GetOrderItems([FromQuery] Guid orderId)
        {
            OrderItems.Retrieving retrieving = OrderItems.Retrieving.New();
            retrieving.OrderId = orderId;

            IResult result = await retrieving.Go();

            return new OutputResult(result);
        }

        [HttpGet("api/purchases/orderitems/{id}")]
        public async Task<IActionResult> GetOrderItem(Guid id)
        {
            OrderItems.Retrieving retrieving = OrderItems.Retrieving.New();

            IResult result = await retrieving.Go(id);

            return new OutputResult(result);
        }

        [HttpPost("api/purchases/orderitems/")]
        public async Task<IActionResult> CreateOrderItem([FromBody] OrderItemInfo info)
        {
            OrderItems.Creation creation = OrderItems.Creation.New();
            creation.Id = info.Id;
            creation.OrderId = info.OrderId;
            creation.Name = info.Name;
            creation.Quantity = info.Quantity;
            creation.Unit = info.Unit;

            IResult result = await creation.Go();

            return new OutputResult(result);
        }

        [HttpPut("api/purchases/orderitems/")]
        public async Task<IActionResult> UpdateOrderItem([FromBody] OrderItemInfo info)
        {
            OrderItems.Updating updating = OrderItems.Updating.New();
            updating.Id = (Guid)info.Id;
            updating.Name = info.Name;
            updating.Quantity = info.Quantity;
            updating.Unit = info.Unit;

            IResult result = await updating.Go();

            return new OutputResult(result);
        }

        [HttpDelete("api/purchases/orderitems/{id:guid}")]
        public async Task<IActionResult> DeleteOrderItem(Guid id)
        {
            OrderItems.Deleting deleting = OrderItems.Deleting.New();
            deleting.Id = id;

            IResult result = await deleting.Go();

            return new OutputResult(result);
        }
        #endregion

        #region Providers
        [HttpGet("api/purchases/providers")]
        public async Task<IActionResult> GetProviders()
        {
            Providers.Retrieving retrieving = Providers.Retrieving.New();

            IResult result = await retrieving.Go();

            return new OutputResult(result);
        }
        #endregion
    }
}
