import { useState } from 'react';

export const useRequestSearchTodoItem = (setTodosList, todosList, todoItemInputValue) => {
	const [isSearching, setIsSearching] = useState(false);

	const searchTodoItem = () => {
		setIsSearching(true);
		const foundItem = Object.values(todosList).filter((item) => item.title.indexOf(todoItemInputValue) !== -1);

		setTodosList(foundItem);
		setIsSearching(false);
	};
	return {
		searchTodoItem,
		isSearching,
	};
};
