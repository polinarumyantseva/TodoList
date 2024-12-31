import { useState } from 'react';
import { Link, useMatch, Outlet } from 'react-router-dom';
import styles from './jsonServer.module.css';
import { useRequestGetTodoList, useRequestAddTodoItem, useRequestSearchTodoItem } from '../../hooks';

export const JsonServerTodoList = () => {
	const [todoItemInputValue, setTodoItemInputValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const { todosList, setTodosList, isLoading } = useRequestGetTodoList(isSorted, todoItemInputValue);
	const { addTodoItem, isCreating } = useRequestAddTodoItem(setTodosList, todoItemInputValue, setTodoItemInputValue);
	const { searchTodoItem, isSearching } = useRequestSearchTodoItem(setTodosList, todosList, todoItemInputValue);

	const onClear = () => {
		setTodoItemInputValue('');
		setIsSorted(false);
	};

	const urlMatchData = useMatch('/task/:id');

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>JSON Server</h1>

			{urlMatchData !== null ? (
				<Outlet context={setTodosList} />
			) : (
				<>
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
									<Link className={styles['todo-item-link']} to={`task/${id}`}>
										{title}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<p>Нет данных</p>
					)}
				</>
			)}
		</div>
	);
};
