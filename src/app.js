import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import styles from './app.module.css';
import { SimpleTodoList, FirebaseTodoList, JsonServerTodoList, TodoPage, NotFound } from './components';

export const App = () => {
	return (
		<div className={styles.app}>
			<div className={styles['buttons-container']}>
				<NavLink to="/" className={styles['secondary-button']}>
					JSON Server
				</NavLink>
				<NavLink to="/simple" className={styles['secondary-button']}>
					JSON Placeholder
				</NavLink>
				<NavLink to="/firebase" className={styles['secondary-button']}>
					Firebase
				</NavLink>
			</div>

			<Routes>
				<Route path="/" element={<JsonServerTodoList />}>
					<Route path="task/:id" element={<TodoPage />} />
				</Route>
				<Route path="/simple" element={<SimpleTodoList />} />
				<Route path="/firebase" element={<FirebaseTodoList />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
};
