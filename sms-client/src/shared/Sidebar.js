export default function Sidebar() {
    return (
        <div className="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
            <div className="main-menu-content">
                <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                    <li className="navigation-header">
                        <span>General</span>
                        <i
                            className="feather icon-minus"
                            data-toggle="tooltip"
                            data-placement="right"
                            data-original-title="General"
                        />
                    </li>

                    <li className="nav-item">
                        <a href="index.html">
                            <i className="feather icon-home" />
                            <span className="menu-title" data-i18n="Dashboard">Dashboard</span>
                            <span className="badge badge-primary badge-pill float-right mr-2">3</span>
                        </a>
                        <ul className="menu-content">
                            <li>
                                <a className="menu-item" href="dashboard-ecommerce.html" data-i18n="eCommerce">eCommerce</a>
                            </li>
                            <li>
                                <a className="menu-item" href="dashboard-analytics.html" data-i18n="Analytics">Analytics</a>
                            </li>
                            <li className="active">
                                <a className="menu-item" href="dashboard-fitness.html" data-i18n="Fitness">Fitness</a>
                            </li>
                            <li>
                                <a className="menu-item" href="dashboard-crm.html" data-i18n="CRM">CRM</a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="#">
                            <i className="feather icon-monitor" />
                            <span className="menu-title" data-i18n="Templates">Templates</span>
                        </a>
                        <ul className="menu-content">
                            <li>
                                <a className="menu-item" href="#" data-i18n="Vertical">Vertical</a>
                                <ul className="menu-content">
                                    <li>
                                        <a className="menu-item" href="../vertical-modern-menu-template" data-i18n="Modern Menu">
                                            Modern Menu
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="../vertical-collapsed-menu-template" data-i18n="Collapsed Menu">
                                            Collapsed Menu
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="../vertical-menu-template" data-i18n="Semi Light">
                                            Semi Light
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="../vertical-menu-template-semi-dark" data-i18n="Semi Dark">
                                            Semi Dark
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="../vertical-menu-template-nav-dark" data-i18n="Nav Dark">
                                            Nav Dark
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="../vertical-menu-template-light" data-i18n="Light">
                                            Light
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="../vertical-overlay-menu-template" data-i18n="Overlay Menu">
                                            Overlay Menu
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a className="menu-item" href="#" data-i18n="Horizontal">Horizontal</a>
                                <ul className="menu-content">
                                    <li>
                                        <a className="menu-item" href="../horizontal-menu-template" data-i18n="Classic">
                                            Classic
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="../horizontal-menu-template-nav" data-i18n="Nav Dark">
                                            Nav Dark
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a href="#">
                            <i className="feather icon-layout" />
                            <span className="menu-title" data-i18n="Layouts">Layouts</span>
                        </a>
                        <ul className="menu-content">

                            {/* Page Layouts Section */}
                            <li>
                                <a className="menu-item" href="#" data-i18n="Page Layouts">Page Layouts</a>
                                <ul className="menu-content">
                                    <li>
                                        <a className="menu-item" href="layout-1-column.html" data-i18n="1 column">1 column</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="layout-2-columns.html" data-i18n="2 columns">2 columns</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="#" data-i18n="Sidebar">Sidebar</a>
                                        <ul className="menu-content">
                                            <li>
                                                <a className="menu-item" href="layout-content-detached-left-sidebar.html" data-i18n="Detached left sidebar">
                                                    Detached left sidebar
                                                </a>
                                            </li>
                                            <li>
                                                <a className="menu-item" href="layout-content-detached-left-sticky-sidebar.html" data-i18n="Detached sticky left sidebar">
                                                    Detached sticky left sidebar
                                                </a>
                                            </li>
                                            <li>
                                                <a className="menu-item" href="layout-content-detached-right-sidebar.html" data-i18n="Detached right sidebar">
                                                    Detached right sidebar
                                                </a>
                                            </li>
                                            <li>
                                                <a className="menu-item" href="layout-content-detached-right-sticky-sidebar.html" data-i18n="Detached sticky right sidebar">
                                                    Detached sticky right sidebar
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="navigation-divider" />
                                    <li>
                                        <a className="menu-item" href="layout-fixed-navbar.html" data-i18n="Fixed navbar">
                                            Fixed navbar
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="layout-fixed-navigation.html" data-i18n="Fixed navigation">
                                            Fixed navigation
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="layout-fixed-navbar-navigation.html" data-i18n="Fixed navbar & navigation">
                                            Fixed navbar & navigation
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="layout-fixed-navbar-footer.html" data-i18n="Fixed navbar & footer">
                                            Fixed navbar & footer
                                        </a>
                                    </li>
                                    <li className="navigation-divider" />
                                    <li>
                                        <a className="menu-item" href="layout-fixed.html" data-i18n="Fixed layout">
                                            Fixed layout
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="layout-boxed.html" data-i18n="Boxed layout">
                                            Boxed layout
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="layout-static.html" data-i18n="Static layout">
                                            Static layout
                                        </a>
                                    </li>
                                    <li className="navigation-divider" />
                                    <li>
                                        <a className="menu-item" href="layout-light.html" data-i18n="Light layout">
                                            Light layout
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="layout-dark.html" data-i18n="Dark layout">
                                            Dark layout
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="layout-semi-dark.html" data-i18n="Semi dark layout">
                                            Semi dark layout
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            {/* Navbars Section */}
                            <li>
                                <a className="menu-item" href="#" data-i18n="Navbars">Navbars</a>
                                <ul className="menu-content">
                                    <li>
                                        <a className="menu-item" href="navbar-light.html" data-i18n="Navbar Light">Navbar Light</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="navbar-dark.html" data-i18n="Navbar Dark">Navbar Dark</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="navbar-semi-dark.html" data-i18n="Navbar Semi Dark">Navbar Semi Dark</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="navbar-brand-center.html" data-i18n="Brand Center">Brand Center</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="navbar-fixed-top.html" data-i18n="Fixed Top">Fixed Top</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="#" data-i18n="Hide on Scroll">Hide on Scroll</a>
                                        <ul className="menu-content">
                                            <li>
                                                <a className="menu-item" href="navbar-hide-on-scroll-top.html" data-i18n="Hide on Scroll Top">Hide on Scroll Top</a>
                                            </li>
                                            <li>
                                                <a className="menu-item" href="navbar-hide-on-scroll-bottom.html" data-i18n="Hide on Scroll Bottom">Hide on Scroll Bottom</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="navbar-components.html" data-i18n="Navbar Components">Navbar Components</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="navbar-styling.html" data-i18n="Navbar Styling">Navbar Styling</a>
                                    </li>
                                </ul>
                            </li>

                            {/* Vertical Nav Section */}
                            <li>
                                <a className="menu-item" href="#" data-i18n="Vertical Nav">Vertical Nav</a>
                                <ul className="menu-content">
                                    <li>
                                        <a className="menu-item" href="#" data-i18n="Navigation Types">Navigation Types</a>
                                        <ul className="menu-content">
                                            <li>
                                                <a className="menu-item" href="../vertical-menu-template" data-i18n="Vertical Menu">Vertical Menu</a>
                                            </li>
                                            <li>
                                                <a className="menu-item" href="../vertical-overlay-menu-template" data-i18n="Vertical Overlay">Vertical Overlay</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-compact-menu.html" data-i18n="Compact Menu">Compact Menu</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-fixed.html" data-i18n="Fixed Navigation">Fixed Navigation</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-static.html" data-i18n="Static Navigation">Static Navigation</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-light.html" data-i18n="Navigation Light">Navigation Light</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-dark.html" data-i18n="Navigation Dark">Navigation Dark</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-accordion.html" data-i18n="Accordion Navigation">Accordion Navigation</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-collapsible.html" data-i18n="Collapsible Navigation">Collapsible Navigation</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-flipped.html" data-i18n="Flipped Navigation">Flipped Navigation</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-native-scroll.html" data-i18n="Native scroll">Native scroll</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-right-side-icon.html" data-i18n="Right side icons">Right side icons</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-bordered.html" data-i18n="Bordered Navigation">Bordered Navigation</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-disabled-link.html" data-i18n="Disabled Navigation">Disabled Navigation</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-styling.html" data-i18n="Navigation Styling">Navigation Styling</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="vertical-nav-tags-pills.html" data-i18n="Tags & Pills">Tags & Pills</a>
                                    </li>
                                </ul>
                            </li>

                            {/* Horizontal Nav Section */}
                            <li>
                                <a className="menu-item" href="#" data-i18n="Horizontal Nav">Horizontal Nav</a>
                                <ul className="menu-content">
                                    <li>
                                        <a className="menu-item" href="#" data-i18n="Navigation Types">Navigation Types</a>
                                        <ul className="menu-content">
                                            <li>
                                                <a className="menu-item" href="../horizontal-menu-template" data-i18n="Classic">Classic</a>
                                            </li>
                                            <li>
                                                <a className="menu-item" href="../horizontal-menu-template-nav" data-i18n="Nav Dark">Nav Dark</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            {/* Page Headers Section */}
                            <li>
                                <a className="menu-item" href="#" data-i18n="Dashboard">Page Headers</a>
                                <ul className="menu-content">
                                    <li>
                                        <a className="menu-item" href="headers-breadcrumbs-basic.html" data-i18n="Breadcrumbs basic">Breadcrumbs basic</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="headers-breadcrumbs-top.html" data-i18n="Breadcrumbs top">Breadcrumbs top</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="headers-breadcrumbs-bottom.html" data-i18n="Breadcrumbs bottom">Breadcrumbs bottom</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="headers-breadcrumbs-with-button.html" data-i18n="Breadcrumbs with button">
                                            Breadcrumbs with button
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="headers-breadcrumbs-with-round-button.html" data-i18n="Breadcrumbs with round button 2">
                                            Breadcrumbs with round button 2
                                        </a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="headers-breadcrumbs-with-stats.html" data-i18n="Breadcrumbs with stats">
                                            Breadcrumbs with stats
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            {/* Footers Section */}
                            <li>
                                <a className="menu-item" href="#" data-i18n="Footers">Footers</a>
                                <ul className="menu-content">
                                    <li>
                                        <a className="menu-item" href="footer-light.html" data-i18n="Footer Light">Footer Light</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="footer-dark.html" data-i18n="Footer Dark">Footer Dark</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="footer-transparent.html" data-i18n="Footer Transparent">Footer Transparent</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="footer-fixed.html" data-i18n="Footer Fixed">Footer Fixed</a>
                                    </li>
                                    <li>
                                        <a className="menu-item" href="footer-components.html" data-i18n="Footer Components">Footer Components</a>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </li>

                    <li className="nav-item">
                        <a href="#">
                            <i className="feather icon-zap"></i>
                            <span className="menu-title" data-i18n="Starter kit">Starter kit</span>
                            <span className="badge badge-danger badge-pill float-right mr-2">New</span>
                        </a>
                        <ul className="menu-content">
                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-1-column.html"
                                    data-i18n="1 column"
                                >
                                    1 column
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-2-columns.html"
                                    data-i18n="2 columns"
                                >
                                    2 columns
                                </a>
                            </li>
                            <li>
                                <a className="menu-item" href="#" data-i18n="Content Detached Sidebar">
                                    Content Detached Sidebar
                                </a>
                                <ul className="menu-content">
                                    <li>
                                        <a
                                            className="menu-item"
                                            href="../../../starter-kit/ltr/vertical-menu-template-light/layout-content-detached-left-sidebar.html"
                                            data-i18n="Detached left sidebar"
                                        >
                                            Detached left sidebar
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="menu-item"
                                            href="../../../starter-kit/ltr/vertical-menu-template-light/layout-content-detached-left-sticky-sidebar.html"
                                            data-i18n="Detached sticky left sidebar"
                                        >
                                            Detached sticky left sidebar
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="menu-item"
                                            href="../../../starter-kit/ltr/vertical-menu-template-light/layout-content-detached-right-sidebar.html"
                                            data-i18n="Detached right sidebar"
                                        >
                                            Detached right sidebar
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="menu-item"
                                            href="../../../starter-kit/ltr/vertical-menu-template-light/layout-content-detached-right-sticky-sidebar.html"
                                            data-i18n="Detached sticky right sidebar"
                                        >
                                            Detached sticky right sidebar
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            <li className="navigation-divider"></li>

                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed-navbar.html"
                                    data-i18n="Fixed navbar"
                                >
                                    Fixed navbar
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed-navigation.html"
                                    data-i18n="Fixed navigation"
                                >
                                    Fixed navigation
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed-navbar-navigation.html"
                                    data-i18n="Fixed navbar &amp; navigation"
                                >
                                    Fixed navbar &amp; navigation
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed-navbar-footer.html"
                                    data-i18n="Fixed navbar &amp; footer"
                                >
                                    Fixed navbar &amp; footer
                                </a>
                            </li>

                            <li className="navigation-divider"></li>

                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-fixed.html"
                                    data-i18n="Fixed layout"
                                >
                                    Fixed layout
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-boxed.html"
                                    data-i18n="Boxed layout"
                                >
                                    Boxed layout
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-static.html"
                                    data-i18n="Static layout"
                                >
                                    Static layout
                                </a>
                            </li>

                            <li className="navigation-divider"></li>

                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-light.html"
                                    data-i18n="Light layout"
                                >
                                    Light layout
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-dark.html"
                                    data-i18n="Dark layout"
                                >
                                    Dark layout
                                </a>
                            </li>
                            <li>
                                <a
                                    className="menu-item"
                                    href="../../../starter-kit/ltr/vertical-menu-template-light/layout-semi-dark.html"
                                    data-i18n="Semi dark layout"
                                >
                                    Semi dark layout
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}
