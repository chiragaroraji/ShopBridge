using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ShopBridge.Models;
namespace ShopBridge.Services.Interfaces
{
    public interface IShopBridgeItemService
    {
        Task<List<ShopBridgeItemModel>> GetShopBridgeItems();

    }
}
