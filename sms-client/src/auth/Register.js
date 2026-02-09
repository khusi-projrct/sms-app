import React, { useState } from 'react';
import { register } from '../api';
import { Link, useNavigate } from 'react-router-dom';

// CSS Imports (adjust paths if needed)
import '../app-assets/css/bootstrap.css';
import '../app-assets/css/bootstrap-extended.css';
import '../app-assets/css/colors.css';
import '../app-assets/css/components.css';
import '../app-assets/css/core/menu/menu-types/vertical-menu.css';
import '../app-assets/css/core/colors/palette-gradient.css';
import '../app-assets/css/pages/login-register.css';
// import '../app-assets/css/style.css';    //need to fix this path

export default function Register() {
    const [form, setForm] = useState({ username: '', contactNumber: '', email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
        setSuccess('');
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactNumberRegex = /^[0-9]{10,15}$/;

        if (!form.username.trim()) newErrors.username = "Username is required";

        if (!form.contactNumber.trim()) {
            newErrors.contactNumber = "Contact number is required";
        } else if (!contactNumberRegex.test(form.contactNumber)) {
            newErrors.contactNumber = "Invalid contact number format";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!form.password.trim()) {
            newErrors.password = "Password is required";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        return newErrors;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await register(form);
            setSuccess("Registration successful");
            setForm({ username: '', contactNumber: '', email: '', password: '' });
            setErrors({});
            navigate('/login');
            // alert("Registration successful!");
        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <div className="vertical-layout vertical-menu 1-column blank-page blank-page" data-open="click" data-menu="vertical-menu" data-col="1-column">
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-body">
                        <section className="row flexbox-container">
                            <div className="col-12 d-flex align-items-center justify-content-center">
                                <div className="col-lg-5 col-md-8 col-11 box-shadow-2 p-0">
                                    <div className="card border-grey border-lighten-3 px-2 py-2 m-0">
                                        <div className="card-header border-0 text-center">
                                            <div className="card-title">
                                                <img src={require('../app-assets/images/logo/stack-logo-dark.png')} alt="branding logo" />
                                            </div>
                                            <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                                                <span>Create Account</span>
                                            </h6>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <form className="form-horizontal form-simple" onSubmit={handleRegister}>
                                                    <fieldset className="form-group position-relative has-icon-left mb-1">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            name="username"
                                                            placeholder="Username"
                                                            value={form.username}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <div className="form-control-position">
                                                            <i className="feather icon-user"></i>
                                                        </div>
                                                        {errors.username && <small className="text-danger">{errors.username}</small>}
                                                    </fieldset>

                                                    <fieldset className="form-group position-relative has-icon-left mb-1">
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg"
                                                            name="contactNumber"
                                                            placeholder="Contact Number"
                                                            value={form.contactNumber}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <div className="form-control-position">
                                                            <i className="feather icon-phone"></i>
                                                        </div>
                                                        {errors.contactNumber && <small className="text-danger">{errors.contactNumber}</small>}
                                                    </fieldset>

                                                    <fieldset className="form-group position-relative has-icon-left mb-1">
                                                        <input
                                                            type="email"
                                                            className="form-control form-control-lg"
                                                            name="email"
                                                            placeholder="Email"
                                                            value={form.email}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <div className="form-control-position">
                                                            <i className="feather icon-mail"></i>
                                                        </div>
                                                        {errors.email && <small className="text-danger">{errors.email}</small>}
                                                    </fieldset>

                                                    <fieldset className="form-group position-relative has-icon-left mb-1">
                                                        <input
                                                            type="password"
                                                            className="form-control form-control-lg"
                                                            name="password"
                                                            placeholder="Password"
                                                            value={form.password}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <div className="form-control-position">
                                                            <i className="fa fa-key"></i>
                                                        </div>
                                                        {errors.password && <small className="text-danger">{errors.password}</small>}
                                                    </fieldset>

                                                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                                                        <i className="feather icon-user-plus"></i> Register
                                                    </button>

                                                    {success && <p className="text-success text-center mt-1">{success}</p>}
                                                </form>
                                            </div>
                                            <p className="text-center">
                                                Already have an account? <Link to="/login" className="card-link">Login</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

