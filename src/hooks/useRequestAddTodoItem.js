import { useState } from 'react';

export const useRequestAddTodoItem = (setTodosList, todoItemInputValue, setTodoItemInputValue) => {
	const [isCreating, setIsCreating] = useState(false);

	const addTodoItem = () => {
		setIsCreating(true);
		fetch('http://localhost:3003/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todoItemInputValue,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then((newItem) => {
				console.log('Добавление', newItem);
				setTodosList((prevItem) => [...prevItem, newItem]);
				setTodoItemInputValue('');
			})
			.finally(() => setIsCreating(false));
	};

	return {
		addTodoItem,
		isCreating,
	};
};
