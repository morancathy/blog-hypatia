import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
	const [blogs, setBlogs] = useState([]); //the array will get stuck inside of blogs
	//rerender when state is updated...rerender means return runs again

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('/api/blogs');
				const data = await response.json();
				setBlogs(data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	return (
		<div className="HomePage">
			<ul>
				{blogs.map(blog => {
					return (
						<li key={blog._id}>
							<Link to={`/${blog._id}`}>
								<h3>{blog.title}</h3>
							</Link>
							<p>{blog.body}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
