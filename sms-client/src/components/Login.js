import React, { useState } from 'react';
import { login } from '../api';
import { useNavigate, Link } from 'react-router-dom';

// CSS Imports (assuming correct asset paths)
// import '../app-assets/vendors/css/vendors.min.css';   // need to fix this path
import '../app-assets/vendors/css/forms/icheck/icheck.css';
import '../app-assets/vendors/css/forms/icheck/custom.css';
import '../app-assets/css/bootstrap.css';
import '../app-assets/css/bootstrap-extended.css';
import '../app-assets/css/colors.css';
import '../app-assets/css/components.css';
import '../app-assets/css/core/menu/menu-types/vertical-menu.css';
import '../app-assets/css/core/colors/palette-gradient.css';
import '../app-assets/css/pages/login-register.css';

// Logo image
import logo from '../app-assets/images/logo/stack-logo-dark.png';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate('/profile');
            // alert("Logged in!");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div className="vertical-layout vertical-menu 1-column blank-page" data-open="click" data-menu="vertical-menu" data-col="1-column">
            <div className="app-content content">
                <div className="content-overlay"></div>
                <div className="content-wrapper">
                    <div className="content-body">
                        <section className="row flexbox-container">
                            <div className="col-12 d-flex align-items-center justify-content-center">
                                <div className="col-lg-4 col-md-8 col-10 box-shadow-2 p-0">
                                    <div className="card border-grey border-lighten-3 m-0">
                                        <div className="card-header border-0">
                                            <div className="card-title text-center">
                                                <div className="p-1">
                                                    <img src={logo} alt="branding logo" />
                                                </div>
                                            </div>
                                            <h6 className="card-subtitle line-on-side text-muted text-center font-small-3 pt-2">
                                                <span>Login with SMS</span>
                                            </h6>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-body">
                                                <form className="form-horizontal form-simple" onSubmit={handleLogin}>
                                                    <fieldset className="form-group position-relative has-icon-left mb-0">
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            className="form-control form-control-lg"
                                                            placeholder="Your Email"
                                                            value={form.email}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <div className="form-control-position">
                                                            <i className="feather icon-user"></i>
                                                        </div>
                                                    </fieldset>
                                                    <fieldset className="form-group position-relative has-icon-left">
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className="form-control form-control-lg"
                                                            placeholder="Enter Password"
                                                            value={form.password}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <div className="form-control-position">
                                                            <i className="fa fa-key"></i>
                                                        </div>
                                                    </fieldset>
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 col-12 text-center text-sm-left">
                                                            <fieldset>
                                                                <input type="checkbox" id="remember-me" className="chk-remember" />
                                                                <label htmlFor="remember-me"> Remember Me</label>
                                                            </fieldset>
                                                        </div>
                                                        <div className="col-sm-6 col-12 text-center text-sm-right">
                                                            <Link to="/recover-password" className="card-link">Forgot Password?</Link>
                                                        </div>
                                                    </div>
                                                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                                                        <i className="feather icon-unlock"></i> Login
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex justify-content-between">
                                                <p className="m-0">
                                                    <Link to="/recover-password" className="card-link">Recover password</Link>
                                                </p>
                                                <p className="m-0">
                                                    New to SMS? <Link to="/register" className="card-link">Sign Up</Link>
                                                </p>
                                            </div>
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
