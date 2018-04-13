import * as React from 'react'
import {
    NavLink
} from 'react-router-dom'

class Header extends React.Component<{user: any}, {}> {
    render() {
        return (<nav className="nav">
            <div className="title">API Tools</div>
            <NavLink to="/" exact={true}>Mock Orgs</NavLink>

            <NavLink to="/reset-orgs">Reset Orgs</NavLink>
            <h4>{this.props.user.isLoggedIn ? ' user is logged in' : <button>login</button>}</h4>
        </nav>)
    }
}

export default Header