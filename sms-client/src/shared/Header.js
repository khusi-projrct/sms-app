import { useEffect } from 'react';
import logo from '../app-assets/images/logo/stack-logo.png';

export default function Header() {
    const userData = localStorage.getItem('user');
    const username = userData ? JSON.parse(userData).username : 'Guest';
    useEffect(() => {
        // Replace feather icons
        if (window.feather) {
            window.feather.replace();
        }

        // Re-initialize dropdowns, menu toggles, etc.
        if (window.$ && window.$.fn) {
            // Trigger Bootstrap dropdowns
            window.$('.dropdown-toggle').dropdown();

            // Manually trigger collapse elements
            window.$('[data-toggle="collapse"]').each(function () {
                const target = window.$(this).data('target');
                window.$(target).collapse();
            });

            // Stack Admin specific menu init
            if (window.initMenu) {
                window.initMenu();
            }
        }
    }, []);

    return (
        <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
            <div className="navbar-wrapper">
                <div className="navbar-header">
                    <ul className="nav navbar-nav flex-row">
                        <li className="nav-item mobile-menu d-md-none mr-auto">
                            <a className="nav-link nav-menu-main menu-toggle hidden-xs" href="#">
                                <i className="feather icon-menu font-large-1" />
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-brand" href="/index">
                                <img className="brand-logo" alt="stack admin logo" src={logo} />
                                <h2 className="brand-text">SMS</h2>
                            </a>
                        </li>
                        <li className="nav-item d-md-none">
                            <a className="nav-link open-navbar-container" data-toggle="collapse" data-target="#navbar-mobile" href="#">
                                <i className="fa fa-ellipsis-v" />
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="navbar-container content">
                    <div className="collapse navbar-collapse" id="navbar-mobile">
                        <ul className="nav navbar-nav mr-auto float-left">
                            <li className="nav-item d-none d-md-block">
                                <a className="nav-link nav-menu-main menu-toggle hidden-xs" href="#">
                                    <i className="feather icon-menu" />
                                </a>
                            </li>

                            {/* Mega Dropdown */}
                            <li className="dropdown nav-item mega-dropdown d-none d-lg-block">
                                <a className="dropdown-toggle nav-link" href="#" data-toggle="dropdown">
                                    Mega
                                </a>
                                <ul className="mega-dropdown-menu dropdown-menu row p-1">
                                    {/* Sidebar */}
                                    <li className="col-md-4 bg-mega p-2">
                                        <h3 className="text-white mb-1 font-weight-bold">Mega Menu Sidebar</h3>
                                        <p className="text-white line-height-2">
                                            Candy canes bonbon toffee. Cheesecake dragée gummi bears chupa chups powder bonbon.
                                            Apple pie cookie sweet.
                                        </p>
                                        <button className="btn btn-outline-white">Learn More</button>
                                    </li>

                                    {/* Apps */}
                                    <li className="col-md-5 px-2">
                                        <h6 className="font-weight-bold font-medium-2 ml-1">Apps</h6>
                                        <ul className="row mt-2">
                                            {[
                                                { label: 'Email', icon: 'mail', link: 'app-email.html' },
                                                { label: 'Chat', icon: 'message-square', link: 'app-chat.html' },
                                                { label: 'Todo', icon: 'check-square', link: 'app-todo.html' },
                                                { label: 'Kanban', icon: 'file-plus', link: 'app-kanban.html' },
                                                { label: 'Contacts', icon: 'users', link: 'app-contacts.html' },
                                                { label: 'Invoice', icon: 'printer', link: 'invoice-template.html' }
                                            ].map((item, idx) => (
                                                <li key={idx} className="col-6 col-xl-4">
                                                    <a className="text-center mb-2 mb-xl-3" href={item.link} target="_blank" rel="noreferrer">
                                                        <i className={`feather icon-${item.icon} font-large-1 mr-0`}></i>
                                                        <p className="font-medium-2 mt-25 mb-0">{item.label}</p>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>

                                    {/* Components */}
                                    <li className="col-md-3">
                                        <h6 className="font-weight-bold font-medium-2">Components</h6>
                                        <ul className="row mt-1 mt-xl-2">
                                            <li className="col-12 col-xl-6 pl-0">
                                                <ul className="mega-component-list">
                                                    {[
                                                        { label: 'Alert', link: 'component-alerts.html' },
                                                        { label: 'Callout', link: 'component-callout.html' },
                                                        { label: 'Buttons', link: 'component-buttons-basic.html' },
                                                        { label: 'Carousel', link: 'component-carousel.html' }
                                                    ].map((item, idx) => (
                                                        <li key={idx} className="mega-component-item">
                                                            <a className="mb-1 mb-xl-2" href={item.link} target="_blank" rel="noreferrer">
                                                                {item.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li className="col-12 col-xl-6 pl-0">
                                                <ul className="mega-component-list">
                                                    {[
                                                        { label: 'Drop Down', link: 'component-dropdowns.html' },
                                                        { label: 'List Group', link: 'component-list-group.html' },
                                                        { label: 'Modals', link: 'component-modals.html' },
                                                        { label: 'Pagination', link: 'component-pagination.html' }
                                                    ].map((item, idx) => (
                                                        <li key={idx} className="mega-component-item">
                                                            <a className="mb-1 mb-xl-2" href={item.link} target="_blank" rel="noreferrer">
                                                                {item.label}
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>

                            </li>

                            <li className="nav-item d-none d-md-block">
                                <a className="nav-link nav-link-expand" href="#">
                                    <i className="ficon feather icon-maximize" />
                                </a>
                            </li>

                            <li className="nav-item nav-search">
                                <a className="nav-link nav-link-search" href="#">
                                    <i className="ficon feather icon-search" />
                                </a>
                                <div className="search-input">
                                    <input className="input" type="text" placeholder="Explore Stack..." data-search="template-search" />
                                    <div className="search-input-close">
                                        <i className="feather icon-x" />
                                    </div>
                                    <ul className="search-list" />
                                </div>
                            </li>
                        </ul>

                        {/* Right Menu */}
                        <ul className="nav navbar-nav float-right">
                            {/* Language Dropdown */}
                            {/* <li className="dropdown dropdown-language nav-item">
                                <a className="dropdown-toggle nav-link" id="dropdown-flag" href="#" data-toggle="dropdown">
                                    <i className="flag-icon flag-icon-us" />
                                    <span className="selected-language" />
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdown-flag">
                                    {["en", "fr", "pt", "de"].map((lang, idx) => (
                                        <a className="dropdown-item" key={idx} href="#" data-language={lang}>
                                            <i className={`flag-icon flag-icon-${lang}`} /> {lang.toUpperCase()}
                                        </a>
                                    ))}
                                </div>
                            </li> */}

                            {/* Notification and Message dropdowns omitted for brevity */}
                            {/* User Dropdown */}
                            <li className="dropdown dropdown-user nav-item">
                                <a className="dropdown-toggle nav-link dropdown-user-link" href="#" data-toggle="dropdown">
                                    <div className="avatar avatar-online">
                                        <img src="/app-assets/images/portrait/small/avatar-s-1.png" alt="avatar" />
                                        <i />
                                    </div>
                                    <span className="user-name">{username}</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" href="/profile"><i className="feather icon-user" /> Edit Profile</a>
                                    <a className="dropdown-item" href="/inbox"><i className="feather icon-mail" /> My Inbox</a>
                                    <a className="dropdown-item" href="/chat"><i className="feather icon-message-square" /> Chats</a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="/logout">
                                        <i className="feather icon-power" /> Logout
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

    )
}

