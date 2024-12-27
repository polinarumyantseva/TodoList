import { useEffect, useState } from 'react';
import styles from './simple.module.css';

export const SimpleTodoList = () => {
	const [listItem, setListItem] = useState({});

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/todos/5')
			.then((response) => response.json())
			.catch((error) => {
				console.error('Ошибка при получении данных:', error);
			})
			.then((item) => {
				console.log(item);
				setListItem(item || {});
			});
	}, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>JSON Placeholder</h1>
			{Object.keys(listItem).length > 0 && (
				<ul className={styles['todos-list']}>
					<li>{listItem.title}</li>
				</ul>
			)}
		</div>
	);
};
