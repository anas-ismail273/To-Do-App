using TodoApi.Models;

namespace TodoApi.Services;

public interface ITodoService
{
    Task<List<TodoResponse>> GetAllAsync();
    Task<TodoResponse> CreateAsync(CreateTodoRequest request);
    Task<TodoResponse> ToggleAsync(Guid id);
    Task DeleteAsync(Guid id);
}
