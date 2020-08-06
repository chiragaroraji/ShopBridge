
namespace ShopBridgeApi.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using ShopBridge.Services.Interfaces;
    using ShopBridge.Models;
    [Route("api/[controller]")]
    [ApiController]
    public class ShopBridgeItemsController : ControllerBase
    {
        private readonly IShopBridgeItemService shopBridgeItemService;
        public ShopBridgeItemsController(IShopBridgeItemService shopBridgeItemService)
        {
            this.shopBridgeItemService = shopBridgeItemService;
        }
        // GET: api/ShopBridgeItems
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/ShopBridgeItems/5
        [HttpGet("{id}", Name = "Get")]
        public List<ShopBridgeItemModel> Get(int id)
        {
            return this.shopBridgeItemService.GetShopBridgeItems().Result;
        }

        // POST: api/ShopBridgeItems
        [HttpPost]
        public void Post([FromBody] string value)

        {
        }

        // PUT: api/ShopBridgeItems/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
