import Image from "next/image";

const Hero = () => {
    return (
        <section className="py-10 text-black md:py-16">
            <div className="container max-w-screen-xl mx-auto px-4">
                <nav className="flex items-center justify-center mb-20">
                    <Image className="rounded-3xl" alt="profile" src="/images/profile.jpg" height={200} width={200} />
                </nav>
                <div className="text-center">
                    <h6 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">Dogukan Gundogan</h6>
                    <h1 className="font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8">Senior Backend Developer</h1>
                </div>
            </div>
        </section>
    )
}

export default Hero;