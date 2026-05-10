import React from 'react';
import { NavLink } from 'react-router-dom';
import '../css/Header.css';
import Signature from '../pages/splash/Signature.tsx';

function Header() {
	return (
		<header className="header">
			<div className="logo">
				<Signature />
			</div>
			<nav className="nav-menu">
				<ul className="nav-list">
					<li className="nav-item">
						<NavLink to="/portfolio/home" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/portfolio/experience" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Experience</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/portfolio/projects" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Projects</NavLink>
					</li>
					<li className="nav-item">
						<NavLink to="/portfolio/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
