using Discord;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    // Look for static files in webroot
    WebRootPath = "public"
});

var app = builder.Build();
app.UseFileServer();

var messages = new List<MessageDto>(){
    new MessageDto("danne", "hej")
};

app.MapGet("/api/messages", () => new { messages });

// Post för meddelanden
app.MapPost("/api/messages", async (MessageDto msg) =>
{
    messages.Add(msg);
});

//app.MapGet("/index.html", () => "Hello World!");
app.Run("http://localhost:3000");
