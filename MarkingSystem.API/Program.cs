using MarkingSystem.API.DataBaseContext;
using MarkingSystem.API.Models.Entity;
using MarkingSystem.API.Service.IService;
using MarkingSystem.API.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using MarkingSystem.API.Models;
using AutoMapper;
using MarkingSystem.API.MapperConfig;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MarkingSystem.API.Utilities;
using MarkingSystem.API.Models.Dto;
using Microsoft.Extensions.Options;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DatabaseConnection")));

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("ApiSettings:JwtOptions"));


// Configure Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();


//// JWT Authentication
//var jwtOptions = builder.Configuration.GetSection("ApiSettings:JwtOptions").Get<JwtOptions>();
//var key = Encoding.UTF8.GetBytes(jwtOptions.Secret);
//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuerSigningKey = true,
//            IssuerSigningKey = new SymmetricSecurityKey(key),
//            ValidateIssuer = false,
//            ValidateAudience = false
//        };
//    });
//builder.Services.AddAuthorization();

// Configure JWT Authentication
var jwtOptions = builder.Configuration.GetSection("ApiSettings:JwtOptions").Get<JwtOptions>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.Secret)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = jwtOptions.Issuer,
        ValidAudience = jwtOptions.Audience,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});
builder.Services.AddAuthorization();

builder.Services.AddControllers();


// Register AutoMapper
IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
builder.Services.AddSingleton(mapper);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


// Register Services
builder.Services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
builder.Services.AddScoped<IAuthService, AuthService>();
//builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IUtilityService, UtilityService>();

builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<UserContextHelper>();

builder.Services.AddScoped<IGenericService<CourseDto>, GenericService<CourseDto, Course>>();
builder.Services.AddScoped<IGenericService<RubricDto>, GenericService<RubricDto, Rubric>>();
builder.Services.AddScoped<IGenericService<RubricCriteriaDto>, GenericService<RubricCriteriaDto, RubricCriteria>>();
builder.Services.AddScoped<IListService, ListService>();
builder.Services.AddScoped<IGenericService<TimeSlotDto>, GenericService<TimeSlotDto, TimeSlot>>();
builder.Services.AddScoped<IGenericService<BookingDto>, GenericService<BookingDto, Booking>>();

builder.Services.AddSingleton<CsvHelper.CsvReader>(sp =>
    new CsvHelper.CsvReader(new StringReader(string.Empty), new CsvHelper.Configuration.CsvConfiguration(CultureInfo.InvariantCulture)));

// Add other necessary services, such as file management
builder.Services.AddScoped<IRubricManagementService, RubricManagementService>();
builder.Services.AddScoped<ISlotService, SlotService>();
builder.Services.AddScoped<IStudentMarkingService, StudentMarkingService>();



//Cors
builder.Services.AddCors(options =>
{

    options.AddDefaultPolicy(
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

// Configure Swagger
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerGen(option =>
{
    // Enable Swagger annotations
    option.EnableAnnotations();

    //option.AddSecurityDefinition(name: JwtBearerDefaults.AuthenticationScheme, securityScheme: new OpenApiSecurityScheme
    // Swagger security definition for Bearer token
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter the Bearer Authorization string as following: `Bearer Generated-JWT-Token`",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    // Security requirement for all operations
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference= new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    //Id=JwtBearerDefaults.AuthenticationScheme
                    Id = "Bearer"
                }
            }, new string[]{}
        }
    });
    // Swagger Document Info (OpenAPI 3.0)
    option.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Marking System API",
        Version = "1.0",
        Description = "API documentation for the Marking System"
    });
    //end
});
builder.Services.AddAuthorization();

var app = builder.Build();


// Configure middleware
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    //app.UseSwaggerUI();
    app.UseSwaggerUI(c =>
    {
        if (!app.Environment.IsDevelopment())
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Marking System API");
            c.RoutePrefix = string.Empty;
        }
    });
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseCors();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
