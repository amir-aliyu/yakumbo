import React, { useState } from "react";

const History = () => {
    // Sample data for the table
    const [recipes, setRecipes] = useState<any[]>(
    [
        {
            _id: 123,
            name: "test",
            recipeHtml: "test/test"
        },
        {
            _id: 1234,
                name: "test2",
                recipeHtml: "test/test"
        }
    ]);

    return (
        <div className="container">
            <h1 className="mt-4 mb-4 fw-bold">Recipe History</h1>
            <div className="card mt-4 shadow">
                <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
                    <p className="m-0 fs-3">History</p>
                </div>
                <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
                    <ul id="plantsList" className="list-group">
                        {/* Header Row */}
                        <li className="list-group-item bg-light">
                            <div className="row">
                                <div className="col fw-bold fs-5">Recipe</div>
                                <div className="col fw-bold fs-5 text-end">Plant Owned</div>
                            </div>
                        </li>
                        {recipes.map((recipe: any) => (
                            <li key={recipe._id} className="list-group-item">
                                <div className="row">
                                    <div className="col">
                                        <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target={"#" + recipe.name}>
                                            {recipe.name}
                                        </button>
                                    </div>
                                    <div className="col text-end">
                                        <input className="form-check-input" type="checkbox" checked disabled/>
                                    </div>
                                    <div className="collapse" id={recipe.name}>
                                        <div className="card card-body">
                                            LOAD HTML FILE HERE
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default History;