import React, { useState, useEffect, useRef } from 'react';

export default function Show(props) {
	const [blog, setBlog] = useState({});
	const titleInput = useRef(null); //doc.qs('input with #title')
	const bodyInput = useRef(null);

	const handleUpdate = async e => {
		e.preventDefault();
		try {
			const response = await fetch(`/api/blogs/${props.match.params.id}`, {
				//in put request, its :/id
				method: 'PUT', //route path={'/:id'} in index.js
				headers: {
					//same as req.params.id
					'Content-Type': 'application/json' //need to pass down routerProps in index.js
				},
				body: JSON.stringify({
					//turn back into json string to send to server. an object that has title and body
					title: titleInput.current.value,
					body: bodyInput.current.value //current is where the DOM elelement is going to be placed in..all the DOM stuff
				})
			});
			const data = await response.json(); //turn into js object i can use...sends back the updated blog so
			setBlog(data); //dont need to make another api to find out the blog
		} catch (error) {
			//the blog.title and blog.body is what is shown on UI
			console.error(error);
		}
	};

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
			<form
				style={{ display: 'flex', flexDirection: 'column' }} //inner{} is object, outer {}is JS
				onSubmit={handleUpdate}
			>
				<label>
					{' '}
					Title:{' '}
					<input type="text" ref={titleInput} defaultValue={blog.title} />
				</label>
				<label>
					{' '}
					Body: <input type="text" ref={bodyInput} defaultValue={blog.body} />
				</label>
				<input type="submit" value="Update MicroBlog" />
			</form>
		</div>
	);
}

//{' '} means guarenttee an empty space. Sometimes 'linter or prettier' will take away your spaces
