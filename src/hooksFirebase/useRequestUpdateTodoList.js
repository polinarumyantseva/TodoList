import { useState } from 'react';
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateTodoList = () => {
	const [isUpdating, setIsUpdating] = useState(false);
	const [editItemId, setEditItemId] = useState(null);
	const [valueForEdit, setValueForEdit] = useState('');

	const editTodoItem = (id, title) => {
		setValueForEdit(title);
		if (id !== editItemId) {
			setEditItemId(id);
		} else {
			setEditItemId(null);
			setIsUpdating(true);

			const todoCurrentItemDbRef = ref(db, `todos/${id}`);

			set(todoCurrentItemDbRef, { title: valueForEdit })
				.then((updatedItem) => {
					console.log('Изменение', updatedItem);
				})
				.finally(() => setIsUpdating(false));
		}
	};

	return {
		editItemId,
		editTodoItem,
		setValueForEdit,
		isUpdating,
	};
};
