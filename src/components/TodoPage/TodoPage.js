import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useOutletContext } from 'react-router-dom';
import styles from '../JsonServerTodoList/jsonServer.module.css';
import { TaskNotFound } from '../NotFound/TaskNotFound';
import { useRequestUpdateTodoList, useRequestDeleteTodoItem } from '../../hooks';

export const TodoPage = () => {
	const [task, setTask] = useState({});
	const params = useParams();
	const navigate = useNavigate();
	const setTodosList = useOutletContext();

	const { deleteTodoItem, isDeleting } = useRequestDeleteTodoItem(setTodosList);
	const { editItemId, editTodoItem, setValueForEdit, isUpdating } = useRequestUpdateTodoList(setTodosList);

	useEffect(() => {
		fetch(`http://localhost:3003/todos/${params.id}`)
			.then((response) => response.json())
			.then((loadedTodoTask) => {
				setTask(loadedTodoTask);
			});
	}, [isUpdating, params]);

	if (Object.keys(task).length === 0) {
		return <TaskNotFound />;
	}

	return (
		<>
			<div className={styles['todos-list-item']}>
				{editItemId === task.id ? (
					<input
						className={styles.field}
						defaultValue={task.title}
						onChange={({ target }) => setValueForEdit(target.value)}
					/>
				) : (
					<span>{task.title}</span>
				)}

				<div className={styles['buttons-container']}>
					<button
						className={styles['edit-button'] + (editItemId === task.id ? ' ' + styles.edit : '')}
						type="button"
						onClick={() => editTodoItem(task.id, task.title)}
					></button>
					<button
						className={styles['delete-button']}
						type="button"
						disabled={isDeleting}
						onClick={() => {
							deleteTodoItem(task.id);
							navigate('/');
						}}
					>
						X
					</button>
				</div>
			</div>

			<Link to="/" className={styles['back-link']}>
				← Назад
			</Link>
		</>
	);
};
