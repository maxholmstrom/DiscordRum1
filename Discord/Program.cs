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
    new("danne", "hej", 100600660),
    new("lennart", "och hå", 1296867189),
    new("xX_Gandalf_Xx", "YOU SHALL NOT POST!", 192837198),
    new("birgitta69", "är nån vaken?", 19283795810)
};

// Get för meddelanden
app.MapGet("/api/messages", () => new { messages });

// Post för meddelanden
app.MapPost("/api/messages", async (MessageDto msg) =>
{
    Console.WriteLine($"msg post: {msg.User} {msg.Time}: {msg.Message}");
    messages.Add(msg);
    if (string.IsNullOrWhiteSpace(msg.Message))
        return Results.BadRequest(new { error = "message får inte vara tom." });

    var user = string.IsNullOrWhiteSpace(msg.User) ? "Anonymous" : msg.User.Trim();
    var message = msg.Message.TrimEnd();

    var saved = new MessageDto(user, message);
    messages.Add(saved);

    return Results.Ok(saved);
});

app.Run("http://localhost:3000");
