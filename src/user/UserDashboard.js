import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {getPurchaseHistory} from './apiUser';
import moment from 'moment';

const Dashboard = () => {

    const [history, setHistory] = useState([]);
    const {user: {_id, name, email, role}} = isAuthenticated(); 
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token)
            .then(data => {
                if(data.error) {
                    console.log(data.error);
                } 
                else {
                    setHistory(data);
                }
            })
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLink = () => {
        return(
            <div className="card">
                <h4 className="card-header">User Link</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>
                    </li>
                </ul>
            </div>
        )
    };

    const userInfo = () => {
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

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6><strong>Product name:</strong> {p.name}</h6>
                                                <h6><strong>Product price:</strong> Rs.{p.price}</h6>
                                                <h6>
                                                    <strong>Purchased date:</strong>{" "}
                                                    {moment(h.createdAt).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                    <hr />
                                    <hr />
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Layout title="Dashboard" description={`Good day ${name}`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {userLink()}
                </div>

                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    )
};

export default Dashboard;