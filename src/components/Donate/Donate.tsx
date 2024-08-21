import React from "react";

const Donate = () => {
    return (
        <div className="container">
            <h1 className="mt-4 mb-4 fw-bold text-center">Donate</h1>

            {/* Donation Introduction */}
            <div className="row mb-4">
                <div className="col-md-8 offset-md-2">
                    <p className="lead text-center">
                        Your generous donation helps us continue our mission to support the community and make a positive impact. Thank you for your support!
                    </p>
                </div>
            </div>

            {/* Donation Amount Options */}
            <div className="row mb-4 text-center">
                <div className="col-md-4">
                    <button className="btn btn-primary btn-lg w-100 mb-3">$25</button>
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary btn-lg w-100 mb-3">$50</button>
                </div>
                <div className="col-md-4">
                    <button className="btn btn-primary btn-lg w-100 mb-3">$100</button>
                </div>
            </div>

            {/* Custom Donation Form */}
            <div className="row mb-5">
                <div className="col-md-6 offset-md-3">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="donationAmount" className="form-label">Enter a custom amount</label>
                            <input type="number" className="form-control" id="donationAmount" placeholder="Enter amount" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="donorName" className="form-label">Name</label>
                            <input type="text" className="form-control" id="donorName" placeholder="Your Name" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="donorEmail" className="form-label">Email</label>
                            <input type="email" className="form-control" id="donorEmail" placeholder="Your Email" />
                        </div>
                        <button type="submit" className="btn btn-success btn-lg w-100">Donate Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Donate;