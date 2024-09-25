
import { useAuth } from "../store/auth"; // Adjust path as necessary


export const About = ()=>{

    const {user} =useAuth();
    return  <>
    
    
  
  <section className="section-hero">
            <div className="container grid grid-two-cols">
       
                <div className="hero-contain1">
                    
                <p>Welcome {user ?  user.username : "to our Website" }</p>
                    <h1>Why Choose Us?</h1>
                    <p>
                        Expertise: Our team consist of experiences IT profeesionals who are passionate
                         about staying up-to datewith the latest industry trends </p>
                  

                        <p>Customization : We understbd that every business is unique.
                            That's why we create solutions that are tailoredto your specific needs and goals.</p>

                        <p>Customer Centric Approach: We prioritize your satisfaction and provide
                                   top-notch support to address your IT concerns</p>

                      <p>  Reliability:Count us when you are in need f us .We are here to support you 24/7 
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
                    <img src="/images/notebook-natural-laptop-macbook.jpg" alt="an template for home" 
                    width="550" height="550"/>
                </div>
            </div>


        </section>
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
       

    
  </>
    
    }
    
