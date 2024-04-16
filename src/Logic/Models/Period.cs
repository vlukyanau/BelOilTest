using System;


namespace Logic.Models
{
    public sealed class Period
    {
        #region Operators
        public static implicit operator Period((DateTime? From, DateTime? Till) period)
        {
            return new Period(period.From, period.Till);
        }
        #endregion

        #region Constructors
        private Period()
        {
        }

        public Period(DateTime? from, DateTime? till)
        {
            this.From = from;
            this.Till = till;
        }
        #endregion

        #region Properties
        public DateTime? From { get; }
        public DateTime? Till { get; }
        #endregion

        #region Methods
        public bool Contains(DateTime date)
        {
            return date >= this.From && date <= this.Till;
        }

        public void Deconstruct(out DateTime? from, out DateTime? till)
        {
            from = this.From;
            till = this.Till;
        }
        #endregion
    }
}
