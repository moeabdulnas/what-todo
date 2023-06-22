import "./NavBar.css";

const NavBar = () => {
    return (
        <>
            <div className="NavBar flex">
                <div className="LeftNavBar">
                    <h3 className="Logo">what-todo?</h3>
                    <button className="Button add">New todo</button>    
                </div>
                <button className="Button login">Login</button>
            </div>
        </>
    )
}

export default NavBar;
