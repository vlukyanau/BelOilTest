using Core;
using Core.Entities.Purchases;


namespace CteateDb
{
    internal class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Press [Enter] to run...");

            ConsoleKeyInfo key = Console.ReadKey(true);
            if (key.Key != ConsoleKey.Enter)
                return;

            Console.WriteLine();

            Console.WriteLine("**************START**************");

            ApplicationContext context = new ApplicationContext();

            Console.WriteLine("DROP DATABASE START");
            await context.Database.EnsureDeletedAsync();
            Console.WriteLine("DROP DATABASE FINISH");

            Console.WriteLine("CREATE DATABASE START");
            await context.Database.EnsureCreatedAsync();
            Console.WriteLine("CREATE DATABASE FINISH");

            int count = 10;
            Console.WriteLine($"ADD {count} PROVIDERS");
            await Program.AddProviders(context, count);

            Console.WriteLine("**************FINISH**************");
        }

        static async Task AddProviders(ApplicationContext context, int count)
        {
            for (int index = 1; index <= count; index++)
            {
                Provider provider = Provider.New($"Provider {index}");

                await context.Set<Provider>().AddAsync(provider);

                await context.SaveChangesAsync();

                Console.WriteLine($"PROVIDER {provider.Name} CREATED");
            }

        }
    }
}
