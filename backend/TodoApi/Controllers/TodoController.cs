using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/todos")]
public class TodoController : ControllerBase
{
    private readonly ITodoService _service;

    public TodoController(ITodoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<List<TodoResponse>>> GetAll()
    {
        var todos = await _service.GetAllAsync();
        return Ok(todos);
    }

    [HttpPost]
    public async Task<ActionResult<TodoResponse>> Create([FromBody] CreateTodoRequest request)
    {
        try
        {
            var todo = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetAll), new { id = todo.Id }, todo);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPatch("{id}/toggle")]
    public async Task<ActionResult<TodoResponse>> Toggle(Guid id)
    {
        try
        {
            var todo = await _service.ToggleAsync(id);
            return Ok(todo);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { error = ex.Message });
        }
    }
}
