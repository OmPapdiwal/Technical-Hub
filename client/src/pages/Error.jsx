import { NavLink } from "react-router-dom"

export const Error = ()=>{
    return (
        
        <>
        <section id="error-page">
            <div className="content">
                <h2 className="header">404</h2>
                <h4>Sorry! Page not Found</h4>
                <p>
                    Oops! I think you are trying to access the page that doesnt exist.
                    If you believe there is an issue, feel free to report it,we will look into  it
                </p>
                <div className="btns">
                
                    <NavLink to="/" >Return Home</NavLink>
                    <NavLink to="/contact">Report Issue</NavLink>
                </div>
            </div>

        </section>
        </>
    )
}