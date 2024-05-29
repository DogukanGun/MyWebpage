import Link from "next/link";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const About = () => {
    return(
        <div className="bg-grey-50" id="about">
        <div className="container flex flex-col items-center py-16 md:py-20 lg:flex-row">
          <div className="w-full text-center lg:text-left">
            <h2
              className="font-header text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
            >
              Who am I?
            </h2>
            <p className="pt-6 font-body leading-relaxed text-grey-20">
              As a Full Stack Developer at ImoGate and a Blockchain Developer at Solity Network, I apply my skills in Python, Java, Swift, and Kotlin to create innovative and scalable solutions for various platforms and domains. I have two years of experience in developing mobile applications for iOS and Android, having graduated from iOS and Android courses and obtained multiple certifications.
              I am also pursuing a Master of Science in Informatics at Technical University of Munich, where I deepen my knowledge and understanding of data science and machine learning. I have a Bachelor's degree in Computer Engineering from Dokuz Eylul University. I am a person who likes to reinforce what I have learned and collaborate with scrum teams. I have also received training in customer experience, effective communication skills. I am excited, flexible, adaptable, and resilient. I have professional proficiency in English and intermediate level in German.
            </p>
            <div
              className="flex flex-row justify-center pt-6 sm:flex-row lg:justify-start"
            >
              <div className="flex items-center justify-center w-full">
                <p className="font-body text-lg font-semibold uppercase  text-grey-20 mr-20">
                  Connect with me

                </p>
                <Link href="https://www.linkedin.com/in/dogukan-ali-gundogan/"><FontAwesomeIcon height={30} width={30} className="text-2xl text-primary hover:text-yellow mr-4" icon={faLinkedin} /></Link>
                <Link href="https://github.com/DogukanGun"><FontAwesomeIcon height={30} width={30} className="text-2xl text-primary hover:text-yellow" icon={faGithub} /></Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
}

export default About;