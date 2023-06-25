
const NavBar = (props) => {
    return (
        <>
            <header className="bg-teal-700 text-white stick top-0 shadow-xl">
                <section className="py-4 px-10 flex justify-between">
                    <h1 className="text-3xl">what-todo</h1>
                    <div className="flex gap-6 text-xl">
                        <button>new task</button>
                        <button onClick={ () => props.setLoginClicked(true)}>login</button>
                    </div>
                </section>
            </header>
        </>
    )
};

export default NavBar;