export default function MainContent() {
    return (
        <div className="main-content">
            <PersonalInfo />
            <GeneralInfo />
        </div>
    )
}

function PersonalInfo() {
    return (
        <div className='personal-info'>
            <h2>Ying Tong</h2>
            <h3>Frontend Developer</h3>
            <div className='btns-container'>
                <button className='btn white-btn'>
                <a href="mailto: yingtong0106@gmail.com" target="_blank">
                    <i class="fa-solid fa-envelope"></i>
                    Email Me
                </a>

                </button>
                <button className='btn blue-btn'>
                    <a href="https://www.linkedin.com/in/ying-tong-chow-6164a0239/" target="_blank">
                    <i class="fa-brands fa-linkedin"></i>
                    LinkedIn</a>
                </button>
            </div>
        </div>
    )
}

function GeneralInfo() {
    return (
        <div className='general-info'>
            <div className='section'>
                <h3>About</h3>
                <p>
                    Hello! I'm Ying Tong, a soon-to-be CS freshman at Multimedia University in Cyberjaya, Malaysia.
                    I've been programming since I was 16, and I cannot wait to learn more about computers and improve 
                    my skills.
                </p>
            </div>
            <div className='section'>
                <h3>Interests</h3>
                <p>
                    I love Star Wars, basketball, and reading. Powered by coffee.
                </p>
            </div>
            <div className='section'>
                <h3>Skills</h3>
                <p>
                    Web development, problem solving and working in a team.
                </p>
            </div>
        </div>
    )
}