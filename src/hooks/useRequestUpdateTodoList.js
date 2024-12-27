import { useState } from 'react';

export const useRequestUpdateTodoList = (setTodosList) => {
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

			fetch(`http://localhost:3003/todos/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					title: valueForEdit,
				}),
			})
				.then((rawResponse) => rawResponse.json())
				.then((updatedItem) => {
					console.log('Изменение', updatedItem);
					setTodosList((prevItems) =>
						prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
					);
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
