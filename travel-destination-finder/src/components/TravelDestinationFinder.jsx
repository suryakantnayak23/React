import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Universities.css';

const Universities = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await axios.get('http://universities.hipolabs.com/search?country=United+States');
                setUniversities(response.data);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchUniversities();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="universities-container">
            <h1>List of Universities in the United States</h1>
            <ul>
                {universities.map((university) => (
                    <li key={university.name} className="university-item">
                        <h2>{university.name}</h2>
                        <p>Country: {university.country}</p>
                        <p>Website: <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">{university.web_pages[0]}</a></p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Universities;
