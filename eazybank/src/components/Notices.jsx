import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNoticeDetails } from '../Service/DashboardService'; // Adjust the import path as necessary

const NoticesComponent = () => {
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await getNoticeDetails();
                console.log(response); // Add this to debug the API response
                setNotices(response.body); // Ensure response.body is correct
            } catch (error) {
                console.error('Error fetching notice details:', error);
            }
        };

        fetchNotices();
    }, []);

    // Simple content to verify if component is rendering
    if (notices.length === 0) {
        return <div>No notices available</div>;
    }

    return (
        <section className="ftco-section" id="cards">
            <div className="container">
                <div className="row">
                    {notices.map((notice, index) => (
                        <div className="col-md-4 cardheader" key={index}>
                            <div className="card">
                                <div className="icon-wrap px-4 pt-4">
                                    <div className="icon d-flex justify-content-center align-items-center bg-success rounded-circle">
                    <span className="ion-logo-ionic text-light">
                      <i className="fa fa-envelope-open"></i>
                    </span>
                                    </div>
                                </div>
                                <div className="card-body pb-5 px-4">
                                    <h5 className="card-title">{notice.noticeSummary}</h5>
                                    <p className="card-text">{notice.noticeDetails}</p>
                                    <Link to="/contact" className="btn btn-success">Contact US</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NoticesComponent;
