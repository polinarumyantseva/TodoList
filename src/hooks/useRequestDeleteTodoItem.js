import { useState } from 'react';

export const useRequestDeleteTodoItem = (setTodosList) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteTodoItem = (id) => {
		setIsDeleting(true);
		fetch(`http://localhost:3003/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Удаление', response);
				setTodosList((prevItems) => prevItems.filter((item) => item.id !== id));
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		deleteTodoItem,
		isDeleting,
	};
};
