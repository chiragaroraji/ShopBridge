using System;
using System.Collections.Generic;
using System.Text;
using ShopBridge.Services.Interfaces;
using ShopBridge.Models;
using ShopBridge.Repository.Interfaces;
using System.Threading.Tasks;

namespace ShopBridge.Services
{
    public class ShopBridgeItemService:IShopBridgeItemService
    {
        private IShopBridgeItemRepository shopBridgeItemRepository;

        public ShopBridgeItemService(IShopBridgeItemRepository shopBridgeItemRepository)
        {
            this.shopBridgeItemRepository = shopBridgeItemRepository;
        }
        public async Task<List<ShopBridgeItemModel>> GetShopBridgeItems()
        {
            return await shopBridgeItemRepository.GetShopBridgeItems();
        }
    }
}
