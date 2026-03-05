var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    // Look for static files in webroot
    WebRootPath = "public"
});

var app = builder.Build();
app.UseFileServer();

app.MapGet("/api/test", () => new { message = "test" });

//app.MapGet("/index.html", () => "Hello World!");
app.Run("http://localhost:3000");
