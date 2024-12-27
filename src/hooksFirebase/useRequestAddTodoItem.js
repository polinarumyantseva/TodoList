import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTodoItem = (todoItemInputValue, setTodoItemInputValue) => {
	const [isCreating, setIsCreating] = useState(false);

	const addTodoItem = () => {
		setIsCreating(true);
		const todoListDbRef = ref(db, 'todos');

		push(todoListDbRef, {
			title: todoItemInputValue,
		})
			.then((newItem) => {
				console.log('Добавление', newItem);
				setTodoItemInputValue('');
			})
			.finally(() => setIsCreating(false));
	};

	return {
		addTodoItem,
		isCreating,
	};
};
