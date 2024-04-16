using System.IO;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

using Core.Entities.Purchases;
using System.Reflection;


namespace Core
{
    public sealed class ApplicationContext : DbContext
    {
        #region Constants
        const string FileName = "appsettings.json";
        const string ConnectionString = "DefaultConnection";
        #endregion

        #region Properties
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;
        public DbSet<Provider> Providers { get; set; } = null!;
        #endregion

        #region Overriding
        protected override void OnConfiguring(DbContextOptionsBuilder builder)
        {
            var config = new ConfigurationBuilder().AddJsonFile(ApplicationContext.FileName).SetBasePath(Directory.GetCurrentDirectory()).Build();

            builder.UseNpgsql(config.GetConnectionString(ApplicationContext.ConnectionString));

            base.OnConfiguring(builder);
        }
        #endregion
    }
}
