import React, { useEffect } from 'react';
import '../Home.css';

const services = [
    { icon: "fa fa-users s1", name: "Personal Loan" },
    { icon: "fa fa-handshake-o s2", name: "Business Loan" },
    { icon: "fa fa-home s3", name: "Home Loan" },
    { icon: "fa fa-car s4", name: "Auto Loan" },
    { icon: "fa fa-stethoscope s5", name: "Health Loan" },
    { icon: "fa fa-graduation-cap s6", name: "Education Loan" },
];

const HomeComponent = () => {

    useEffect(() => {
        // Any setup or data fetching can be done here if needed
    }, []);

    return (
        <div className="welcome py-1">
            <div className="container py-xl-1 py-lg-1" id="services">
                <div className="row">
                    <div className="col-lg-5 welcome-left">
                        <h3 className="title-w3ls mt-2 mb-3">Services provided by EazyBank</h3>
                        <p className="mt-4 pr-lg-5">
                            Eazy Bank offers a diverse range of financial products and banking services to customers through a growing branch and ATM network and digital channels such as Netbanking, Phonebanking, and MobileBanking.
                        </p>
                    </div>
                    <div className="col-lg-7 welcome-right text-center mt-lg-0 mt-5">
                        <div className="row">
                            {services.map((service, index) => (
                                <div key={index} className={`col-sm-4 service-1-w3pvt serve-gd${index + 1}`}>
                                    <div className="serve-grid mt-4">
                                        <span className={service.icon}></span>
                                        <p className="mt-2">{service.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;