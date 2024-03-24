import React, { FC } from 'react';


interface HomeProps {}

const Home: FC<HomeProps> = () => (
<div className="container">
	<h1 className="mt-4 mb-4">Plant Watering App</h1>

	{/* Add Plant Form */}
	<div className="card mb-4">
		<div className="card-header">
			Add a Plant
		</div>
		<div className="card-body">
			<form id="addPlantForm">
				<div className="form-group">
					<label htmlFor="plantName">Plant Name:</label>
					<input type="text" className="form-control mt-2" id="plantName" placeholder="Enter plant name"
						required/>
				</div>
				<div className="form-group mt-2">
					<label htmlFor="plantType">Plant Type:</label>
					<input type="text" className="form-control mt-2" id="plantType" placeholder="Enter plant type"
						required/>
				</div>
				<div className="form-group mt-2">
					<label htmlFor="wateringTime">Watering Time (in seconds):</label>
					<input type="number" className="form-control mt-2" id="wateringTime"
						placeholder="Enter watering time" required/>
				</div>
				<button type="submit" className="btn btn-primary mt-2">Add Plant</button>
			</form>
		</div>
	</div>

	{/* Notifications  */}
	<div id="notifications"></div>

	{/* Plant List */}
	<div className="card mt-4">
		<div className="card-header">
			Plants List
		</div>
		<div className="card-body">
			<ul id="plantsList" className="list-group">
				{/* Plants will be dynamically added here */}
			</ul>
		</div>
	</div>
</div>
);

export default Home;
