import React from 'react'

const Footer = () =>{
    return(
        <footer className="footer Footer-Container">
            <section className="linksFooter flex-column">
                <div>
                    <a className="link" href="https://twitter.com/ChinoxGamerYT" rel="noreferrer noopener" target="_blank">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a className="link" href="https://www.instagram.com/josep.silvab/" rel="noreferrer noopener" target="_blank">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a className="link" href="https://www.linkedin.com/in/joseph-silva-bendezu-2882a5211/" rel="noreferrer noopener" target="_blank">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a className="link" href="https://github.com/JosephSB" rel="noreferrer noopener" target="_blank">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
                <div className="links2">
                    <a className="link" href="https://website-josephsb.herokuapp.com/" rel="noreferrer noopener" target="_blank">Created By: JosephSB</a>
                </div>
            </section>
            <img className="Img-Footer" src={`${process.env.REACT_APP_API_HOST}/images/FooterBanner.png`} alt="YourDrugs"></img>
        </footer>
    )
}

export default Footer