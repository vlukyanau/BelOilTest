using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;


namespace Core.Entities.Purchases
{
    [Index("Name")]
    public sealed class Provider : Entity, IProvider
    {
        #region Static
        public static Provider New(string name)
        {
            Provider provider = new Provider();
            provider.Id = Guid.NewGuid();
            provider.Name = name;

            return provider;
        }
        #endregion

        #region Constructors
        private Provider()
        {
        }
        #endregion

        #region Properties
        [Required]
        public Guid Id { get; private set; }

        [Required]
        public string Name { get; set; }
        #endregion
    }
}
