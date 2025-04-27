using AutoMapper;
using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Entity;
using MarkingSystem.API.Service.IService;
using MarkingSystem.API.Utilities;
using Microsoft.EntityFrameworkCore;

namespace MarkingSystem.API.Service
{
    public class GenericService<TDto, TEntity> : IGenericService<TDto>
        where TDto : class
        where TEntity : Common
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;
        private readonly DbSet<TEntity> _dbSet;
        private readonly UserContextHelper _userContextHelper;

        public GenericService(ApplicationDbContext db, IMapper mapper, UserContextHelper userContextHelper)
        {
            _db = db;
            _mapper = mapper;
            _userContextHelper = userContextHelper;
            _dbSet = _db.Set<TEntity>();
        }

        public async Task<IEnumerable<TDto>> GetAllAsync()
        {
            //var entities = await _dbSet.ToListAsync();
            var entities = await _dbSet.Where(e => e.DeletedDate == null).ToListAsync();
            return _mapper.Map<List<TDto>>(entities);
        }

        public async Task<TDto> GetByIdAsync(int id)
        {
            //var entity = await _dbSet.FindAsync(id);
            //return _mapper.Map<TDto>(entity);

            // Determine the primary key name dynamically (e.g., "RubricId" for Rubric entity)
            string keyName = typeof(TEntity).Name + "Id";
            var entity = await _dbSet.FirstOrDefaultAsync(e => 
            EF.Property<int>(e, keyName) == id && e.DeletedDate == null);
        //    var entity = await _dbSet.FirstOrDefaultAsync(e =>
        //EF.Property<int>(e, keyName) == id && EF.Property<DateTime?>(e, "DeletedDate") == null);
            return entity == null ? null : _mapper.Map<TDto>(entity);
        }
        
        public async Task<TDto> CreateAsync(TDto dto)
        {
            var entity = _mapper.Map<TEntity>(dto);
            try
            {
                entity.CreatedBy = await _userContextHelper.GetCurrentUserIdAsync();
                entity.CreatedDate = DateTime.Now;
                _dbSet.Add(entity);
                await _db.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                ex.ToString();
            }
            return _mapper.Map<TDto>(entity);
        }

        public async Task<TDto> UpdateAsync(TDto dto)
        {
            // Determine the primary key based on DTO name
            string keyName = typeof(TDto).Name.Replace("Dto", "") + "Id";
            // Get the primary key property dynamically
            var keyProperty = typeof(TDto).GetProperty(keyName);
            //    var keyProperty = typeof(TDto).GetProperties()
            //.FirstOrDefault(p => p.GetCustomAttributes(typeof(System.ComponentModel.DataAnnotations.KeyAttribute), true).Length > 0);
            if (keyProperty == null)
            {
                throw new Exception("Primary key not found in entity");
            }
            var keyValue = keyProperty.GetValue(dto);
            if (keyValue == null)
            {
                throw new Exception("Primary key value is missing in DTO");
            }
            // Find the existing entity by primary key
            var existingEntity = await _dbSet.FindAsync(keyValue);
            if (existingEntity == null)
            {
                throw new Exception("Entity not found");
            }
            // Map updated fields (excluding the primary key)
            _mapper.Map(dto, existingEntity);
            //existingEntity.GetType().GetProperty("UpdatedBy")?.SetValue(existingEntity, await _userContextHelper.GetCurrentUserIdAsync());
            //existingEntity.GetType().GetProperty("UpdatedDate")?.SetValue(existingEntity, DateTime.Now);
            existingEntity.UpdatedBy = await _userContextHelper.GetCurrentUserIdAsync();
            existingEntity.UpdatedDate = DateTime.Now;
            await _db.SaveChangesAsync();
            return _mapper.Map<TDto>(existingEntity);

            //var entityId = _mapper.Map<TEntity>(dto).Id;
            //var existingEntity = await _dbSet.FindAsync(entityId);
            //if (existingEntity == null)
            //{
            //    throw new Exception("Entity not found");
            //}
            //_mapper.Map(dto, existingEntity);
            //existingEntity.UpdatedBy = await _userContextHelper.GetCurrentUserIdAsync();
            //existingEntity.UpdatedDate = DateTime.Now;
            //await _db.SaveChangesAsync();
            //return _mapper.Map<TDto>(existingEntity);

            //var entity = _mapper.Map<TEntity>(dto);
            //entity.UpdatedBy = await _userContextHelper.GetCurrentUserIdAsync();
            //entity.UpdatedDate = DateTime.Now;
            //_dbSet.Update(entity);
            //await _db.SaveChangesAsync();
            //return _mapper.Map<TDto>(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            //var entity = await _dbSet.FindAsync(id);
            //if (entity == null) return false;
            //_dbSet.Remove(entity);
            //await _db.SaveChangesAsync();
            //return true;

            string keyName = typeof(TEntity).Name + "Id";
            var entity = await _dbSet.FirstOrDefaultAsync(e => 
            EF.Property<int>(e, keyName) == id && e.DeletedDate == null);
            if (entity == null) return false;
            entity.DeletedBy = await _userContextHelper.GetCurrentUserIdAsync();
            entity.DeletedDate = DateTime.Now;
            _dbSet.Update(entity);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
