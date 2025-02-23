import React from 'react';

interface LinearLoaderProps {
    isLoading: boolean; 
    progress: number;   
}

const LinearLoader: React.FC<LinearLoaderProps> = ({ isLoading, progress }) => {
    return (
        <div className="w-full bg-gray-200 h-2.5 rounded-full">
            {isLoading ? (
                <div 
                    className="bg-blue-500 h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                ></div>
            ) : (
                <div className="h-2.5 rounded-full"></div>
            )}
        </div>
    );
};

export default LinearLoader;
