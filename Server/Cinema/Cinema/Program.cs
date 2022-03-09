using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using CinemaApp.Domain.Settings;
using CinemaApp.Infrastructure.Contexts;
using CinemaApp.Infrastructure.Services;
using CinemaApp.Application.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection(JwtSettings.Position));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey =
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecurityKey"]))
    };
});

builder.Services.AddScoped(typeof(JwtService));

builder.Services.AddScoped<IMovieService, MovieService>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IGenreService, GenreService>();

builder.Services.AddScoped<ICityService, CityService>();

builder.Services.AddScoped<IFavorService, FavorService>();

builder.Services.AddScoped<ICinemaService, CinemaService>();

builder.Services.AddScoped<IHallService, HallService>();

builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddScoped<ISeatTypeService, SeatTypeService>();

builder.Services.AddScoped<IMovieSessionService, MovieSessionService>();

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(source =>
    {
        source
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    }
);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();