namespace ShopBridgeApi
{
    using System.Net;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.OpenApi.Models;
    using Newtonsoft.Json.Serialization;
    using NLog;
    using Web.GlobalErrorHandling.Extensions;

    public class Startup
    {
        private readonly ILogger logger;

        public Startup(IConfiguration configuration, IHostEnvironment environment)
        {
            // Initializing logger manually as not able to inject it using DI, will need to refactor in future
            logger = LogManager.GetCurrentClassLogger();
            var builder = new ConfigurationBuilder()
                .SetBasePath(environment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{environment.EnvironmentName}.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();
            configuration = builder.Build();
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddCors();

            // Add the Pascal Notation formatting
            services.AddControllers().AddNewtonsoftJson(
            options =>
            {
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
            });

            //services.ConfigureAll();

            // Add the Swagger Definition to the project
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "ShopBridge API",
                    Version = "v1",
                });
            });

            // End of the Swagger Definition to the project
            services.RegisterServices();
            services.AddDirectoryBrowser();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // Setup global exception handler middleware
            app.UseExceptionHandler(config =>
            {
                config.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var exception = context.Features.Get<IExceptionHandlerFeature>();

                    if (exception != null)
                    {
                        logger.Error($"{exception.Error.Message}\nStackTrace:\n{exception.Error.StackTrace}");

                        var err = new
                        {
                            context.Response.StatusCode,
                            exception.Error.Message,
                            exception.Error.StackTrace,
                        };

                        await context.Response.WriteAsync(Newtonsoft.Json.JsonConvert.SerializeObject(err)).ConfigureAwait(false);
                    }
                });
            });

            // Add the Swagger Definition to the project
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ShopBridge API");
            });

            // End of the Swagger Definition to the project
            app.UseRouting();
            app.UseCors(x => x.AllowAnyOrigin()
                              .AllowAnyMethod()
                              .AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}