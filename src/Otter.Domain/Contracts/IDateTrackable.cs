using System;

namespace Otter.Domain.Contracts
{
    public interface IDateTrackable
    {
        DateTime DateCreated { get; set; }
        DateTime LastUpdated { get; set; }
    }
}
