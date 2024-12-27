import { useState } from 'react';
import styles from './app.module.css';
import { SimpleTodoList, FirebaseTodoList, JsonServerTodoList } from './components';

export const App = () => {
	const [listNameToShow, setListNameToShow] = useState('simple');

	return (
		<div className={styles.app}>
			<div className={styles['buttons-container']}>
				<button
					type="button"
					className={styles['secondary-button']}
					onClick={() => setListNameToShow('simple')}
				>
					JSON Placeholder
				</button>
				<button
					type="button"
					className={styles['secondary-button']}
					onClick={() => setListNameToShow('jsonServer')}
				>
					JSON Server
				</button>
				<button
					type="button"
					className={styles['secondary-button']}
					onClick={() => setListNameToShow('firebase')}
				>
					Firebase
				</button>
			</div>

			{listNameToShow === 'simple' ? (
				<SimpleTodoList />
			) : listNameToShow === 'jsonServer' ? (
				<JsonServerTodoList />
			) : (
				<FirebaseTodoList />
			)}
		</div>
	);
};
