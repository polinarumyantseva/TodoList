import { useState, useEffect } from 'react';

export const useRequestGetTodoList = (isSorted, todoItemInputValue) => {
	const [todosList, setTodosList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3003/todos')
			.then((response) => response.json())
			.then((loadedTodosList) => {
				console.log('Данные загружены', loadedTodosList);

				if (isSorted) {
					loadedTodosList = sortTodoList(loadedTodosList);
				}

				setTodosList(loadedTodosList);
			})
			.finally(() => setIsLoading(false));
	}, [isSorted, todoItemInputValue]);

	const sortTodoList = (list) => list.sort((a, b) => (a.title > b.title ? 1 : -1));

	return {
		todosList,
		setTodosList,
		isLoading,
	};
};
