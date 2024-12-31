import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Breadcrumbs from './bredcrumps';

interface RecipeDetails {
    title: string;
    image: string;
    instructions: string;
    readyInMinutes: number;
    servings: number;
    summary: string;
}

const RecipeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [details, setDetails] = useState<RecipeDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const apiKey = 'dfa1220614f047f79748107c915c13fa';

    const fetchRecipeDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/${id}/information`,
                {
                    params: { apiKey },
                }
            );
            setDetails(response.data);
        } catch (err) {
            setError('Failed to fetch recipe details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipeDetails();
    }, [id]);

    if (loading) return <p className="text-center text-blue-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (

        <div className=" w-full">
            {details ? (
                <div className='max-w-4xl mx-auto p-6'>
                    <Breadcrumbs />
                    <h1 className="text-3xl font-bold text-center mb-6">{details.title}</h1>
                    <img
                        src={details.image}
                        alt={details.title}
                        className="w-full h-80 object-cover rounded-lg mb-6"
                    />
                    <p className="mb-4">
                        <strong>Ready in:</strong> {details.readyInMinutes} minutes
                    </p>
                    <p className="mb-4">
                        <strong>Servings:</strong> {details.servings}
                    </p>
                    <div
                        className="mb-4"
                        dangerouslySetInnerHTML={{ __html: details.summary }}
                    />
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                        <div
                            dangerouslySetInnerHTML={{ __html: details.instructions || 'No instructions available.' }}
                            className="recipe-instructions"
                        />
                    </div>
                </div>
            ) : (
                <p className="text-center">No details available.</p>
            )}
        </div>

    )
}


export default RecipeDetails
