using MarkingSystem.API.Models.Entity;

namespace MarkingSystem.API.Service.IService
{
    public interface IGenericService<TDto> 
        where TDto : class
    {
        Task<IEnumerable<TDto>> GetAllAsync();
        Task<TDto> GetByIdAsync(int id);
        Task<TDto> CreateAsync(TDto dto);
        Task<TDto> UpdateAsync(TDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
