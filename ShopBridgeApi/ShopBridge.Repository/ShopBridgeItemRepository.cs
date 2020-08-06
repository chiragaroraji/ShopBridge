using System;
using System.Collections.Generic;
using System.Text;
using Dapper;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using ShopBridge.Repository.Interfaces;
using ShopBridge.Models;
namespace ShopBridge.Repository
{
    public class ShopBridgeItemRepository:IShopBridgeItemRepository
    {
        private string sqlConnectionString = @"Server=34.93.78.161;Database=ShopBridge;User Id=sqlserver;Password=tsm9Hug0JwbaPP3H";
        public async Task<List<ShopBridgeItemModel>> GetShopBridgeItems()
        {
            var parameter = new DynamicParameters();
            parameter.Add("Id", 0);
            using(var connection=new SqlConnection(sqlConnectionString))
            {
                connection.Open();
                var ShopBridgeItems = (await connection.QueryAsync<ShopBridgeItemModel>("usp_getInventoryDetails",parameter, commandType: CommandType.StoredProcedure)).AsList();
                return ShopBridgeItems;
            }
        }
    }
}
