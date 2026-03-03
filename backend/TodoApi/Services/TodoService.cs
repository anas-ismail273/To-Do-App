using TodoApi.Models;
using TodoApi.Repositories;

namespace TodoApi.Services;

public class TodoService : ITodoService
{
    private readonly ITodoRepository _repository;

    public TodoService(ITodoRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<TodoResponse>> GetAllAsync()
    {
        var items = await _repository.GetAllAsync();
        return items.Select(TodoResponse.FromEntity).ToList();
    }

    public async Task<TodoResponse> CreateAsync(CreateTodoRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) || request.Name.Length <= 10)
            throw new ArgumentException("Task name must be longer than 10 characters.");

        var item = new TodoItem
        {
            Name = request.Name,
            Deadline = request.Deadline
        };

        var created = await _repository.AddAsync(item);
        return TodoResponse.FromEntity(created);
    }

    public async Task<TodoResponse> ToggleAsync(Guid id)
    {
        var item = await _repository.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Todo not found.");

        item.IsDone = !item.IsDone;
        await _repository.UpdateAsync(item);
        return TodoResponse.FromEntity(item);
    }

    public async Task DeleteAsync(Guid id)
    {
        var item = await _repository.GetByIdAsync(id)
            ?? throw new KeyNotFoundException("Todo not found.");

        await _repository.DeleteAsync(item);
    }
}
