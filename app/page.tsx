"use client"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Feed {
  url: string;
  title: string;
  link: string;
  author: string;
  description: string;
  image: string;
}


interface Item {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: string;
  image?: string;
  categories: string[];
}

interface RootObject {
  status: string;
  feed: Feed;
  items: Item[];
}
const replaceImageLinks = (input: string): { images: string[], texts: string[] } => {
  // Regular expression to find all image src links
  const imgTagRegex = /<img[^>]+src="([^">]+)"/g;
  // Regular expression to find all text within <p> tags
  const pTagRegex = /<p>(.*?)<\/p>/g;

  // Array to store the extracted image URLs
  const images: string[] = [];
  // Array to store the extracted texts within <p> tags
  const texts: string[] = [];

  // Replace all matches with an empty string and extract image URLs
  const replacedInput = input.replace(imgTagRegex, (match, captureGroup) => {
    images.push(captureGroup);
    return '';
  });

  // Extract text within <p> tags
  let match;
  while ((match = pTagRegex.exec(replacedInput)) !== null) {
    texts.push(match[1]);
  }

  return { images, texts };
};
const extractImageUrls = (input: string): string[] => {
  // Regular expression to find all image src links
  const imgTagRegex = /<img[^>]+src="([^">]+)"/g;

  // Array to store the extracted URLs
  const urls: string[] = [];

  // Variable to store the match results
  let match;

  // Loop through all matches and extract the URLs
  while ((match = imgTagRegex.exec(input)) !== null) {
    urls.push(match[1]);
  }

  return urls;
};


const BlogCard: React.FC<{ item: Item }> = ({ item }) => (
  <a href={item.link} className="shadow">
    <div
      className="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
      style={{ backgroundImage: `url(${replaceImageLinks(item.description).images[0]})` }}
    >
      <span
        className="absolute inset-0 block bg-gradient-to-b from-blog-gradient-from to-blog-gradient-to bg-cover bg-center bg-no-repeat opacity-10 transition-opacity group-hover:opacity-50"
      ></span>
      <span
        className="absolute right-0 bottom-0 mr-4 mb-4 block rounded-full border-2 border-white px-6 py-2 text-center font-body text-sm font-bold uppercase text-white md:text-base"
      >Read More</span>
    </div>
    <div className="bg-white py-6 sm:h-84 lg:h-64 xl:h-72 px-5 xl:py-8">
      <span className="block font-body text-lg font-semibold text-black">{item.title}</span>
      <span className="block pt-2 font-body text-grey-20">{replaceImageLinks(item.description).texts[0].slice(0, 200)} ...</span>
    </div>
  </a>
);

const Home = () => {

  const [articles, setArticles] = useState<Item[]>();

  useEffect(() => {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@dogukangundogan5")
      .then(res => res.json())
      .then(data => setArticles(data.items))
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
      <div><div
        className="relative bg-cover bg-center bg-no-repeat py-8"
      >
        <div
          className="absolute inset-0 z-20 bg-gradient-to-r from-hero-gradient-from to-hero-gradient-to bg-cover bg-center bg-no-repeat"
        ></div>

        <div
          className="container relative z-30 pt-10 pb-10 sm:pt-56 sm:pb-16 lg:pt-32 lg:pb-16"
        >
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className="rounded-full border-8 border-primary shadow-xl">
              <Image
                src="/images/profile.jpg"
                className="rounded-full "
                width={350}
                height={200}
                alt="author"
              />
            </div>
            <div className="pt-8 sm:pt-10 lg:pl-8 lg:pt-0">
              <h1
                className="text-center font-header text-4xl text-white sm:text-left sm:text-5xl md:text-6xl"
              >
                Hi I'm Dogukan!
              </h1>
              <div
                className="flex flex-col justify-center pt-3 sm:flex-row sm:pt-5 lg:justify-start"
              >
                <div
                  className="flex items-center justify-center pl-0 sm:justify-start md:pl-1"
                >
                  <div className="hidden sm:block">
                    <i className="bx bx-chevron-right text-3xl text-yellow"></i>
                  </div>
                </div>
                <div
                  className="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0"
                >
                  <a href="/">
                    <i
                      className="bx bxl-facebook-square text-2xl text-white hover:text-yellow"
                    ></i>
                  </a>
                  <a href="/" className="pl-4">
                    <i
                      className="bx bxl-twitter text-2xl text-white hover:text-yellow"
                    ></i>
                  </a>
                  <a href="/" className="pl-4">
                    <i
                      className="bx bxl-dribbble text-2xl text-white hover:text-yellow"
                    ></i>
                  </a>
                  <a href="/" className="pl-4">
                    <i
                      className="bx bxl-linkedin text-2xl text-white hover:text-yellow"
                    ></i>
                  </a>
                  <a href="/" className="pl-4">
                    <i
                      className="bx bxl-instagram text-2xl text-white hover:text-yellow"
                    ></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="bg-grey-50" id="about">
          <div className="container flex flex-col items-center py-16 md:py-20 lg:flex-row">
            <div className="w-full text-center lg:text-left">
              <h2
                className="font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
              >
                Who am I?
              </h2>
              <h4
                className="pt-6 font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
              >
                A Software Engineer
              </h4>
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

        <div className="container py-16 md:py-20" id="services">
          <h2
            className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
          >
            Here's what I'm good at
          </h2>
          <h3
            className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
          >
            These are the services Ioffer
          </h3>

          <div
            className="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
          >
            <div className="group rounded px-8 py-12 shadow hover:bg-primary">
              <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                <div className="hidden group-hover:block">
                  <Image
                    height={120}
                    width={120}
                    src="/images/icon-development-white.svg"
                    alt="development icon"
                  />
                </div>
                <div className="block group-hover:hidden">
                  <Image
                    height={120}
                    width={120}
                    src="/images/icon-development-black.svg"
                    alt="development icon"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3
                  className="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl"
                >
                  WEB DEVELOPMENT
                </h3>
                <p className="text-grey pt-4 text-sm text-black group-hover:text-white md:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="group rounded px-8 py-12 shadow hover:bg-primary">
              <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                <div className="hidden group-hover:block">
                  <Image
                    height={120}
                    width={120}
                    src="/images/icon-mobile-white.svg"
                    alt="Mobile Application icon"
                  />
                </div>
                <div className="block group-hover:hidden">
                  <Image
                    height={120}
                    width={120}
                    src="/images/icon-mobile-black.svg"
                    alt="Mobile Application icon"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3
                  className="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl"
                >
                  Mobile Development
                </h3>
                <p className="text-grey pt-4 text-sm text-black group-hover:text-white md:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <div className="group rounded px-8 py-12 shadow hover:bg-primary">
              <div className="mx-auto h-24 w-24 text-center xl:h-28 xl:w-28">
                <div className="hidden group-hover:block">
                  <Image
                    height={120}
                    width={120}
                    src="/images/icon-graphics-white.svg"
                    alt="Graphic Design icon"
                  />
                </div>
                <div className="block group-hover:hidden">
                  <Image
                    height={120}
                    width={120}
                    src="/images/icon-graphics-black.svg"
                    alt="Graphic Design icon"
                  />
                </div>
              </div>
              <div className="text-center">
                <h3
                  className="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-yellow lg:text-xl"
                >
                  Web Design
                </h3>
                <p className="text-grey pt-4 text-sm text-black group-hover:text-white md:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container py-16 md:py-20" id="work">
          <h2
            className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
          >
            My work experience
          </h2>
          <h3
            className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
          >
            Here's what I did before
          </h3>

          <div className="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
            <span
              className="left-2/5 absolute inset-y-0 ml-10 hidden w-0.5 bg-grey-40 md:block"
            ></span>

            <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
              <div className="md:w-2/5">
                <div className="flex justify-center md:justify-start">
                  <span
                    className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                  >Alterscope </span>
                </div>
              </div>
              <div className="md:w-3/5">
                <div className="relative flex md:pl-18">
                  <span
                    className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                  ></span>

                  <div className="mt-1 flex">
                    <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                    <div className="md:-mt-1 md:pl-8">
                      <span className="block font-body font-bold text-grey-40"
                      >March 2023 - </span>
                      <span
                        className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                      >Alterscope - Backend Developer</span>
                      <div className="pt-2">
                        <span className="block font-body text-black"
                        >A risk infrastructure built by Alterscope displays lending procedures or dexes data. The program has little systems
                          that, in the interim, monitor the Ethereum and Arbitrum chains and then notify users of these events through
                          messages. My duties include creating systems for real-time monitoring, delivering messages to users, and displaying
                          scores to them. In addition to my backend responsibilities, I am the team leader for the front end because of my
                          expertise.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
              <div className="md:w-2/5">
                <div className="flex justify-center md:justify-start">
                  <span
                    className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                  >ImoGate </span>

                </div>
              </div>
              <div className="md:w-3/5">
                <div className="relative flex md:pl-18">
                  <span
                    className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                  ></span>

                  <div className="mt-1 flex">
                    <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                    <div className="md:-mt-1 md:pl-8">
                      <span className="block font-body font-bold text-grey-40"
                      >December 2020 - November 2023</span >
                      <span
                        className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                      >Full Stack Developer</span>
                      <div className="pt-2">
                        <span className="block font-body text-black"
                        >I showed broad proficiency in full-stack programming at my most recent position, with a focus on frontend and
                          backend technologies. I made sure that the user experience was flawless by using Angular to design user interfaces
                          that were responsive and easy to use on the website. I used Python and.NET Core for my backend work, which
                          allowed me to create scalable and reliable server-side applications. In the backend, I also used Layer Architecture to
                          encourage modularity and simplicity of maintenance. I concentrated on component architecture in the frontend,
                          which allowed for a more structured and effective development approach. My ability to develop high-quality
                          software solutions that satisfy user goals and corporate objectives is a result of my blend of abilities and techniques.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
              <div className="md:w-2/5">
                <div className="flex justify-center md:justify-start">
                  <span
                    className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                  >Adesso </span>

                </div>
              </div>
              <div className="md:w-3/5">
                <div className="relative flex md:pl-18">
                  <span
                    className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                  ></span>

                  <div className="mt-1 flex">
                    <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                    <div className="md:-mt-1 md:pl-8">
                      <span className="block font-body font-bold text-grey-40"
                      >June 2022 - December 2022</span>
                      <span
                        className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                      >Android Developer</span>
                      <div className="pt-2">
                        <span className="block font-body text-black"
                        >I was quite good at applying clean design patterns in my work as an Android developer to produce scalable, effective
                          code. Using Dagger-Hilt, Retrofit, and Datastore, I specialized in Dependency Injection, which greatly improved the
                          applications' testability and modularity. The application of Material Design concepts enhanced my ideas and ensured
                          aesthetically beautiful and intuitive user experiences. I am a specialist in the Android SDK, with knowledge of
                          creating custom Animations and Drawables, integrating SQLite databases, and working with Android components,
                          lifecycles, layouts, and fragments. Furthermore, I have developed strong Android applications using my proficiency in
                          Java and Kotlin. My knowledge includes the most recent Gradle-based Android build system, which makes project
                          administration efficient and streamlined. I am also adept at unit testing with JUnit, ensuring the reliability and
                          quality of the software I develop.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col text-center md:flex-row md:text-left">
              <div className="md:w-2/5">
                <div className="flex justify-center md:justify-start">
                  <span
                    className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                  >Intertech </span>

                </div>
              </div>
              <div className="md:w-3/5">
                <div className="relative flex md:pl-18">
                  <span
                    className="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                  ></span>

                  <div className="mt-1 flex">
                    <i className="bx bxs-right-arrow hidden text-primary md:block"></i>
                    <div className="md:-mt-1 md:pl-8">
                      <span className="block font-body font-bold text-grey-40"
                      >June 2021 - June 2022</span>
                      <span
                        className="block pt-2 font-header text-xl font-bold uppercase text-primary"
                      >Android Developer</span>
                      <div className="pt-2">
                        <span className="block font-body text-black"
                        >I have worked with Android applications for a living, and I have made substantial use of the MVVM (Model-View-
                          ViewModel) design pattern. With the use of this technique, I was able to effectively divide the business logic from
                          the user interface, producing code that is more scalable and testable. My use of Dagger-Hilt, Retrofit, and Datastore
                          —tools that have greatly expedited the development process by guaranteeing a decoupled and readily maintainable
                          codebase—demonstrates my proficiency in Dependency Injection. Along with these abilities, I also have a lot of
                          experience using background processing and multi-threading approaches. With the help of this knowledge, I've been
                          able to improve application speed by handling intricate procedures and data processing jobs effectively while
                          maintaining a positive user experience. My proficiency in these areas reflects a deep understanding of modern
                          Android development practices and a commitment to creating high-performance, user-centric applications.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-grey-50 mt-5" id="blog">
            <div className="container py-16 md:py-20">
              <h2
                className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
              >
                I also like to write
              </h2>
              <h4
                className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
              >
                Check out my latest posts!
              </h4>
              <div
                className="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10"
              >
                {articles && articles?.slice(0, 3).map((article) => {
                  return <BlogCard item={article} />
                })}
              </div>
            </div>
          </div>

          <div className="container py-16 md:py-20" id="contact">
            <h2
              className="text-center font-header text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
            >
              Here's a contact form
            </h2>
            <h4
              className="pt-6 text-center font-header text-xl font-medium text-black sm:text-2xl lg:text-3xl"
            >
              Have Any Questions?
            </h4>
            <div className="mx-auto w-full pt-5 text-center sm:w-2/3 lg:pt-6">
              <p className="font-body text-grey-10">
                Lorem ipsum dolor sit amet consectetur adipiscing elit hendrerit
                condimentum turpis nisl sem, viverra habitasse urna ante lobortis
                fermentum accumsan. Viverra habitasse urna ante lobortis fermentum
                accumsan.
              </p>
            </div>
            <div className="mx-auto w-full pt-10 sm:w-3/4">
              <div className="flex flex-col md:flex-row">
                <input
                  className="mr-3 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:w-1/2 lg:mr-5"
                  placeholder="Name"
                  type="text"
                  id="name"
                />
                <input
                  className="mt-6 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:mt-0 md:ml-3 md:w-1/2 lg:ml-5"
                  placeholder="Email"
                  type="text"
                  id="email"
                />
              </div>
              <textarea
                className="mt-6 w-full rounded border-grey-50 px-4 py-3 font-body text-black md:mt-8"
                placeholder="Message"
                id="message"
              ></textarea>
              <button
                className="mt-6 flex items-center justify-center rounded bg-primary px-8 py-3 font-header text-lg font-bold uppercase text-white hover:bg-grey-20"
              >
                Send
                <i className="bx bx-chevron-right relative -right-2 text-3xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}


export default Home