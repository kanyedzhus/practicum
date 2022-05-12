import React, { useState } from "react";

export default function ProjectsForm({ projects, setProjects }) {
	const [formData, setFormData] = useState({
		project_files: null,
		file_name: "",
		contact_person: "",
		business_name: "",
		email: "",
		phone: "",
	});

	// handling multiple inputs with a single onchange
	const handleInputChange = (event) => {
		// destructure the name and value properties from event.target
		const { name, value } = event.target;

		// update state using spread operator and es6 computed property
		// keep everything in state as is, but update the property with the same name as event.target.name to have its value as event.target.value
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// this function will update the project_files property in state
	const handleFileChange = (event) => {
		// in event.target we have access to a files property for input type file. This is an array of objects with the file or files uploaded. Accessing one file would be at index 0.
		// let path = event.target.value;
		// console.log(
		// 	event.target.value,
		// 	document.getElementById("project_files").files[0]
		// );
		console.log(event.target.files[0]);
		setFormData({
			...formData,
			project_files: event.target.files[0],
			file_name: event.target.files[0].name,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// formdata lets us create a set of key-value pairs to send form data. this will create an empty formdata object.
		let project = new FormData();
		// add key value pairs to formdata obj. the values are taken from state. both .set and .append work. .set will overwrite an existing key's value, while append will simply add on to the end
		project.set("project_files", formData.project_files);
		project.set("file_name", formData.file_name);
		project.set("contact_person", formData.contact_person);
		project.set("business_name", formData.business_name);
		project.set("email", formData.email);
		project.set("phone", formData.phone);
		project.set("created_at", formData.created_at);
		project.set("completed", 0);
		project.set("accepted", 0);

		fetch("/api/projects/", {
			method: "POST",
			// adding the headers with this content-type breaks the post because it prevents the browser from correctly adding boundaries between entries  https://muffinman.io/blog/uploading-files-using-fetch-multipart-form-data/
			// headers: {
			// 	"Content-Type": "multipart/form-data",
			// },
			body: project,
		})
			.then((response) => response.json())
			.then((data) => setProjects(data))
			.catch((error) => console.error(error));
	};

	return (
		<>
			{/* enctype is essential for fileuploads */}
			<form
				className=""
				action="/api/projects"
				method="POST"
				encType="multipart/form-data"
				onSubmit={handleSubmit}
			>
				{/* FILE UPLOAD INPUT */}
				<label htmlFor="fileUpload" className="text-gray-700">
					Upload your files
				</label>
				<input
					onChange={handleFileChange}
					type="file"
					id="project_files"
					name="project_files"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>
				{/* ************** */}

				<label htmlFor="contact_person" className="text-gray-700">
					Full Name
				</label>
				<input
					value={formData.contact_person}
					onChange={handleInputChange}
					type="text"
					id="contact_person"
					name="contact_person"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>

				<label htmlFor="business_name" className="text-gray-700">
					Name of Business
				</label>
				<input
					value={formData.business_name}
					onChange={handleInputChange}
					type="text"
					id="business_name"
					name="business_name"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>
				<label htmlFor="email" className="text-gray-700">
					Email
				</label>
				<input
					value={formData.email}
					onChange={handleInputChange}
					type="email"
					id="email"
					name="email"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>

				<label htmlFor="phone" className="text-gray-700">
					Phone Number
				</label>
				<input
					value={formData.phone}
					onChange={handleInputChange}
					type="phone"
					id="phone"
					name="phone"
					className=" rounded-lg appearance-none border border-gray-300 py-2 px-4  shadow-sm text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
				/>

				<button
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					type="submit"
				>
					Submit
				</button>
			</form>
		</>
	);
}