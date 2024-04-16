using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

using Core;


namespace Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Builder
            WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.AddTransient<ApplicationContext>();

            builder.Services.AddAuthorization();

            // App
            WebApplication app = builder.Build();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
