import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGetTodoList = (isSorted, todoItemInputValue) => {
	const [todosList, setTodosList] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const todoListDbRef = ref(db, 'todos');

		return onValue(todoListDbRef, (snapshot) => {
			let loadedTodosList = snapshot.val();

			if (isSorted) {
				loadedTodosList = sortTodoList(loadedTodosList);
			}

			setTodosList(loadedTodosList || {});
			setIsLoading(false);
		});
	}, [isSorted, todoItemInputValue]);

	const sortTodoList = (list) => Object.values(list).sort((a, b) => (a.title > b.title ? 1 : -1));

	return {
		todosList,
		setTodosList,
		isLoading,
	};
};
