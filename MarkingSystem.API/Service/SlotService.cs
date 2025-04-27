using AutoMapper;
using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Models.Entity;
using MarkingSystem.API.Service.IService;
using MarkingSystem.API.Utilities;
using Microsoft.EntityFrameworkCore;

namespace MarkingSystem.API.Service
{
    public class SlotService : ISlotService
    {
        private readonly ApplicationDbContext _db;
        private IMapper _mapper;
        private readonly UserContextHelper _userContextHelper;

        public SlotService(ApplicationDbContext db, IMapper mapper, UserContextHelper userContextHelper)
        {
            _db = db;
            _mapper = mapper;
            _userContextHelper = userContextHelper;
        }

        public async Task<List<TimeSlotDto>> GetAllSlotsAsync()
        {
            var slots = await _db.TimeSlots.Include(ts => ts.Bookings).ThenInclude(b => b.Student).ToListAsync();
            return _mapper.Map<List<TimeSlotDto>>(slots);
        }

        public async Task<TimeSlotDto> GetSlotByIdAsync(int id)
        {
            var slot = await _db.TimeSlots.Include(ts => ts.Bookings).ThenInclude(b => b.Student).FirstOrDefaultAsync(s => s.TimeSlotId == id);
            return _mapper.Map<TimeSlotDto>(slot);
        }

        public async Task<TimeSlotDto> CreateSlotAsync(TimeSlotDto slotDto)
        {
            var slot = _mapper.Map<TimeSlot>(slotDto);
            _db.TimeSlots.Add(slot);
            await _db.SaveChangesAsync();
            return _mapper.Map<TimeSlotDto>(slot);
        }

        public async Task<TimeSlotDto> UpdateSlotAsync(int id, TimeSlotDto updatedSlot)
        {
            var existing = await _db.TimeSlots.FindAsync(id);
            if (existing == null) return null;

            _mapper.Map(updatedSlot, existing);
            await _db.SaveChangesAsync();
            return _mapper.Map<TimeSlotDto>(existing);
        }

        public async Task<bool> DeleteSlotAsync(int id)
        {
            var slot = await _db.TimeSlots.FindAsync(id);
            if (slot == null) return false;

            _db.TimeSlots.Remove(slot);
            await _db.SaveChangesAsync();
            return true;
        }

        public async Task<BookingDto> BookSlotAsync(int slotId, string studentId)
        {
            var slot = await _db.TimeSlots.Include(s => s.Bookings).FirstOrDefaultAsync(s => s.TimeSlotId == slotId);
            if (slot == null || slot.IsClosed)
                throw new Exception("Slot not found or already closed.");

            if (slot.Bookings.Count >= slot.MaxStudents)
                throw new Exception("Slot is full.");

            var alreadyBooked = await _db.Bookings.AnyAsync(b => b.SlotId == slotId && b.StudentId == studentId);
            if (alreadyBooked)
                throw new Exception("You have already booked this slot.");

            var booking = new Booking { SlotId = slotId, StudentId = studentId };
            _db.Bookings.Add(booking);
            await _db.SaveChangesAsync();
            //return "Booking successful.";

            await _db.Entry(booking).Reference(b => b.Student).LoadAsync();
            await _db.Entry(booking).Reference(b => b.Slot).LoadAsync();

            return _mapper.Map<BookingDto>(booking);
        }

        public async Task<List<TimeSlotDto>> GetTeacherViewAsync()
        {
            var slots = await _db.TimeSlots.Include(ts => ts.Bookings).ThenInclude(b => b.Student).ToListAsync();
            return _mapper.Map<List<TimeSlotDto>>(slots);
        }

        public async Task<List<TimeSlotDto>> GetStudentSlotsAsync(string studentId)
        {
            var slots = await _db.TimeSlots
            .Include(ts => ts.Bookings)
            .Where(ts => ts.Bookings.Any(b => b.StudentId == studentId))
            .Include(ts => ts.Bookings).ThenInclude(b => b.Student)
            .ToListAsync();
            return _mapper.Map<List<TimeSlotDto>>(slots);
        }


        //public async Task<BookingDto> CreateSlotAndBookAsync(TimeSlotDto slotDto, string studentId)
        //{
        //    int loginUserId = await _userContextHelper.GetCurrentUserIdAsync();
        //    // Get the date component from StartTime
        //    var slotDate = slotDto.StartTime.Date;

        //    // Check if a slot exists for the same date
        //    var slot = await _db.TimeSlots
        //                        .Include(s => s.Bookings)
        //                        .FirstOrDefaultAsync(s => s.StartTime.Date == slotDate);

        //    // If slot doesn't exist for that date, create new one
        //    if (slot == null)
        //    {
        //        slot = _mapper.Map<TimeSlot>(slotDto);
        //        slot.CreatedBy = loginUserId;
        //        slot.CreatedDate = slotDate;
        //        slot.MaxStudents = 2;
        //        _db.TimeSlots.Add(slot);
        //        await _db.SaveChangesAsync();

        //        // Reload to include bookings
        //        slot = await _db.TimeSlots
        //                        .Include(s => s.Bookings)
        //                        .FirstOrDefaultAsync(s => s.TimeSlotId == slot.TimeSlotId);
        //    }

        //    // Slot found or created — check if closed
        //    if (slot.IsClosed)
        //        throw new Exception("Slot is closed.");

        //    // Check if full
        //    if (slot.Bookings.Count >= slot.MaxStudents)
        //        throw new Exception("Slot is full.");

        //    // Check if student already booked
        //    var alreadyBooked = await _db.Bookings
        //        .AnyAsync(b => b.SlotId == slot.TimeSlotId && b.StudentId == studentId);
        //    if (alreadyBooked)
        //        throw new Exception("You have already booked this slot.");

        //    // Booking Process
        //    var booking = new Booking
        //    {
        //        SlotId = slot.TimeSlotId,
        //        StudentId = studentId,
        //        CreatedBy = loginUserId,
        //        CreatedDate = slotDate,
        //    };

        //    _db.Bookings.Add(booking);
        //    await _db.SaveChangesAsync();

        //    await _db.Entry(booking).Reference(b => b.Student).LoadAsync();
        //    await _db.Entry(booking).Reference(b => b.Slot).LoadAsync();

        //    return _mapper.Map<BookingDto>(booking);
        //}



        public async Task<object> CreateSlotAndBookAsync(TimeSlotDto slotDto)
        {
            int loginUserId = await _userContextHelper.GetCurrentUserIdAsync();
            var slotDate = slotDto.StartTime.Date;

            // Check if slot already exists for this date (date-only check)
            var slot = await _db.TimeSlots
                .Include(s => s.Bookings)
                .ThenInclude(b => b.Student)
                .FirstOrDefaultAsync(s => s.StartTime.Date == slotDate);

            if (slot == null)
            {
                // Create new slot
                slot = _mapper.Map<TimeSlot>(slotDto);
                slot.CreatedDate = DateTime.Now;
                slot.CreatedBy = loginUserId; // Or login user
                slot.MaxStudents = 2;
                _db.TimeSlots.Add(slot);
                await _db.SaveChangesAsync();

                // Reload to include Bookings navigation
                _db.Entry(slot).Collection(s => s.Bookings).Load();
            }

            // Slot exists or just created – check if full
            if (slot.IsClosed || slot.Bookings.Count >= slot.MaxStudents)
            {
                var studentList = slot.Bookings
                    .Select(b => new { b.StudentId, b.Student.UserName })
                    .ToList();

                return new
                {
                    Success = false,
                    Message = "Slot is full.",
                    BookedStudents = studentList
                };
            }

            // Already booked?
            //bool alreadyBooked = slot.Bookings.Any(b => b.StudentId == studentId);
            bool alreadyBooked = slot.Bookings.Any(b => b.StudentId == slotDto.Bookings?.FirstOrDefault()?.StudentId);
            if (alreadyBooked)
            {
                return new
                {
                    Success = false,
                    Message = "You have already booked this slot.",
                    BookedStudents = slot.Bookings.Select(b => new { b.StudentId, b.Student.UserName })
                };
            }

            // Add booking (common for both newly created and existing slot)
            var booking = new Booking
            {
                SlotId = slot.TimeSlotId,
                //StudentId = studentId,
                StudentId = slotDto.Bookings?.FirstOrDefault()?.StudentId,
                CreatedBy = loginUserId,
                CreatedDate = DateTime.Now
            };
            _db.Bookings.Add(booking);
            await _db.SaveChangesAsync();

            await _db.Entry(booking).Reference(b => b.Student).LoadAsync();

            return new
            {
                Success = true,
                Message = slotDto.TimeSlotId == 0 ? "Slot created and booked." : "Booking successful.",
                Booking = _mapper.Map<BookingDto>(booking),
                BookedStudents = slot.Bookings
                    .Select(b => new { b.StudentId, b.Student.UserName })
                    .Append(new { booking.StudentId, booking.Student.UserName }) // Include current booking
                    .Distinct()
                    .ToList()
            };
        }



        //public async Task<object> CreateSlotAndBookAsync(TimeSlotDto slotDto, string studentId)
        //{
        //    int loginUserId = await _userContextHelper.GetCurrentUserIdAsync();
        //    var slotDate = slotDto.StartTime.Date;

        //    // Check if slot already exists for this date (date-only check)
        //    var slot = await _db.TimeSlots
        //        .Include(s => s.Bookings)
        //        .ThenInclude(b => b.Student)
        //        .FirstOrDefaultAsync(s => s.StartTime.Date == slotDate);

        //    if (slot == null)
        //    {
        //        // Create new slot
        //        slot = _mapper.Map<TimeSlot>(slotDto);
        //        slot.CreatedDate = DateTime.Now;
        //        slot.CreatedBy = loginUserId; // Or login user
        //        slot.MaxStudents = 2;
        //        _db.TimeSlots.Add(slot);
        //        await _db.SaveChangesAsync();

        //        // Reload to include Bookings navigation
        //        _db.Entry(slot).Collection(s => s.Bookings).Load();
        //    }

        //    // Slot exists or just created – check if full
        //    if (slot.IsClosed || slot.Bookings.Count >= slot.MaxStudents)
        //    {
        //        var studentList = slot.Bookings
        //            .Select(b => new { b.StudentId, b.Student.UserName })
        //            .ToList();

        //        return new
        //        {
        //            Success = false,
        //            Message = "Slot is full.",
        //            BookedStudents = studentList
        //        };
        //    }

        //    // Already booked?
        //    //bool alreadyBooked = slot.Bookings.Any(b => b.StudentId == studentId);
       
        //    if (alreadyBooked)
        //    {
        //        return new
        //        {
        //            Success = false,
        //            Message = "You have already booked this slot.",
        //            BookedStudents = slot.Bookings.Select(b => new { b.StudentId, b.Student.UserName })
        //        };
        //    }

        //    // Add booking (common for both newly created and existing slot)
        //    var booking = new Booking
        //    {
        //        SlotId = slot.TimeSlotId,
        //        StudentId = studentId,
       
        //        CreatedBy = loginUserId,
        //        CreatedDate = DateTime.Now
        //    };
        //    _db.Bookings.Add(booking);
        //    await _db.SaveChangesAsync();

        //    await _db.Entry(booking).Reference(b => b.Student).LoadAsync();

        //    return new
        //    {
        //        Success = true,
        //        Message = slotDto.TimeSlotId == 0 ? "Slot created and booked." : "Booking successful.",
        //        Booking = _mapper.Map<BookingDto>(booking),
        //        BookedStudents = slot.Bookings
        //            .Select(b => new { b.StudentId, b.Student.UserName })
        //            .Append(new { booking.StudentId, booking.Student.UserName }) // Include current booking
        //            .Distinct()
        //            .ToList()
        //    };
        //}


    }
}
