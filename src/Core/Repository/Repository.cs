using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;


namespace Core.Repository
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        #region Constructors
        protected Repository(ApplicationContext context)
        {
            this.context = context;
        }
        #endregion

        #region Fields
        protected readonly ApplicationContext context;
        #endregion

        #region Methods
        public IQueryable<T> GetAll()
        {
            return this.context.Set<T>();
        }
        public async Task<T> Get(Expression<Func<T, bool>> predicate)
        {
            return await this.context.Set<T>().FirstOrDefaultAsync(predicate);
        }
        public async Task<T> GetId(Guid id)
        {
            return await this.context.Set<T>().FindAsync(id);
        }

        public IQueryable<T> Where(Expression<Func<T, bool>> predicate)
        {
            return this.context.Set<T>().Where(predicate);
        }

        public async Task Add(T entity)
        {
            await this.context.Set<T>().AddAsync(entity);
        }

        public void Update(T entity)
        {
            this.context.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            this.context.Set<T>().Remove(entity);
        }
        public void Delete(IReadOnlyList<T> entities)
        {
            this.context.Set<T>().RemoveRange(entities);
        }
        #endregion
    }
}
