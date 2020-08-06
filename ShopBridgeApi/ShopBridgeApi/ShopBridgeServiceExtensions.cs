namespace Web.GlobalErrorHandling.Extensions
{
    using ShopBridge.Repository;
    using ShopBridge.Repository.Interfaces;
    using ShopBridge.Services;
    using ShopBridge.Services.Interfaces;
    using Microsoft.Extensions.DependencyInjection;

    /// <summary>
    /// Defines the <see cref="ShopBridgeServiceExtensions" />.
    /// </summary>
    public static class ShopBridgeServiceExtensions
    {
        /// <summary>
        /// The ConfigureLoggerService.
        /// </summary>
        /// <param name="services">The services<see cref="IServiceCollection"/>.</param>
        public static void RegisterServices(this IServiceCollection services)
        {
            services.AddTransient<IShopBridgeItemService, ShopBridgeItemService>();
            services.AddTransient<IShopBridgeItemRepository, ShopBridgeItemRepository>();

        }
    }
}
