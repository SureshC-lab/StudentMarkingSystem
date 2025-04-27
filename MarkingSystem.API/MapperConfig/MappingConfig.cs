using AutoMapper;
using MarkingSystem.API.Models.Dto;
using MarkingSystem.API.Models.Entity;
using Microsoft.AspNetCore.Identity;

namespace MarkingSystem.API.MapperConfig
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                config.CreateMap<CourseDto, Course>().ReverseMap();

                //config.CreateMap<Rubric, RubricDto>().ReverseMap();
                config.CreateMap<Rubric, RubricDto>()
                .ForMember(dest => dest.CourseName, opt => opt.MapFrom(src => src.Course.CourseName))
                .ReverseMap()
                .ForMember(dest => dest.Course, opt => opt.Ignore());

                //config.CreateMap<RubricCriteria, RubricCriteriaDto>().ReverseMap();
                config.CreateMap<RubricCriteria, RubricCriteriaDto>()
                .ForMember(dest => dest.RubricName, opt => opt.MapFrom(src => src.Rubric.RubricName))
                .ReverseMap()
                .ForMember(dest => dest.Rubric, opt => opt.Ignore());

                //config.CreateMap<TimeSlot, TimeSlotDto>().ReverseMap()
                config.CreateMap<TimeSlot, TimeSlotDto>()
                .ReverseMap()
                .ForMember(dest => dest.Bookings, opt => opt.Ignore());

                //config.CreateMap<Booking, BookingDto>().ReverseMap();
                config.CreateMap<Booking, BookingDto>()
                .ForMember(dest => dest.StartTime, opt => opt.MapFrom(src => src.Slot.StartTime))
                .ForMember(dest => dest.EndTime, opt => opt.MapFrom(src => src.Slot.EndTime))
                .ForMember(dest => dest.StudentName, opt => opt.MapFrom(src => src.Student.FullName))
                .ReverseMap()
                .ForMember(dest => dest.Slot, opt => opt.Ignore())
                .ForMember(dest => dest.Student, opt => opt.Ignore());

                config.CreateMap<PeerAssignment, PeerAssignmentDto>().ReverseMap();
                config.CreateMap<PeerMark, PeerMarkDto>().ReverseMap();
                config.CreateMap<TeacherMark, TeacherMarkDto>().ReverseMap();
                config.CreateMap<FinalMark, FinalMarkDto>().ReverseMap();
                config.CreateMap<Notification, NotificationDto>().ReverseMap();

                config.CreateMap<Rubric, RubricManagementDto>().ReverseMap();
                config.CreateMap<RubricCriteria, RubricCriteriaManagementDto>().ReverseMap();
            });
            return mappingConfig;
        }
    }
}
