import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from './bredcrumps';

interface Recipe {
    id: number;
    title: string;
    image: string;
}

const RecipeList: React.FC = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const apiKey = 'dfa1220614f047f79748107c915c13fa';

    const fetchRecipes = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch`,
                {
                    params: {
                        query,
                        number: 100,
                        apiKey,
                    },
                }
            );
            setRecipes(response.data.results);
        } catch (err) {
            setError('Failed to fetch recipes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Recipe Finder</h1>
            <div className="flex justify-center gap-4 mb-8">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for recipes"
                    className="w-64 px-4 py-2 border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={fetchRecipes}
                    className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            {loading && <p className="text-center text-blue-500">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {recipes.length === 0 && error === '' && <p className="text-center text-red-500">No recipie found.</p>}

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <li key={recipe.id} className="bg-white rounded-lg shadow p-4">
                        <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-lg font-semibold mb-2">{recipe.title}</h2>
                        <Link
                            to={`/recipe/${recipe.id}`}
                            className="text-blue-500 hover:underline"
                        >
                            View Details
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
