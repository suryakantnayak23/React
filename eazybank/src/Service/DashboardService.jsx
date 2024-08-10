import React from 'react';

export const getNoticeDetails = async () => {
    const response = await fetch('/api/notice-details'); // Replace with your API endpoint
    return await response.json();
}


