
const Logo = () => {

    return (
        <div
            className="font-bold text-2xl text-white rounded-lg 
                       p-4
                       w-full
                       flex justify-center
                       cursor-pointer
                       "
        >
            <img 
                src="/TechTribeLogo1.jpeg" 
                alt="WebsiteLogo" 
                className="h-6 w-6 md:h-9 md:w-9 mx-1 shadow shadow-black"
            />
            <h1 className="text-sm md:text-2xl">TechTribe</h1>
        </div>
    );
};

export default Logo;
