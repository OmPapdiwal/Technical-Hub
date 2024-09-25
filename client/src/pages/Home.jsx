
export const Home = () => {
    return <>
     <main>
        <section className="section-hero">
            <div className="container grid grid-two-cols">
                <div className="hero-contain">
                    <p>We are the World Best IT Company</p>
                    <h1>Welcome to Technical's IT Industry</h1>
                    <p>
                        Are you ready t take your business to the next level 
                        with cutting-edge IT solutions? Look no further ! 
                        At Papdiwal's IT Industry we specialize in providing
                        innovative IT services and solutions tailored 
                        to meet your unique needs..
                    </p>
                    <div className="btn btn-group">
                        <a href="/contact"><button className="btn">Connect Now</button>
                        </a>
                        <a href="/service">
                        <button  className="btn secondary-btn">Learn More</button>
                        </a>
                        
                    </div>

                </div>
                <div className="hero-images">
                    <img src="/images/notebook-natural-laptop-macbook.jpg" alt="an template for home" width="550" height="550"/>
                </div>
            </div>

        </section>

     </main>
     <section className="section-analytics">
        <div className="container grid grid-four-cols">
            <div className="div1">
                <h2>50+</h2>
                <p>Happy Dealers</p>
            </div>
            <div className="div1">
                <h2>100000+</h2>
                <p>Happy Customers</p>
            </div>
            <div className="div1">
                <h2>500+</h2>
                <p>Well Known Tech-Staff</p>
            </div>
            <div className="div1">
                <h2>24/7</h2>
                <p>Service</p>
            </div>
        </div>
     </section>

     <section className="section-hero">
            <div className="container grid grid-two-cols">
            <div className="hero-images">
                    <img src="/images/notebook-natural-laptop-macbook.jpg" alt="an template for home" width="550" height="550"/>
                </div>
                <div className="hero-contain">
                    
                    <p>We are here to help you</p>
                    <h1>Get Connected Today</h1>
                    <p>
                        Ready to take step towards the most secure and safe IT Infrastructure? Contact 
                        Us Today for a free Consultation and discuss how Papdiwal's Technical Can thrive Your Business in a Digital Way
                    </p>
                    <div className="btn btn-group">
                        <a href="/contact"><button className="btn">Connect Now</button>
                        </a>
                        <a href="/service">
                        <button  className="btn secondary-btn">Learn More</button>
                        </a>
                        
                    </div>

                </div>
                
            </div>

        </section>
    </>
};

