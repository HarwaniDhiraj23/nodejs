import Todo from "../models/Todo";

export const findTodoById = async (id: number) => {
    return await Todo.findAll({ where: { userId: id } });
};

export const addNewTodo = async (data: { title: string, description: string, userId: number }) => {
    return await Todo.create(data);
}

export const editTodo = async (id: number, data: { title: string, description: string }) => {
    await Todo.update(data, { where: { id }, returning: true })
    return await Todo.findOne({ where: { id } })
}

export const deleteTodo = async (id: number) => {
    const deletedCount = await Todo.destroy({
        where: { id },
    });
    return deletedCount
}

export const completeTodo = async (id: number) => {
    await Todo.update({ completed: true }, { where: { id }, returning: true })
    return await Todo.findOne({ where: { id } })
}