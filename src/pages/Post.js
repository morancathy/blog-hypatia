import React, { useState, useEffect } from 'react';
export default function Show(props) {
	const [blog, setBlog] = useState({});
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch(`/api/blogs/${props.match.params.id}`);
				const data = await response.json();
				setBlog(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	const handleDelete = async e => {
		try {
			const response = await fetch(`/api/blogs/${props.match.params.id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			});
			const deletedBlog = await response.json();
		} catch (error) {
			console.error(error);
		} finally {
			window.location.assign('/');
		}
	};
	return (
		<div className="ShowPage">
			{Object.keys(blog).length ? (
				<>
					<h3>{blog.title}</h3>
					<p>{blog.body}</p>
					<button onClick={handleDelete}>DELETE ME</button>
				</>
			) : (
				<h1> Loading...</h1>
			)}
		</div>
	);
}
