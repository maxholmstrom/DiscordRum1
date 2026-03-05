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
    new("danne", "hej"),
    new("lennart", "och hå"),
    new("xX_Gandalf_Xx", "YOU SHALL NOT POST!"),
    new("birgitta69", "är nån vaken?")
};

// Get för meddelanden
app.MapGet("/api/messages", () => messages);

// Post för meddelanden
app.MapPost("/api/messages", async (MessageDto msg) =>
{
    if (string.IsNullOrWhiteSpace(msg.Message))
        return Results.BadRequest(new { error = "message får inte vara tom." });

    var user = string.IsNullOrWhiteSpace(msg.User) ? "Anonymous" : msg.User.Trim();
    var message = msg.Message.TrimEnd();

    var saved = new MessageDto(user, message);
    messages.Add(saved);

    return Results.Ok(saved);
});

app.Run("http://localhost:3000");
