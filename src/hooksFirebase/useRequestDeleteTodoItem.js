import { useState } from 'react';
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTodoItem = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteTodoItem = (id) => {
		setIsDeleting(true);

		const todoCurrentItemDbRef = ref(db, `todos/${id}`);

		remove(todoCurrentItemDbRef)
			.then((response) => {
				console.log('Удаление', response);
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		deleteTodoItem,
		isDeleting,
	};
};
