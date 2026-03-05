using Discord;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    // mappen för statiska filer (index.html, osv...)
    WebRootPath = "public"
});

var app = builder.Build();
app.UseFileServer(); // använd statiska filer

var messages = new List<MessageDto>(){
    new MessageDto("danne", "hej")
};

// Get för meddelanden
app.MapGet("/api/messages", () => new { messages });

// Post för meddelanden
app.MapPost("/api/messages", async (MessageDto msg) =>
{
    Console.WriteLine($"msg post: {msg.User}: {msg.Message}");
    messages.Add(msg);
});

app.Run("http://localhost:3000");
