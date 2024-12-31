import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const paths = location.pathname.split('/').filter((path) => path);

    return (
        <nav className="bg-gray-100 p-3">
            <ul className="flex space-x-2 text-sm">
                <li>
                    <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                </li>
                {paths.map((path, index) => {
                    const url = `/${paths.slice(0, index + 1).join('/')}`;
                    const isLast = index === paths.length - 1;

                    return (
                        <li key={url} className="flex items-center">
                            <span className="mx-2">/</span>
                            {isLast ? (
                                <span className="text-gray-500">{path}</span>
                            ) : (
                                <Link to={url} className="text-blue-500 hover:underline">{path}</Link>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Breadcrumbs;
