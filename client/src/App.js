import React, { useState, useEffect } from "react";
import ProjectsForm from "./components/ProjectForm";
import ContactForm from "./components/ContactForm";

import Header from "./components/Header";
import StaffView from "./components/StaffView";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
	const [projects, setProjects] = useState([]);
	const [filteredList, setFilteredList] = useState([]);
	const [showStaffView, setShowStaffView] = useState(false);
	const [loginView, setLoginView]= useState(false);

	useEffect(() => {
		fetch("/api/projects/")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);

				setProjects(data);
			})
			.catch((error) => console.error(error));

		fetch("/api/students/filter")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setFilteredList(data);
			})
			.catch((error) => console.error(error));
	}, []);

	// gets joined table that represents foreign keys in students table
	const getFilteredList = () => {
		fetch("/api/students/filter")
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setFilteredList(data);
			})
			.catch((error) => console.error(error));
		console.log("done fetching filtered");
	};

	return (
		<div className="App ">
			<Register/>
			<Header
				showStaffView={showStaffView}
				setShowStaffView={setShowStaffView}
			/>
			{!showStaffView && <Hero />}
			{!showStaffView && (
				<div className="flex gap-2 flex-col md:flex-row">
					<ContactForm />
					<ProjectsForm
						projects={projects}
						setProjects={setProjects}
						getFilteredList={getFilteredList}
						filteredList={filteredList}
					/>
				</div>
			)}
           {showStaffView && (
				<Login/> 
			)}	

			{loginView && (
				<StaffView
					projects={projects}
					setProjects={setProjects}
					filteredList={filteredList}
					getFilteredList={getFilteredList}
				/>
			)}

		</div>
	);
}

export default App;
