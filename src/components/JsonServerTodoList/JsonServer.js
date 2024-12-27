import { useState } from 'react';
import styles from './jsonServer.module.css';
import {
	useRequestUpdateTodoList,
	useRequestGetTodoList,
	useRequestDeleteTodoItem,
	useRequestAddTodoItem,
	useRequestSearchTodoItem,
} from '../../hooks';

export const JsonServerTodoList = () => {
	const [todoItemInputValue, setTodoItemInputValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const { todosList, setTodosList, isLoading } = useRequestGetTodoList(isSorted, todoItemInputValue);

	const { addTodoItem, isCreating } = useRequestAddTodoItem(setTodosList, todoItemInputValue, setTodoItemInputValue);
	const { searchTodoItem, isSearching } = useRequestSearchTodoItem(setTodosList, todosList, todoItemInputValue);
	const { editItemId, editTodoItem, setValueForEdit } = useRequestUpdateTodoList(setTodosList);
	const { deleteTodoItem, isDeleting } = useRequestDeleteTodoItem(setTodosList);

	const onClear = () => {
		setTodoItemInputValue('');
		setIsSorted(false);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>JSON Server</h1>

			<div className={styles['add-new-value-block']}>
				<input
					type="text"
					className={styles.field}
					value={todoItemInputValue}
					onChange={({ target }) => setTodoItemInputValue(target.value)}
					placeholder="Введите название дела"
				/>
				<div className={styles['buttons-container']}>
					<button
						className={styles['submit-button']}
						type="button"
						onClick={addTodoItem}
						disabled={todoItemInputValue === '' || isCreating}
					>
						Добавить
					</button>
					<button
						className={styles['submit-button']}
						type="button"
						onClick={searchTodoItem}
						disabled={isSearching}
					>
						Найти
					</button>
					<button className={styles['secondary-button']} type="button" onClick={onClear}>
						Сброс
					</button>

					<label className={styles['checkbox-label']}>
						<input
							type="checkbox"
							value={isSorted}
							name="sort"
							onChange={({ target }) => {
								setIsSorted(target.checked);
							}}
						/>
						Отсортировать по алфавиту
					</label>
				</div>
			</div>

			{isLoading ? (
				<div className={styles.loader}></div>
			) : todosList && todosList.length > 0 ? (
				<ul className={styles['todos-list']}>
					{todosList.map(({ id, title }) => (
						<li key={id} className={styles['todos-list-item']}>
							{editItemId === id ? (
								<input
									className={styles.field}
									defaultValue={title}
									onChange={({ target }) => setValueForEdit(target.value)}
								/>
							) : (
								title
							)}

							<div className={styles['buttons-container']}>
								<button
									className={styles['edit-button'] + (editItemId === id ? ' ' + styles.edit : '')}
									type="button"
									onClick={() => editTodoItem(id, title)}
								></button>
								<button
									className={styles['delete-button']}
									type="button"
									onClick={() => deleteTodoItem(id)}
									disabled={isDeleting}
								>
									X
								</button>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p>Нет данных</p>
			)}
		</div>
	);
};
