using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;


namespace Core.Repository
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        Task<T> Get(Expression<Func<T,bool>> predicate);
        Task<T> GetId(Guid id);

        IQueryable<T> Where(Expression<Func<T,bool>> predicate);

        Task Add(T entity);

        void Update(T entity);

        void Delete(T entity);
        void Delete(IReadOnlyList<T> entities);
    }
}
