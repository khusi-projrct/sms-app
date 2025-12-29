import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../api';

import TeacherDashboard from '../modules/Teachers/components/TeacherDashboard';
import AdminDashboard from '../modules/Admins/components/AdminDashboard';
import StudentDashboard from '../modules/Students/components/StudentDashboard';
import ParentDashboard from '../modules/Parents/components/ParentDashboard';

export default function Profile() {
    const userData = localStorage.getItem('user');
    const username = userData ? JSON.parse(userData).username : 'Guest';

    const [profile, setProfile] = useState(null);
    const [editableProfile, setEditableProfile] = useState({});
    const [selectedRole, setSelectedRole] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [selectedAvatarFile, setSelectedAvatarFile] = useState(null);
    const [originalAvatar, setOriginalAvatar] = useState(null);

    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const res = await getProfile(token);
                setProfile(res.data.user);
                setEditableProfile(res.data.user);

                setAvatarPreview(null);
                setOriginalAvatar(res.data.user.avatarUrl || null);

                if (res.data.user.roles && res.data.user.roles.length > 0) {
                    setSelectedRole(res.data.user.roles[0]);
                }
            } catch (error) {
                alert('Failed to load profile');
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleRoleChange = (e) => {
        const role = e.target.value;
        setSelectedRole(role);
        if (role === 'admin') navigate('/admins/dashboard');
        else if (role === 'teacher') navigate('/teachers/dashboard');
        else if (role === 'student') navigate('/students/dashboard');
        else if (role === 'parent') navigate('/parents/dashboard');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditableProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");

            // 1️⃣ Upload avatar if changed
            if (selectedAvatarFile) {
                const formData = new FormData();
                formData.append("avatar", selectedAvatarFile);

                const res = await fetch(
                    "http://localhost:5000/api/auth/upload-avatar",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: formData,
                    }
                );

                const data = await res.json();

                if (!res.ok) throw new Error(data.message);

                // update avatar everywhere
                setAvatarPreview(data.avatarUrl);
                setOriginalAvatar(data.avatarUrl);
                setEditableProfile(prev => ({ ...prev, avatarUrl: data.avatarUrl }));
            }

            // 2️⃣ Save profile locally
            setProfile(editableProfile);
            setIsEditMode(false);

        } catch (error) {
            alert(error.message || "Avatar upload failed");
        }
    };


    const handleCancel = () => {
        setEditableProfile(profile); // revert changes
        setIsEditMode(false);
    };

    if (!profile) return null;

    let dashboard = null;
    if (selectedRole === 'admin') dashboard = <AdminDashboard />;
    else if (selectedRole === 'teacher') dashboard = <TeacherDashboard />;
    else if (selectedRole === 'student') dashboard = <StudentDashboard />;
    else if (selectedRole === 'parent') dashboard = <ParentDashboard />;

    return (
        <div>
            {isEditMode ? (
                <>
                    <div className="app-content"> {/*content*/}
                        <div className="content-overlay"></div>
                        <div className="content-wrapper">
                            <div className="content-header row"></div>
                            <div className="content-body">
                                {/* users edit start */}
                                <section className="users-edit">
                                    <div className="card">
                                        <div className="card-content">
                                            <div className="card-body">
                                                <ul className="nav nav-tabs mb-2" role="tablist">
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link d-flex align-items-center active"
                                                            id="account-tab"
                                                            data-toggle="tab"
                                                            href="#account"
                                                            aria-controls="account"
                                                            role="tab"
                                                            aria-selected="true"
                                                        >
                                                            <i className="feather icon-user mr-25"></i>
                                                            <span className="d-none d-sm-block">Account</span>
                                                        </a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a
                                                            className="nav-link d-flex align-items-center"
                                                            id="information-tab"
                                                            data-toggle="tab"
                                                            href="#information"
                                                            aria-controls="information"
                                                            role="tab"
                                                            aria-selected="false"
                                                        >
                                                            <i className="feather icon-info mr-25"></i>
                                                            <span className="d-none d-sm-block">Information</span>
                                                        </a>
                                                    </li>
                                                </ul>

                                                <div className="tab-content">
                                                    {/* Account Tab */}
                                                    <div
                                                        className="tab-pane active"
                                                        id="account"
                                                        aria-labelledby="account-tab"
                                                        role="tabpanel"
                                                    >
                                                        <div className="media mb-2">
                                                            <a className="mr-2" href="#">
                                                                <img
                                                                    src={
                                                                        avatarPreview
                                                                            ? avatarPreview
                                                                            : originalAvatar
                                                                                ? originalAvatar
                                                                                : "../../../app-assets/images/portrait/small/avatar-s-26.png"
                                                                    }
                                                                    alt="users avatar"
                                                                    className="users-avatar-shadow rounded-circle"
                                                                    height="64"
                                                                    width="64"
                                                                />
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    style={{ display: "none" }}
                                                                    id="avatarInput"
                                                                    ref={fileInputRef}
                                                                    onChange={(e) => {
                                                                        const file = e.target.files[0];
                                                                        if (!file) return;

                                                                        setAvatarPreview((prevPreview) => {
                                                                            if (prevPreview) {
                                                                                URL.revokeObjectURL(prevPreview);
                                                                            }
                                                                            return URL.createObjectURL(file);
                                                                        });

                                                                        setSelectedAvatarFile(file);
                                                                    }}
                                                                />


                                                            </a>
                                                            <div className="media-body">
                                                                <h4 className="media-heading">Avatar</h4>
                                                                <div className="col-12 px-0 d-flex">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-primary mr-25"
                                                                        onClick={() => document.getElementById("avatarInput").click()}
                                                                    >
                                                                        Change
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-sm btn-secondary"
                                                                        onClick={() => {
                                                                            setAvatarPreview((prevPreview) => {
                                                                                if (prevPreview) {
                                                                                    URL.revokeObjectURL(prevPreview);
                                                                                }
                                                                                return null;
                                                                            });

                                                                            setSelectedAvatarFile(null);
                                                                            const input = document.getElementById("avatarInput");
                                                                            if (input) {
                                                                                input.value = "";
                                                                            }
                                                                        }}
                                                                    >
                                                                        Reset
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Account Form */}
                                                        <form noValidate>
                                                            <div className="row">
                                                                <div className="col-12 col-sm-6">
                                                                    <div className="form-group">
                                                                        <div className="controls">
                                                                            <label>Username</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Username"
                                                                                defaultValue="dean3004"
                                                                                required
                                                                                data-validation-required-message="This username field is required"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="controls">
                                                                            <label>Name</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Name"
                                                                                defaultValue="Dean Stanley"
                                                                                required
                                                                                data-validation-required-message="This name field is required"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="controls">
                                                                            <label>E-mail</label>
                                                                            <input
                                                                                type="email"
                                                                                className="form-control"
                                                                                placeholder="Email"
                                                                                defaultValue="deanstanley@gmail.com"
                                                                                required
                                                                                data-validation-required-message="This email field is required"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-12 col-sm-6">
                                                                    <div className="form-group">
                                                                        <label>Role</label>
                                                                        <select className="form-control">
                                                                            <option>User</option>
                                                                            <option>Staff</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Status</label>
                                                                        <select className="form-control">
                                                                            <option>Active</option>
                                                                            <option>Banned</option>
                                                                            <option>Close</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Company</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            placeholder="Company name"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="col-12">
                                                                    <div className="table-responsive">
                                                                        <table className="table mt-1">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Module Permission</th>
                                                                                    <th>Read</th>
                                                                                    <th>Write</th>
                                                                                    <th>Create</th>
                                                                                    <th>Delete</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {/* Repeatable rows */}
                                                                                {[
                                                                                    {
                                                                                        module: "Users",
                                                                                        checks: [true, false, false, true],
                                                                                    },
                                                                                    {
                                                                                        module: "Articles",
                                                                                        checks: [false, true, false, true],
                                                                                    },
                                                                                    {
                                                                                        module: "Staff",
                                                                                        checks: [true, true, false, false],
                                                                                    },
                                                                                ].map((row, idx) => (
                                                                                    <tr key={idx}>
                                                                                        <td>{row.module}</td>
                                                                                        {row.checks.map((val, cIdx) => (
                                                                                            <td key={cIdx}>
                                                                                                <div className="custom-control custom-checkbox">
                                                                                                    <input
                                                                                                        type="checkbox"
                                                                                                        id={`users-checkbox${idx * 4 + cIdx + 1}`}
                                                                                                        className="custom-control-input"
                                                                                                        defaultChecked={val}
                                                                                                    />
                                                                                                    <label
                                                                                                        className="custom-control-label"
                                                                                                        htmlFor={`users-checkbox${idx * 4 + cIdx + 1}`}
                                                                                                    ></label>
                                                                                                </div>
                                                                                            </td>
                                                                                        ))}
                                                                                    </tr>
                                                                                ))}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>

                                                                <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-primary glow"
                                                                        onClick={handleSave}
                                                                    >
                                                                        Save changes
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="btn btn-light"
                                                                        onClick={() => {
                                                                            setEditableProfile(profile);
                                                                            setAvatarPreview(originalAvatar);
                                                                            setSelectedAvatarFile(null);
                                                                            setIsEditMode(false);
                                                                        }}
                                                                    >
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>

                                                    {/* Information Tab */}
                                                    <div
                                                        className="tab-pane"
                                                        id="information"
                                                        aria-labelledby="information-tab"
                                                        role="tabpanel"
                                                    >
                                                        <form noValidate>
                                                            <div className="row">
                                                                <div className="col-12 col-sm-6">
                                                                    <h5 className="mb-1">
                                                                        <i className="feather icon-link mr-25"></i>Social Links
                                                                    </h5>
                                                                    {["Twitter", "Facebook", "Google+", "LinkedIn", "Instagram"].map((label, i) => (
                                                                        <div className="form-group" key={i}>
                                                                            <label>{label}</label>
                                                                            <input
                                                                                className="form-control"
                                                                                type="text"
                                                                                defaultValue={
                                                                                    label === "Twitter"
                                                                                        ? "https://www.twitter.com/"
                                                                                        : label === "Facebook"
                                                                                            ? "https://www.facebook.com/"
                                                                                            : label === "Instagram"
                                                                                                ? "https://www.instagram.com/"
                                                                                                : ""
                                                                                }
                                                                            />
                                                                        </div>
                                                                    ))}
                                                                </div>

                                                                <div className="col-12 col-sm-6 mt-1 mt-sm-0">
                                                                    <h5 className="mb-1">
                                                                        <i className="feather icon-user mr-25"></i>Personal Info
                                                                    </h5>
                                                                    <div className="form-group">
                                                                        <div className="controls position-relative">
                                                                            <label>Birth date</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control birthdate-picker"
                                                                                required
                                                                                placeholder="Birth date"
                                                                                data-validation-required-message="This birthdate field is required"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Country</label>
                                                                        <select className="form-control" id="accountSelect">
                                                                            <option>USA</option>
                                                                            <option>India</option>
                                                                            <option>Canada</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Languages</label>
                                                                        <select className="form-control" id="users-language-select2" multiple>
                                                                            <option value="English" selected>
                                                                                English
                                                                            </option>
                                                                            <option value="Spanish">Spanish</option>
                                                                            <option value="French">French</option>
                                                                            <option value="Russian">Russian</option>
                                                                            <option value="German">German</option>
                                                                            <option value="Arabic" selected>
                                                                                Arabic
                                                                            </option>
                                                                            <option value="Sanskrit">Sanskrit</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="controls">
                                                                            <label>Phone</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                required
                                                                                placeholder="Phone number"
                                                                                defaultValue="(+656) 254 2568"
                                                                                data-validation-required-message="This phone number field is required"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="controls">
                                                                            <label>Address</label>
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Address"
                                                                                data-validation-required-message="This Address field is required"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label>Website</label>
                                                                        <input type="text" className="form-control" placeholder="Website address" />
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Favourite Music</label>
                                                                        <select className="form-control" id="users-music-select2" multiple>
                                                                            <option value="Rock">Rock</option>
                                                                            <option value="Jazz" selected>
                                                                                Jazz
                                                                            </option>
                                                                            <option value="Disco">Disco</option>
                                                                            <option value="Pop">Pop</option>
                                                                            <option value="Techno">Techno</option>
                                                                            <option value="Folk" selected>
                                                                                Folk
                                                                            </option>
                                                                            <option value="Hip hop">Hip hop</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-12">
                                                                    <div className="form-group">
                                                                        <label>Favourite movies</label>
                                                                        <select className="form-control" id="users-movies-select2" multiple>
                                                                            <option value="The Dark Knight" selected>
                                                                                The Dark Knight
                                                                            </option>
                                                                            <option value="Harry Potter" selected>
                                                                                Harry Potter
                                                                            </option>
                                                                            <option value="Airplane!">Airplane!</option>
                                                                            <option value="Perl Harbour">Perl Harbour</option>
                                                                            <option value="Spider Man">Spider Man</option>
                                                                            <option value="Iron Man" selected>
                                                                                Iron Man
                                                                            </option>
                                                                            <option value="Avatar">Avatar</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className="col-12 d-flex flex-sm-row flex-column justify-content-end mt-1">
                                                                    <button type="submit" className="btn btn-primary glow mb-1 mb-sm-0 mr-0 mr-sm-1">
                                                                        Save changes
                                                                    </button>
                                                                    <button type="reset" className="btn btn-light">
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    {/* Tab Content End */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {/* users edit ends */}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="app-content"> {/*content*/}
                    <div className="content-overlay"></div>
                    <div className="content-wrapper">
                        <div className="content-header row"></div>
                        <div className="content-body">
                            {/* Users view start */}
                            <section className="users-view">
                                {/* Users view media object start */}
                                <div className="row">
                                    <div className="col-12 col-sm-7">
                                        <div className="media mb-2">
                                            <a className="mr-1" href="#">
                                                <img
                                                    src={
                                                        profile.avatarUrl ||
                                                        "../../../app-assets/images/portrait/small/avatar-s-26.png"
                                                    }
                                                    alt="users view avatar"
                                                    className="users-avatar-shadow rounded-circle"
                                                    height="64"
                                                    width="64"
                                                />

                                            </a>
                                            <div className="media-body pt-25">
                                                <h4 className="media-heading">
                                                    <span className="user-name">{username}</span>
                                                    <span className="text-muted font-medium-1">@</span>
                                                    <span className="users-view-username text-muted font-medium-1">candy007</span>
                                                </h4>
                                                <span>ID:</span>
                                                <span className="users-view-id">305</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-5 px-0 d-flex justify-content-end align-items-center px-1 mb-2">
                                        <a href="#" className="btn btn-sm mr-25 border">
                                            <i className="feather icon-message-square font-small-3"></i>
                                        </a>
                                        <a href="#" className="btn btn-sm mr-25 border">Profile</a>
                                        {!isEditMode ? (
                                            <button onClick={() => setIsEditMode(true)} className="btn btn-sm btn-primary">
                                                Edit Profile
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                                {/* Users view media object ends */}

                                {/* Users view card data start */}
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-12 col-md-4">
                                                    <table className="table table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>Registered:</td>
                                                                <td>01/01/2019</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Latest Activity:</td>
                                                                <td className="users-view-latest-activity">30/04/2019</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Verified:</td>
                                                                <td className="users-view-verified">Yes</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Role:</td>
                                                                <td className="users-view-role">Staff</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Status:</td>
                                                                <td>
                                                                    <span className="badge badge-success users-view-status">Active</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="col-12 col-md-8">
                                                    <div className="table-responsive">
                                                        <table className="table mb-0">
                                                            <thead>
                                                                <tr>
                                                                    <th>Module Permission</th>
                                                                    <th>Read</th>
                                                                    <th>Write</th>
                                                                    <th>Create</th>
                                                                    <th>Delete</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>Users</td>
                                                                    <td>Yes</td>
                                                                    <td>No</td>
                                                                    <td>No</td>
                                                                    <td>Yes</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Articles</td>
                                                                    <td>No</td>
                                                                    <td>Yes</td>
                                                                    <td>No</td>
                                                                    <td>Yes</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Staff</td>
                                                                    <td>Yes</td>
                                                                    <td>Yes</td>
                                                                    <td>No</td>
                                                                    <td>No</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Users view card data ends */}

                                {/* Users view card details start */}
                                <div className="card">
                                    <div className="card-content">
                                        <div className="card-body">
                                            <div className="row bg-primary bg-lighten-5 rounded mb-2 mx-25 text-center text-lg-left">
                                                <div className="col-12 col-sm-4 p-2">
                                                    <h6 className="text-primary mb-0">
                                                        Posts: <span className="font-large-1 align-middle">125</span>
                                                    </h6>
                                                </div>
                                                <div className="col-12 col-sm-4 p-2">
                                                    <h6 className="text-primary mb-0">
                                                        Followers: <span className="font-large-1 align-middle">534</span>
                                                    </h6>
                                                </div>
                                                <div className="col-12 col-sm-4 p-2">
                                                    <h6 className="text-primary mb-0">
                                                        Following: <span className="font-large-1 align-middle">256</span>
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <table className="table table-borderless">
                                                    <tbody>
                                                        <tr>
                                                            <td>Username:</td>
                                                            <td className="users-view-username">dean3004</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Name:</td>
                                                            <td className="users-view-name">Dean Stanley</td>
                                                        </tr>
                                                        <tr>
                                                            <td>E-mail:</td>
                                                            <td className="users-view-email">deanstanley@gmail.com</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Company:</td>
                                                            <td>XYZ Corp. Ltd.</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <h5 className="mb-1">
                                                    <i className="feather icon-link"></i> Social Links
                                                </h5>
                                                <table className="table table-borderless">
                                                    <tbody>
                                                        <tr>
                                                            <td>Twitter:</td>
                                                            <td>
                                                                <a href="#">https://www.twitter.com/</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Facebook:</td>
                                                            <td>
                                                                <a href="#">https://www.facebook.com/</a>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Instagram:</td>
                                                            <td>
                                                                <a href="#">https://www.instagram.com/</a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <h5 className="mb-1">
                                                    <i className="feather icon-info"></i> Personal Info
                                                </h5>
                                                <table className="table table-borderless mb-0">
                                                    <tbody>
                                                        <tr>
                                                            <td>Birthday:</td>
                                                            <td>03/04/1990</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Country:</td>
                                                            <td>USA</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Languages:</td>
                                                            <td>English</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Contact:</td>
                                                            <td>+(305) 254 24668</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Users view card details ends */}
                            </section>
                            {/* Users view ends */}
                        </div>
                    </div>
                </div>
            )}



            {/* <p>Role: {profile.roles ? profile.roles.join(', ') : ''}</p>

            {profile.roles && profile.roles.length > 1 && (
                <div>
                    <label>Select Role: </label>
                    <select value={selectedRole} onChange={handleRoleChange}>
                        {profile.roles.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
            )} */}
        </div>
    );
}
