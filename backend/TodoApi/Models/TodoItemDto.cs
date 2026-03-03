namespace TodoApi.Models;

public class CreateTodoRequest
{
    public string Name { get; set; } = string.Empty;
    public DateTime? Deadline { get; set; }
}

public class TodoResponse
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTime? Deadline { get; set; }
    public bool IsDone { get; set; }
    public DateTime CreatedAt { get; set; }

    public static TodoResponse FromEntity(TodoItem item) => new()
    {
        Id = item.Id,
        Name = item.Name,
        Deadline = item.Deadline,
        IsDone = item.IsDone,
        CreatedAt = item.CreatedAt
    };
}
