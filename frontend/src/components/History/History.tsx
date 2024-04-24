import React, { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import $ from 'jquery'; 

const History = () => {
    // Sample data for the table
    const [recipes, setRecipes] = useState<any[]>(
    [
        {
            _id: 123,
            name: "Tomato Soup",
            ingredients: ['Tomato'],
            recipeHtml: "utilities/tomatoSoup.html"
        }
    ]);
    const [uuid, setUuid] = React.useState(null);
    const [plants, setPlants] = useState<any[]>([]);

    const displayNotification = (message: string, type: "success" | "error" | "info") => {
        toast[type](message, {position: 'bottom-right'});
    };

    const fetchPlants = useCallback(async () => {
        console.log('fetching plants')
        try {
          const response = await fetch(`/api/plants/list/${uuid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if (response.ok) {
            console.log('plants');
            console.log(data);
            setPlants(data);
          } else {
            throw new Error(data.message || 'Error fetching plants');
          }
        } catch (error: any) {
          displayNotification('Error fetching plants', 'error');
        }
      }, [uuid]);
    
    useEffect(() => {
        fetch('http://localhost:4000/api/accounts/cookies', {
            method: 'GET',
            credentials: 'include', // Include credentials
        })
        .then(response => response.json())
        .then(data => {setUuid(data.uuid);})
        .catch(error => console.error('Error:', error));
        fetchPlants();
        console.log(uuid);
    }, [uuid, setUuid]);

    useEffect(() => {
        fetch('http://localhost:4000/api/recipes/', {
            method: 'GET',
            credentials: 'include', // Include credentials
        })
        .then(response => response.json())
        .then(data => {setRecipes(data);})
        .catch(error => console.error('Error:', error));
        console.log(recipes);
    }, [recipes, setRecipes]);

    function hasAllPlants(ingredients: string[]): boolean {
        var owned = true;
        for(let ingredient of ingredients) {
            if(!plants.includes(ingredient))
                owned = false;
        }
        return owned;
    }

    return (
        <div className="container">
            <h1 className="mt-4 mb-4 fw-bold">Recipe History</h1>
            <div className="card mt-4 shadow">
                <div className="card-header fw-bold d-flex align-items-center bg-primary text-white">
                    <p className="m-0 fs-3">History</p>
                </div>
                <div className="card-body" style={{ backgroundColor: 'rgba(110, 187, 164, 0.4)' }}>
                    <ul id="plantsList" className="list-group">
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
                                        <input className="form-check-input" type="checkbox" checked={hasAllPlants(recipe.ingredients)} disabled/>
                                    </div>
                                    <div className="collapse" id={recipe.name}>
                                        <div className="card card-body">
                                            recipe here
                                            {/* {$(function(){ $("#includedContent").load(recipe.recipeHtml)})} */}
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