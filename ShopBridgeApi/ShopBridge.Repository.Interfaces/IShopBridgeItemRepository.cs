using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using ShopBridge.Models;
namespace ShopBridge.Repository.Interfaces
{
    public interface IShopBridgeItemRepository
    {
        Task<List<ShopBridgeItemModel>> GetShopBridgeItems();
    }
}
