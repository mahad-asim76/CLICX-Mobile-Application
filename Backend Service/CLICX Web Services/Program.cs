using CLICX.Web.Service.Client.Clients;
using CLICX.Web.Service.Clients.Cache;
using CLICX.Web.Service.Clients.Classes;
using CLICX.Web.Service.Clients.Common;
using CLICX.Web.Services.Attributes;
using Entities.Common.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IO;
using System.Text;
using WatchDog;
using WatchDog.src.Enums;

var builder = WebApplication.CreateBuilder(args);

var serviceCollection = new ServiceCollection();

IConfiguration configuration = new ConfigurationBuilder()
    .SetBasePath(Directory.GetParent(AppContext.BaseDirectory)?.FullName)
    .AddJsonFile("appsettings.json")
    .Build();

serviceCollection.AddSingleton(configuration);
serviceCollection.AddTransient<Configuration>();
serviceCollection.AddSingleton<CacheMemory>(sp =>
    new CacheMemory(AppConstants.CacheConstants.ConnectionString));

var serviceProvider = serviceCollection.BuildServiceProvider();
serviceProvider.GetService<Configuration>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();

builder.Services.AddWatchDogServices(opt =>
{
    opt.ClearTimeSchedule = WatchDogAutoClearScheduleEnum.Monthly;
    opt.IsAutoClear = true;
});

//builder.Services.AddControllers(x => x.Filters.Add<CustomAuthorizeAttribute>());

ServiceClient _ServiceClient = new ServiceClient();
CommonMethods methods = new CommonMethods();
DataTable data = methods.GetAllUsers();
var cache = serviceProvider.GetRequiredService<CacheMemory>();
cache.Set<DataTable>(AppConstants.CacheConstants.UniqueKey, data);

builder.Services.AddSwaggerGen();

builder.Logging.AddWatchDogLogger();

var app = builder.Build();

app.UseWatchDogExceptionLogger();

app.UseWatchDog(opt =>
{
    opt.WatchPageUsername = "Ibex";
    opt.WatchPagePassword = "Ibex";
});

app.UseSwagger();
app.UseSwaggerUI();

app.UseWhen(context => context.Request.Path.StartsWithSegments("/swagger"), appBuilder =>
{
    appBuilder.UseSwagger();
    appBuilder.UseSwaggerUI();
});

app.UseWhen(context => context.Request.Path.StartsWithSegments("/watchdog"), appBuilder =>
{
    appBuilder.UseWatchDog(opt =>
    {
        opt.WatchPageUsername = "Ibex";
        opt.WatchPagePassword = "Ibex";
    });
});

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.Run();