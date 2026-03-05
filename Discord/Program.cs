using Discord;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
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
    Console.WriteLine($"msg post: {msg.User}: {msg.Message}");
    messages.Add(msg);
});

app.Run();
