import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

const AdminDashboard = () => {

    const {user: {_id, name, email, role}} = isAuthenticated(); 

    const adminLink = () => {
        return(
            <div className="card">
                <h4 className="card-header">User Link</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">Create Category</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">Create Product</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">View Orders</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">Manage Products</Link>
                    </li>
                </ul>
            </div>
        )
    };

    const adminInfo = () => {
        return (
            <div className='card mb-5'>
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">Name   :  {name}</li>
                    <li className="list-group-item">Email  :  {email}</li>
                    <li className="list-group-item">Role   :  {role === 0 ? 'Registered User' : 'Admin'}</li>
                </ul>
            </div>
        );
    };

    return (
        <Layout title="Dashboard" description={`Good day ${name}`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {adminLink()}
                </div>

                <div className="col-9">
                    {adminInfo()}
                </div>
            </div>
        </Layout>
    )
};

export default AdminDashboard;